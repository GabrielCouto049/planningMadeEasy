import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import type { GenericNodeProps, Node } from "@/types/folderTreeTypes"
import { createNode, getFileExtension } from "../utils/newFileUtils"
import { Textarea } from "@/components/ui/textarea"
import { fileTypeLib } from "../constants/iconLib"
import { Button } from "@/components/ui/button"
import { FolderPlus, File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@base-ui/react/input"
import { useState } from "react"

const EMPTY_FILE: Omit<GenericNodeProps, "id"> = {
  title: "",
  description: "",
}

export default function NewFileForm({
  setPendentFiles,
}: {
  setPendentFiles: React.Dispatch<React.SetStateAction<Node[]>>
}) {
  const [draftFile, setDraftFile] =
    useState<Omit<GenericNodeProps, "id">>(EMPTY_FILE)

  const extension = getFileExtension(draftFile.title)
  const fileType = fileTypeLib[extension]

  function saveFile() {
    if (!draftFile.title.trim()) return

    const node = createNode({
      ...draftFile,
      title: draftFile.title.trim(),
    })

    setPendentFiles((prev) => [...prev, node])

    setDraftFile(EMPTY_FILE)
  }

  return (
    <form
      className="card flex flex-col gap-4 p-6"
      onSubmit={(event) => {
        event.preventDefault()
        saveFile()
      }}
    >
      <FieldSet className="gap-3">
        <FieldLegend className="mb-1">Novo arquivo ou pasta</FieldLegend>

        <Field>
          <FieldLabel htmlFor="node-title">
            Nome
            {draftFile.title.trim() && (
              <Badge variant="secondary" className="ml-auto gap-1 text-xs">
                {fileType ? (
                  <>
                    <File className="size-3" />
                    Arquivo .{extension}
                  </>
                ) : (
                  "Pasta"
                )}
              </Badge>
            )}
          </FieldLabel>

          <Input
            id="node-title"
            className="formTextInput"
            autoComplete="off"
            value={draftFile.title}
            onChange={(event) =>
              setDraftFile((prev) => ({
                ...prev,
                title: event.target.value,
              }))
            }
            placeholder="Ex: src ou App.tsx"
          />
        </Field>

        <p className="-mt-2 text-xs leading-snug text-muted-foreground">
          Com extensão cria um arquivo · sem extensão cria uma pasta
        </p>

        <Field>
          <FieldLabel htmlFor="node-description">Descrição</FieldLabel>

          <Textarea
            id="node-description"
            className="formTextInput h-24 resize-none"
            value={draftFile.description}
            onChange={(event) =>
              setDraftFile((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            placeholder="Descreva o propósito deste item..."
          />
        </Field>
      </FieldSet>

      <Button
        type="submit"
        className="mt-auto w-full"
        disabled={!draftFile.title.trim()}
      >
        <FolderPlus data-icon="inline-start" />
        Adicionar
      </Button>
    </form>
  )
}
