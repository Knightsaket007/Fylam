type EdgeInput = {
  x: number;
  y: number;
  fieldWidth: number;
  fieldHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  padding?: number;
};

export function getGripPosition({
  x,
  y,
  fieldWidth,
  fieldHeight,
  canvasWidth,
  canvasHeight,
  padding = 20,
}: EdgeInput): string {

  const nearTop = y < padding;
  const nearLeft = x < padding;
  const nearRight = x > canvasWidth - padding - fieldWidth;
  const nearBottom = y > canvasHeight - padding - fieldHeight;

  // -=-=--==-=-=- CORNERS FIRST -=-==-//
  if (nearTop && nearLeft) return "-bottom-8 left-0";
  if (nearTop && nearRight) return "-bottom-8 right-0";
  if (nearBottom && nearLeft) return "-top-8 left-0";
  if (nearBottom && nearRight) return "-top-8 right-0";

  //=-=-=-=-=-=- EDGES =-=-==-//
  if (nearTop) return "top-1/2 -translate-y-1/2 -right-8";
  if (nearBottom) return "top-1/2 -translate-y-1/2 -right-8";
  if (nearLeft) return "-top-8 left-0";
  if (nearRight) return "-top-8 right-0";

  //=---==--=-=-=- DEFAULT =-=-=-//
  return "-top-8 left-1/2 -translate-x-1/2";
}
