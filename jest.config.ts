// jest.config.ts
import type { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    'ts-jest': {
      // ts-jest configuration goes here
    },
  }
}
export default config