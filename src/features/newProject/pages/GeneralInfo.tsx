import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@base-ui/react/input"

export default function GeneralInfo() {
  return (
    <>
      <h1 className="sectionTitle">Informações</h1>

      <FieldSet>
        <FieldLegend className="mb-4">Informações Gerais</FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Nome do Projeto</FieldLabel>
            <Input
              id="name"
              className="formTextInput"
              autoComplete="off"
              placeholder="Task Manager"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Descrição</FieldLabel>

            <Textarea id="description" className="formTextInput h-24" />

            <FieldError className="hidden">Descrição inválida</FieldError>
          </Field>
        </FieldGroup>
      </FieldSet>
    </>
  )
}
