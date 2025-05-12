import {promises as fs} from 'fs';
import * as os from 'os';
import * as path from 'path';

import {PDFDocument} from 'pdf-lib';
import {fromPath} from 'pdf2pic';

import {ConcurrencyLimit} from '../classes/concurrency-limit';
import {MAX_CONCURRENT_REQUESTS} from '../constants';
import {_pm, report} from '../logger';
import {InputSource, PageResult, ProcessingOptions, Provider} from '../types';
import {getBufferFromInput} from '../utils/buffer';
import {callLLM} from '../utils/call-llm';
import {removeCodeBlockMarkers} from '../utils/string';
import {convertPdfToImages} from '../utils/pdf';
import {DEFAULT_PROMPT_TEMPLATE, READING_LEVEL_PROMPTS} from '../constants/llm';

export async function processPdf(
  input: InputSource,
  provider: Provider,
  key: string,
  options?: ProcessingOptions,
): Promise<PageResult[]> {
  try {
    const pdfBuffer = await getBufferFromInput(input);
    const images = await convertPdfToImages(pdfBuffer);
    const prompt = options?.prompt ?? 
      (options?.readingLevel ? 
        `${DEFAULT_PROMPT_TEMPLATE}\n\n${READING_LEVEL_PROMPTS[options.readingLevel]}` : 
        DEFAULT_PROMPT_TEMPLATE);

    const results: PageResult[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const base64Image = image.toString('base64');
      const content = await callLLM(key, base64Image, provider);

      results.push({
        page: i + 1,
        content: removeCodeBlockMarkers(content),
        metadata: {
          timestamp: new Date().toISOString(),
          size: image.length,
        },
      });
    }

    return results;
  } catch (error: unknown) {
    report(error);
    return [
      {
        page: 1,
        content: '',
        metadata: {
          timestamp: new Date().toISOString(),
          error: _pm(error),
        },
      },
    ];
  }
}
