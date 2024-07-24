import jsdoc from "eslint-plugin-jsdoc";
import preferArrow from "eslint-plugin-prefer-arrow";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import html from "eslint-plugin-html";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["src/**/*.type.ts"],
}, ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
), {
    plugins: {
        jsdoc,
        "prefer-arrow": preferArrow,
        "@typescript-eslint": typescriptEslint,
        html,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            createDefaultProgram: true,
        },
    },

    rules: {
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/adjacent-overload-signatures": "warn",

        "@typescript-eslint/array-type": ["warn", {
            default: "array",
        }],

        "@typescript-eslint/ban-types": ["warn", {
            types: {
                Object: {
                    message: "Avoid using the `Object` type. Did you mean `object`?",
                },

                Function: {
                    message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
                },

                Boolean: {
                    message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
                },

                Number: {
                    message: "Avoid using the `Number` type. Did you mean `number`?",
                },

                String: {
                    message: "Avoid using the `String` type. Did you mean `string`?",
                },

                Symbol: {
                    message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
                },
            },
        }],

        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/dot-notation": "warn",
        "@typescript-eslint/indent": "warn",

        "@typescript-eslint/member-delimiter-style": ["warn", {
            multiline: {
                delimiter: "semi",
                requireLast: true,
            },

            singleline: {
                delimiter: "semi",
                requireLast: false,
            },
        }],

        "@typescript-eslint/naming-convention": ["warn", {
            selector: "enum",
            format: ["PascalCase"],
        }],

        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "warn",
        "@typescript-eslint/no-namespace": "warn",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/prefer-for-of": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "@typescript-eslint/prefer-namespace-keyword": "warn",
        "@typescript-eslint/quotes": ["warn", "double"],
        "@typescript-eslint/semi": ["warn", "always"],

        "@typescript-eslint/triple-slash-reference": ["warn", {
            path: "always",
            types: "prefer-import",
            lib: "always",
        }],

        "@typescript-eslint/unified-signatures": "warn",
        complexity: "off",
        "constructor-super": "warn",
        "eol-last": "warn",
        eqeqeq: ["warn", "smart"],
        "guard-for-in": "warn",

        "id-blacklist": [
            "warn",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined",
        ],

        "id-match": "warn",
        "jsdoc/check-alignment": "warn",
        "max-classes-per-file": ["warn", 1],

        "max-len": ["warn", {
            code: 160,
        }],

        "new-parens": "warn",
        "no-bitwise": "warn",
        "no-caller": "warn",
        "no-cond-assign": "warn",
        "no-console": "warn",
        "no-debugger": "warn",
        "no-empty": "off",
        "no-eval": "warn",
        "no-fallthrough": "off",
        "no-invalid-this": "off",

        "no-multiple-empty-lines": ["warn", {
            max: 1,
        }],

        "no-new-wrappers": "warn",

        "no-shadow": ["warn", {
            hoist: "all",
        }],

        "no-throw-literal": "warn",

        "no-trailing-spaces": ["warn", {
            skipBlankLines: true,
        }],

        "no-undef-init": "warn",
        "no-unsafe-finally": "warn",
        "no-unused-labels": "warn",
        "no-var": "warn",
        "object-shorthand": "warn",
        "one-var": ["warn", "never"],
        "padding-line-between-statements": ["warn"],
        "prefer-const": "warn",
        radix: "warn",
        "use-isnan": "warn",
        "valid-typeof": "off",
    },
}];
