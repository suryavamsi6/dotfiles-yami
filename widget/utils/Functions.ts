import translations from "./translation.json";

export function translate(num: number): string {
  const translation = translations.workspaces[num];
  return translation ? translation : num.toString();
}
