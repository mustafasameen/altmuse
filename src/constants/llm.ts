export const DEFAULT_MODEL_TEMPERATURE = 0.1;

/**
 * Prompt template for the LLM.
 */
export const DEFAULT_PROMPT_TEMPLATE =
  'Extract all visible text from this image and format the output as markdown. Then, simplify the text to make it more accessible for people with cognitive disabilities. Use clear, simple language, short sentences, and avoid complex vocabulary. Include only the simplified text content; no explanations or additional text should be included. If the image is empty, return an empty string.';

export const READING_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export type ReadingLevel = typeof READING_LEVELS[keyof typeof READING_LEVELS];

export const READING_LEVEL_PROMPTS = {
  [READING_LEVELS.EASY]: 'Simplify the text to a very basic reading level (grade 1-3). Use very short sentences, simple words, and avoid any complex concepts.',
  [READING_LEVELS.MEDIUM]: 'Simplify the text to an intermediate reading level (grade 4-6). Use clear language and moderate sentence length.',
  [READING_LEVELS.HARD]: 'Keep the original text complexity but ensure it is well-structured and clear.',
} as const;
