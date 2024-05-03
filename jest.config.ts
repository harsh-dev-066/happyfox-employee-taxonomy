// jest.config.js
module.exports = {
  // other configuration options
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    "^.+\\.scss$": "jest-transform-stub",
    "^.+\\.css$": "jest-transform-stub",
    // Add other file transformations here if needed
  },
  moduleNameMapper: {
    // Your existing mappings here
    "\\.(css|scss)$": "jest-transform-stub",
    // You can also map other static assets like images if needed
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
};
