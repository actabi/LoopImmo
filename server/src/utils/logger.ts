export const isDebug = () => process.env.DEBUG === 'true';

export const log = (...args: unknown[]) => {
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

export const error = (...args: unknown[]) => {
  if (isDebug()) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};
