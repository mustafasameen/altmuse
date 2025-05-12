import {createHash} from 'crypto';

import LRUCache from '../classes/lru-cache';
import {_pm, report} from '../logger';
import {ImageResult, InputSource, ProcessingOptions, Provider} from '../types';
import {getBufferFromInput} from '../utils/buffer';
import {callLLM} from '../utils/call-llm';
import {removeCodeBlockMarkers} from '../utils/string';
import {DEFAULT_PROMPT_TEMPLATE, READING_LEVEL_PROMPTS} from '../constants/llm';

const CACHE_CAPACITY = 500; // Maximum number of items in the cache

const cache = new LRUCache<string, ImageResult>(CACHE_CAPACITY);

export async function processImage(
  input: InputSource,
  provider: Provider,
  key: string,
  options?: ProcessingOptions,
): Promise<ImageResult> {
  try {
    const imageBuffer = await getBufferFromInput(input);
    const hash = createHash('sha256').update(imageBuffer).digest('hex');

    const cachedResult = cache.get(hash);
    if (cachedResult) {
      return cachedResult;
    }

    const base64Image = imageBuffer.toString('base64');
    const prompt = options?.prompt ?? 
      (options?.readingLevel ? 
        `${DEFAULT_PROMPT_TEMPLATE}\n\n${READING_LEVEL_PROMPTS[options.readingLevel]}` : 
        DEFAULT_PROMPT_TEMPLATE);

    const content = await callLLM(key, base64Image, provider);

    const result: ImageResult = {
      content: removeCodeBlockMarkers(content),
      metadata: {
        timestamp: new Date().toISOString(),
        size: imageBuffer.length,
      },
    };

    cache.set(hash, result);
    return result;
  } catch (error: unknown) {
    report(error);
    return {
      content: '',
      metadata: {
        timestamp: new Date().toISOString(),
        error: _pm(error),
      },
    };
  }
}
