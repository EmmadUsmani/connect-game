module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "client/tsconfig.json",
      "server/tsconfig.json",
      "shared/tsconfig.json",
    ],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "react-app",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: [
          `${__dirname}/client/tsconfig.json`,
          `${__dirname}/server/tsconfig.json`,
          `${__dirname}/shared/tsconfig.json`,
        ],
      },
    },
  },
  rules: {
    curly: "warn",
    eqeqeq: "warn",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/extensions": ["warn", "never"],
    "import/no-default-export": "warn",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": [
      "warn",
      {
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true,
        reservedFirst: true,
      },
    ],
  },
}
