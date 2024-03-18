import logger from '../logger';

const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

const processEnvRef = process.env;

describe('logger', () => {
  afterEach(() => jest.clearAllMocks());

  it('logs info messages to console', () => {
    logger.info('info message');

    expect(infoSpy).toHaveBeenCalled();
  });

  it('logs warning messages to console', () => {
    logger.warn('warn message');
    logger.warning('warning message');

    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  it('logs error messages to console', () => {
    logger.error('error message');

    expect(errorSpy).toHaveBeenCalled();
  });

  it('logs debug messages to console in non-production', () => {
    logger.debug('debug message');

    expect(debugSpy).toHaveBeenCalled();
  });

  it('does not log debug messages to console in production', () => {
    process.env = {
      NODE_ENV: 'production'
    };

    logger.debug('debug message');

    expect(debugSpy).not.toHaveBeenCalled();

    process.env = processEnvRef;
  });
});
