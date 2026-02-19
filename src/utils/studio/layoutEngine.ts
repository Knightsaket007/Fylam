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

  const updated = { ...fields };

  updated[id] = {
    ...current,
    height: newHeight,
  };

  Object.keys(updated).forEach((key) => {
    if (key === id) return;

    const field = updated[key];

    const isBelow = field.y > current.y;

    const overlapsHorizontally =
      field.x < current.x + current.width &&
      field.x + field.width > current.x;

    if (isBelow && overlapsHorizontally) {
      updated[key] = {
        ...field,
        y: field.y + delta,
      };
    }
  });

  return updated;
}
