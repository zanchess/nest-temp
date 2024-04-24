export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s', '!**/main.ts'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/', 'main\\.ts'],
};
