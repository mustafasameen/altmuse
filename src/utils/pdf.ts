import {fromBuffer} from 'pdf2pic';
import fs from 'fs';

/**
 * Converts a PDF buffer to an array of image buffers.
 * @param pdfBuffer - The PDF file as a buffer
 * @returns Promise resolving to an array of image buffers
 */
export async function convertPdfToImages(pdfBuffer: Buffer): Promise<Buffer[]> {
  const convert = fromBuffer(pdfBuffer, {
    density: 300,
    format: 'png',
    width: 2480,
    height: 3508,
  });

  const results = await convert.bulk(-1); // -1 means all pages
  const images: Buffer[] = [];

  for (const result of results) {
    if (result?.path) {
      const imageBuffer = await fs.promises.readFile(result.path);
      await fs.promises.unlink(result.path);
      images.push(imageBuffer);
    }
  }

  return images;
} 