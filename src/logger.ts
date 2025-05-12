const RED = '\x1b[91m';
const YELLOW = '\x1b[93m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

export const report = (error: unknown): {message: string; stack?: string} => {
  let errorMessage: string;
  let errorStack: string | undefined;

  if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'An unknown error occurred';
  }

  const formattedError = `${RED}${BOLD}[OCRLLM ERROR] ${errorMessage}${RESET}`;
  if (errorStack) {
    console.error(
      `${formattedError}\n${RED}Stack trace:${RESET}\n${errorStack}`,
    );
  } else {
    console.error(formattedError);
  }

  return {message: errorMessage, stack: errorStack};
};

export const warn = (message: string): void => {
  console.warn(`${YELLOW}${BOLD}[OCRLLM WARN] ${message}${RESET}`);
};

export const log = (message: string): void => {
  console.log(`${BOLD}[OCRLLM] ${message}${RESET}`);
};

export const _pm = (message: unknown): string => {
  if (message instanceof Error) {
    return message.message;
  }
  if (typeof message === 'string') {
    return message;
  }
  try {
    return JSON.stringify(message);
  } catch {
    return 'Unknown Error';
  }
};
