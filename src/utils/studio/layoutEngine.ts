type Field = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

export function applyVerticalPush(
  fields: Record<string, Field>,
  id: string,
  newHeight: number
) {
  const current = fields[id];
  const delta = newHeight - current.height;

  if (delta === 0) return fields;

}
