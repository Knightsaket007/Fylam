declare module "pdf-parse" {
  interface PDFParseResult {
    text: string;
    numpages: number;
    numrender: number;
    info: unknown;
    metadata: unknown;
    version: string;
  }

  function pdf(
    dataBuffer: Buffer,
    options?: { max?: number }
  ): Promise<PDFParseResult>;

  export default pdf;
}
