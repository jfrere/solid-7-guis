export type Path = "HOME" | "COUNTER" | "TEMPERATURE";

export function parseLocation(path: string): Path {
  if (path == "/counter") return "COUNTER";
  if (path == "/temperature") return "TEMPERATURE";

  return "HOME";
}
