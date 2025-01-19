import translations from "./translation.json";

export function translate(num: number): string {
  // @ts-ignore
  const translation: any = translations.workspaces[num];
  return translation ? translation : num.toString();
}
