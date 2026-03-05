export function getLastFieldId(
  fields: Record<string, { y: number }>
): string | null {

  let lastId: string | null = null;
  let maxY = -Infinity;

  for (const id in fields) {
    const field = fields[id];

    if (field.y > maxY) {
      maxY = field.y;
      lastId = id;
    }
  }

  return lastId;
}