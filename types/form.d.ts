type FieldType = "text" | "number" | "date";

type Field = {
  id: string;
  label: string;
  type: FieldType;
  value?: string;
};