module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'],
  testMatch: ['**/?(*.)+(spec|test).js'],
};