import {SUPPORTED_PROVIDERS} from '../constants';

export * from './provider';

/**
 * Supported OCR providers.
 */
export type Provider = (typeof SUPPORTED_PROVIDERS)[number];

/**
 * Configuration options for OcrLLM.
 */
export interface OcrLLMConfig {
  /** The OCR provider to use. */
  provider: Provider;
  /** API key for the selected provider. */
  key: string;
}

/**
 * Metadata for OCR processing results.
 */
export interface OCRMetadata {
  /** Timestamp when the processing was completed */
  timestamp?: string;
  /** Size of the processed file in bytes */
  size?: number;
  /** Error message if processing failed */
  error?: string;
}

/**
 * Result of OCR processing for a single page.
 */
export interface PageResult {
  /** Page number in the document. */
  page: number;
  /** Extracted text content. */
  content: string;
  /** Optional metadata about the page. */
  metadata?: OCRMetadata;
}

/**
 * Result of OCR processing for a single image.
 */
export interface ImageResult {
  /** Extracted text content. */
  content: string;
  /** Optional metadata about the image. */
  metadata?: OCRMetadata;
}

/**
 * Input source for OCR processing.
 * Can be a URL, file path, base64 string, or Buffer.
 */
export type InputSource = string | Buffer;

export interface ProcessingOptions {
  readingLevel?: 'easy' | 'medium' | 'hard';
  prompt?: string;
}

export const READING_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type ReadingLevel = typeof READING_LEVELS[keyof typeof READING_LEVELS];

export const READING_LEVEL_PROMPTS = {
  easy: 'Simplify this text to be very easy to read, using simple words and short sentences. Aim for a grade 1-3 reading level.',
  medium: 'Simplify this text to be moderately easy to read, using clear language and well-structured sentences. Aim for a grade 4-6 reading level.',
  hard: 'Keep the original text as is, without simplification.',
} as const;
