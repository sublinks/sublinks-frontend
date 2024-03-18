enum ConsoleMethods {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

type Logger = Record<string, (...args: unknown[]) => void>;

const shouldLogToConsole = (consoleMethod: ConsoleMethods) => consoleMethod !== ConsoleMethods.DEBUG || process.env.NODE_ENV !== 'production';

const logToConsole = (consoleMethod: ConsoleMethods, ...args: unknown[]) => {
  if (shouldLogToConsole(consoleMethod)) {
    // eslint-disable-next-line no-console
    console[consoleMethod](...args);
  }
};

const logger: Logger = {
  debug: (...args) => logToConsole(ConsoleMethods.DEBUG, ...args),
  info: (...args) => logToConsole(ConsoleMethods.INFO, ...args),
  warning: (...args) => logToConsole(ConsoleMethods.WARN, ...args),
  warn: (...args) => logToConsole(ConsoleMethods.WARN, ...args),
  error: (...args) => logToConsole(ConsoleMethods.ERROR, ...args)
};

export default logger;
