/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/__test__/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true
};

// roots: ["<rootDir>/dist"],
// testMatch: ["<rootDir>/dist/__test__/*.test.ts"],

