/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@App/(.*)": "<rootDir>/src/$1"
  },
  modulePathIgnorePatterns: ["<rootDir>/bin/"]
};
