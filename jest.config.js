/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  projects: [
    {
      preset: 'ts-jest',
      displayName: 'client',
      testMatch: ["/**/*.test.[jt]s?(x)"],
      testEnvironment: 'jest-environment-jsdom',
    },
    {
      preset: 'ts-jest',
      displayName: 'server',
      testMatch: ["/**/*.server.test.[jt]s?(x)"],
      testEnvironment: 'node',
    }
  ]
};