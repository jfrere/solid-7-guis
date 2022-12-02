export type Path = "HOME" | "COUNTER" | "TEMPERATURE" | "FLIGHTS";

export function parseLocation(path: string): Path {
  if (path == "/counter") return "COUNTER";
  if (path == "/temperature") return "TEMPERATURE";
  if (path == "/flights") return "FLIGHTS";

  return "HOME";
}
