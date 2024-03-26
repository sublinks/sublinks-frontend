const commonOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ]
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