// jest.config.ts
import type { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
    }
  },
  testRegex: 'test/.*.\\.(ts)$',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  maxWorkers: '2'
};
export default config;
