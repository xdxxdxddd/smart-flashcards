import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        rules: {
            "no-unused-vars": "warn",
            "no-console": "off",
        },
        languageOptions: {
            globals: {
                // Глобальні змінні браузера та Node.js
                window: "readonly",
                document: "readonly",
                console: "readonly",
                import: "readonly",
                process: "readonly",
                // Глобальні змінні для тестів (Jest & Playwright)
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                jest: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly"
            }
        }
    }
];