import { text } from "stream/consumers";

export function getLastFieldId(
  fields: Record<string, { y: number }>
): string | null {

  let lastId: string | null = null;
  let lastText: string | null;
  let maxY = -Infinity;

  for (const id in fields) {
    const field = fields[id];

    if (field.y > maxY) {
      maxY = field.y;
      lastId = id;
      lastText =  text;
    }
  }

  return {lastId, lastText};
}