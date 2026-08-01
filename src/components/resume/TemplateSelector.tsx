interface Props {
  template: string;
  setTemplate: (value: string) => void;
}

export default function TemplateSelector({
  template,
  setTemplate,
}: Props) {
  return (
    <select
      value={template}
      onChange={(e) => setTemplate(e.target.value)}
      className="rounded-xl bg-slate-800 p-4 text-white"
    >
      <option value="modern">Modern</option>
      <option value="minimal">Minimal</option>
      <option value="professional">Professional</option>
    </select>
  );
}