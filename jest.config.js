module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*\\.test)\\.(ts|tsx|js)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
}
