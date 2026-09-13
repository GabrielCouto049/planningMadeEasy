# Planning Made Easy

Aplicativo para planejar e documentar projetos de software antes de escrever
código. Fluxo em etapas: **Informações gerais**, **Arquitetura de arquivos** e
**Design** (paleta, tipografia e estilo).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 + shadcn/ui (base-nova)
- Zustand + Immer (estado), `@dnd-kit/react` (árvore de arquivos)
- React Router

## Como rodar

```bash
bun install
bun run dev
```

Scripts:

| Comando              | Descrição                                    |
| -------------------- | -------------------------------------------- |
| `bun run dev`        | Servidor de desenvolvimento                  |
| `bun run build`      | Typecheck + build de produção                |
| `bun run typecheck`  | Checa tipos do app (`tsconfig.app.json`)     |
| `bun run lint`       | ESLint                                       |
| `bun run format`     | Prettier (formata `.ts`/`.tsx`)              |

### Variáveis de ambiente

Copie `.env.example` para `.env` e preencha `VITE_GOOGLE_FONTS_API_KEY`
(obtenha uma em [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api))
para usar a API de fontes do Google.

## Estrutura

```
src/
├── app/            # App shell, rotas, providers
├── components/     # UI (shadcn) e components compartilhados (layout, shared)
├── features/       # Features: newProject, dashboard, allProjects
├── stores/         # Stores globais (zustand)
├── styles/         # Tailwind + classes utilitárias
├── types/          # Tipos globais do domínio
└── utils/          # Utilitários (data, render de imagem)
```

Dentro de `features/newProject`, cada etapa vive em `steps/<step>/` com
`components/`, `slices/` (estado), `constants/` e `utils/` próprios. O fluxo do
novo projeto é roteirizado por URL (`/projetos/novo/<etapa>`) e o estado é
compartilhado num único store (features/newProject/stores/newProjectStore).

## Estado

- `newProjectStore` guarda o rascunho do projeto em criação e é reiniciado após
  o salvamento.
- `globalStore` guarda a lista de projetos criados (em memória).