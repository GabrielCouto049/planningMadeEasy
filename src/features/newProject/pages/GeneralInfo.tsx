import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@base-ui/react/input"
import IconPicker from "../components/IconPicker"
import TagInput from "../components/TagInput"
import ComboboxField from "../components/ComboboxField"
import { FRAMEWORK_SUGGESTIONS, LANGUAGE_SUGGESTIONS } from "../constants/stackSuggestions"
import useProjectCreation from "../hooks/useProjectCreation"

export default function GeneralInfo() {
  const {title, setTitle} = useProjectCreation()

  return (
    <>
      <h1 className="sectionTitle">Informações Gerais</h1>

      <div className="grid grid-cols-2 gap-6">
        <FieldSet className="col-span-2">
          <FieldLegend className="mb-4">Identidade</FieldLegend>

          <FieldGroup className="card p-6">
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Nome do Projeto</FieldLabel>
                <Input
                  id="name"
                  className="formTextInput"
                  autoComplete="off"
                  placeholder="Task Manager"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Descrição</FieldLabel>
                <Textarea
                  id="description"
                  className="formTextInput h-24"
                  placeholder="Descreva brevemente o projeto..."
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>Ícone ou Imagem</FieldLabel>
              <IconPicker />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="mb-4">Stack</FieldLegend>

          <FieldGroup className="card p-6">
            <Field>
              <FieldLabel>Linguagem</FieldLabel>
              <ComboboxField
                suggestions={LANGUAGE_SUGGESTIONS}
                placeholder="Ex: TypeScript"
              />
            </Field>

            <Field>
              <FieldLabel>Framework</FieldLabel>
              <ComboboxField
                suggestions={FRAMEWORK_SUGGESTIONS}
                placeholder="Ex: React"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="mb-4">Bibliotecas</FieldLegend>

          <FieldGroup className="card p-6">
            <Field>
              <FieldLabel>Libs Utilizadas</FieldLabel>
              <TagInput placeholder="Ex: Zustand, React Router..." />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="mb-4">Problema Resolvido</FieldLegend>

          <FieldGroup className="card p-6">
            <Field>
              <FieldLabel>Qual problema este projeto resolve?</FieldLabel>
              <Textarea
                className="formTextInput h-24"
                placeholder="Descreva o problema que o projeto soluciona..."
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend className="mb-4">Público-Alvo</FieldLegend>

          <FieldGroup className="card p-6">
            <Field>
              <FieldLabel>Quem vai usar este projeto?</FieldLabel>
              <Input
                className="formTextInput"
                autoComplete="off"
                placeholder="Ex: Desenvolvedores frontend"
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </>
  )
}