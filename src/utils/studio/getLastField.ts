export function getLastFieldId(
  fields: Record<string, {x:number ;y: number; text: string }>
): { lastId: string | null; lastText: string | null; maxX:number ; maxY: number} {

  let lastId: string | null = null;
  let lastText: string | null = null;
  let maxY = -Infinity;
  let maxX = 0;

  for (const id in fields) {
    const field = fields[id];

    if (field.y > maxY) {
      maxX = field.x;
      maxY = field.y;
      lastId = id;
      lastText = field.text;
    }
  }

  console.log("maxY...", maxY)

  return { lastId, lastText, maxX,  maxY };
}