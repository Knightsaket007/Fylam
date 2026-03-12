type Field_Layout = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

type ActiveField = {
  lastId: string | null;
  lastText: string | null;
  maxX: number | null;
  maxY: number | null;
}