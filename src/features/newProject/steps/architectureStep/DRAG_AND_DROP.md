# Drag and Drop da Árvore de Arquivos — Como foi feito

Documentação das **duas tarefas** de correção do drag and drop da etapa de
Arquitetura (`src/features/newProject/steps/architectureStep`).

Stack: React 19 + `@dnd-kit/react` (v0.5, a nova geração do dnd-kit) + Zustand
com middleware `immer`.

---

## 1. Visão geral

A etapa `ProjectArch` monta uma árvore de pastas/arquivos (`FolderTree`) e uma
lista de arquivos "pendentes" (`PendentFile`), tudo dentro de um
`DragDropProvider`. O objetivo é:

- arrastar um item **para dentro** de uma pasta (filho, anexado no fim);
- **reordenar** irmãos (inserir um item antes/depois de outro);
- mover arquivos pendentes para dentro da árvore.

O problema original: **dezenas de comportamentos quebrados**. As causas raiz e
a solução estão descritas nas duas tarefas abaixo.

---

## 2. Tarefa 1 — Reescrever a lógica de drag and drop

### 2.1 Problemas mapeados

| Problema | Onde estava | Consequência |
| --- | --- | --- |
| `moveNode` só anexava no fim | `FolderTreeSlice.tsx` | impossível reordenar irmãos; todo drop virava "append" |
| Nenhum arquivo era droppable | `FileItem.tsx` só usava `useDraggable` | não existia inserir "entre" dois arquivos |
| Mover pasta para um **descendente próprio** | `moveNode` fazia `remNode` + `addNode` | `remNode` removia a subárvore; depois `addNode` não encontrava o alvo → falha **silenciosa** |
| Soltar de volta no mesmo lugar | `moveNode` removia e re-adicionava no fim | o item "pulava" de posição sem motivo |
| Área de drop minúscula e escondida | `FolderItem.tsx`, `dropRef` num strip só quando `folder.isOpen` | pasta fechada/vazia quase impossível de acertar |
| Sem `DragOverlay` | `ProjectArch.tsx` | a árvore re-layout durante o arrasto (o elemento sai do fluxo) |
| Dois `set()` por move | `moveNode` | 2 renders por movimento |
| `console.log` residual | `ProjectArch.tsx` | poluição no console |

### 2.2 Novas assinaturas do store

No `FolderTreeSlice.tsx`:

- `moveNode(source, targetParent?, targetIndex?)` — move por **índice** dentro
  do pai (o padrão usado em árvores de arquivos).
- `addNode(parent, files, index?)` — ganhou índice opcional para inserir no meio
  (usado quando um arquivo pendente cai "antes de" um item).

### 2.3 Guardas do `moveNode`

Todo o movimento acontece em **um único `set`** (immer), e NUNCA quebra a árvore:

1. `source === targetParent` → no-op (não dá para colocar uma pasta dentro dela
   mesma).
2. Se o source é pasta e `targetParent` está **dentro da subárvore do source**
   (`findFolder(moved, targetParent)`) → re-insere no lugar original e desiste
   (impede ciclo).
3. Mesmo pai: o índice é ajustado quando o item removido está **antes** do alvo
   (`targetIndex > sourceIndex ? targetIndex - 1 : targetIndex`); se o resultado
   for igual à posição original → no-op (nada de "pulo").
4. Se o alvo não for encontrado, o item é re-inserido na posição original.

### 2.4 Helpers modulares (e o bug do `never`)

A primeira versão do `moveNode` calculava tudo dentro de closures que alteravam
variáveis `let` do escopo externo. O TypeScript **invalida o narrowing** de
variáveis capturadas por closures a cada chamada de função, e o build quebrava
com `Property 'children' does not exist on type 'never'`.

Solução: extrair funções puras de árvore **fora** do slice, operando por
parâmetros:

- `findParentInfo(curr, id)` → `{ parent, index } | null` — localiza o pai e o
  índice do nó.
- `findFolder(root, id)` → `FolderNode | null` — busca recursiva usada na guarda
  de descendência.
- `insertChild(root, parentId, index, node)` — insere com clamping do índice
  (valores fora da faixa anexam no fim).

Com `const` capturado (e top-level, sem closures mutáveis), o narrowing não é
mais perdido e o build passa.

### 2.5 Dados compartilhados — `types/dragData.ts`

Cada entidade carrega dados em `data` (usados no `dragEnd` em vez de parsear
ids):

```ts
export type DropData =
  | { kind: "row"; parentId: string; index: number; itemId: string; isFolder: boolean }
  | { kind: "container"; parentId: string; index: number }

export type DragNodeData = {
  title: string
  isFolder: boolean
  fileType?: FileType | "pendent"
}
```

> Na Tarefa 1 o tipo era `kind: "node" | "container"`; foi **renomeado para
> `row`** na Tarefa 2 (ver §3).

### 2.6 Componentes

**`FileItem.tsx`**
- `useDraggable({ id, handle })` + `useDroppable({ id, data })` **na mesma
  linha** (ref combinado: `dragRef(element)` + `dropRef(element)`).
- Arrasto inicia **somente pelo handle** (`GripVertical`, visível no hover) via
  `handleRef`. O PointerSensor do dnd-kit só ativa o arrasto ao clicar no handle;
  elementos interativos da linha (ex.: botão da pasta) continuam clicáveis.

**`FolderItem.tsx`**
- Linha do cabeçalho = droppable (inserir antes) + handle de arrasto.
- Faixa de conteúdo = droppable **sempre montado** (mesmo com a pasta fechada),
  id `${folder.id}:content`.
- Pasta `root` tem drag/drop de linha desabilitados (`disabled: isRoot`).

**`FolderTree.tsx`**
- Antes separava pastas primeiro, depois arquivos. Agora renderiza `children` na
  **ordem do array** — assim `index` do array == posição visual, e o math do
  `moveNode` fica correto.
- Passa `index` e `parentId` para cada item recursivamente.

**`PendentFile.tsx`**
- `useDraggable` com handle no `GripVertical` (que já existia) e `DragNodeData`
  (`fileType: "pendent"` quando não é pasta).

### 2.7 `ProjectArch.tsx`

- `handleDragEnd` lê **`operation.target.data`** (não mais ids soltos):
  `moveNode(source, targetParentId, targetIndex)`, e no caso de pendente
  `addNode(targetParentId, file, targetIndex)` + remove da lista de pendentes.
- Adicionado **`<DragOverlay>`** (função `(source) => ReactNode`): um clone do
  item segue o cursor; a árvore **não** re-layout durante o arrasto.
- Adicionado **`onDragOver`**: auto-open de pastas fechadas sobrevoadas.
- Removido o `console.log`.

---

## 3. Tarefa 2 — Drop posicional ("antes / dentro / depois")

Mesmo com a Tarefa 1, colocar um arquivo **dentro** de uma pasta exigia acertar
uma faixa fina de alguns pixels. O usuário relatou: *"dificuldade de colocar um
arquivo abaixo de uma pasta"*.

### 3.1 Regra de drop

Cada **linha** agora decide a direção do drop pela posição do ponteiro dentro da
linha (fração da altura via `getBoundingClientRect()`):

`computeDropDirection(isFolder, yFraction)`:

| Caso | Topo | Meio | Baixo |
| --- | --- | --- | --- |
| **Pasta** (`< 1/3`, `1/3..2/3`, `> 2/3`) | `before` | `inside` → **entra na pasta** | `after` |
| **Arquivo** (`< 1/2`, senão) | `before` | `after` | `after` |

Isso resolve o problema principal: **soltar no meio do nome da pasta coloca o
arquivo dentro dela.**

- `before` → insere no `index` do alvo.
- `after` → insere no `index + 1`.
- `inside` (pasta) → `moveNode(source, itemId)` / `addNode(itemId, file)`, i.e.,
  anexa como último filho.

### 3.2 `hooks/useDropDirection.ts`

- Mantém `pointermove` global ativo **enquanto a linha é o alvo**
  (`isDropTarget`), atualizando `direction` em `setState`.
- Importante: retorna `isDropTarget ? direction : null` — o **reset é derivado no
  render**, e não via `setState` no corpo do effect. Motivo: o lint
  `react-hooks/set-state-in-effect` rejeita `setState` síncrono dentro de effect
  (evita cascatas de render).

### 3.3 `components/DropIndicator.tsx`

Feedback visual em tempo real:

- `before` → linha (`h-0.5`) no **topo** da linha.
- `after` → linha no **rodapé**.
- `inside` → a pasta inteira é destacada com `ring` + `bg-accent/40` (feito via
  className no `FolderItem`, não no indicador). Elementos do indicador usam
  `pointer-events-none`.

### 3.4 Decisão no `ProjectArch`

A mesma função `directionOf(target, pointer)` é usada em `handleDragOver` e
`handleDragEnd` (consistência):

- `pointer` vem de `event.operation.position.current` (tipo `Coordinates`,
  `{ x, y }` do `@dnd-kit/geometry`).
- `rect` vem de `target.element?.getBoundingClientRect()`.
- `handleDragOver`: se direção `inside` em pasta → `toggleFolder(itemId, true)`
  (auto-open; antes só o container abria).
- `handleDragEnd`: escolhe `parentId`/`index` conforme a direção.

### 3.5 Faixa de anexar movida para baixo dos filhos

No `FolderItem`, o container (droppable `kind: "container"`) **não envolve mais
os filhos** — virou uma faixa logo **abaixo** de `children`:

```tsx
{folder.isOpen && <div>{children}</div>}
<div ref={contentDropRef} className="relative min-h-1 ..." /> // anexar no fim
```

Consequências positivas:

- o **entre-irmãos** agora é preciso (o pointer sobre o gap entre filhos cai nos
  droppables `row`, não no container);
- a faixa continua existindo para anexar no fim de uma pasta aberta/vazia;
- em pasta fechada, a faixa é o alvo que dispara o auto-open.

---

## 4. Mudanças por arquivo

Arquivos **novos**:

| Arquivo | O que é |
| --- | --- |
| `types/dragData.ts` | `DropData`, `DragNodeData`, `DropDirection` |
| `hooks/useDropDirection.ts` | `computeDropDirection` + hook de direção do pointer |
| `components/DropIndicator.tsx` | linha visual antes/depois |

Arquivos **modificados**:

| Arquivo | O que mudou |
| --- | --- |
| `slices/FolderTreeSlice.tsx` | `moveNode` por índice + guards; `addNode` com índice; helpers `findParentInfo`/`findFolder`/`insertChild` |
| `ProjectArch.tsx` | `handleDragEnd`/`handleDragOver` por `data` + direção; `DragOverlay`; auto-open; remove `console.log` |
| `FileItem.tsx` | linha draggable (handle) + droppable `row` com indicador |
| `FolderItem.tsx` | linha com antes/dentro/depois; faixa de anexar abaixo dos filhos; sempre montada |
| `FolderTree.tsx` | `index`/`parentId` propagados; render na ordem do array |
| `PendentFile.tsx` | draggable com handle + `DragNodeData` |

---

## 5. Verificação

Comandos usados (passam):

```bash
bun run lint
bun run typecheck
bun run build
```

Na época, o `build` falhava em erros de tipo pré-existentes
(`GeneralInfo.tsx`, `renderImage.tsx`); esses erros já foram corrigidos e o
build volta a passar.

---

## 6. Como usar (mini-manual)

Com a nova árvore:

- **Arraste pela garrinha** (ícone `Grip`, aparece ao passar o mouse) — o clique
  na linha continua abrindo/fechando pasta.
- **Soltar no meio da linha da pasta** → o item entra como **filho** (fim) e a
  pasta abre sozinha.
- **Soltar no topo da linha** → insere **antes** do item.
- **Soltar na base da linha** → insere **depois** do item.
- **Soltar na faixa abaixo dos últimos filhos** → anexa no fim da pasta.
- **Mover para um descendente próprio** ou **soltar no mesmo lugar** → nada
  acontece (sem quebrar a árvore).
- Mover arquivos **pendentes**: mesma mecânica; caem dentro da árvore na posição
  indicada.
- **Esc** durante o arrasto cancela sem efeitos.