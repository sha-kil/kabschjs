import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: '',
  testRegex: './test/*.test.ts',
  collectCoverage: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;