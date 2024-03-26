const commonOptions = {
  preset: 'ts-jest',
  transform: {
    'tsconfig.jest.json': ['ts-jest']
  }
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      ...commonOptions,
      displayName: 'client',
      testMatch: ["./**/*.test.[jt]s?(x)"],
      testEnvironment: 'jest-environment-jsdom',
    },
    {
      ...commonOptions,
      displayName: 'server',
      testMatch: ["./**/*.server.test.[jt]s?(x)"],
      testEnvironment: 'node',
    }
  ]
};