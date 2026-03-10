export function getLastFieldId(
  fields: Record<string, { y: number; text: string }>
): { lastId: string | null; lastText: string | null } {

  let lastId: string | null = null;
  let lastText: string | null = null;
  let maxY = -Infinity;

  for (const id in fields) {
    const field = fields[id];

    if (field.y > maxY) {
      maxY = field.y;
      lastId = id;
      lastText = field.text;
    }
  }

  return { lastId, lastText };
}