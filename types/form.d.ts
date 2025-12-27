type FieldType = "text" | "number" | "date" | "email";

type Field = {
  id: string;
  label: string;
  type: FieldType;
  value?: string;
  error?:boolean
};