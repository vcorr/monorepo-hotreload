module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", 
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"] 
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // ...
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  
};
