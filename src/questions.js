export default [
    {
        type: "input",
        name: "projectName",
        message: "What is your project name?",
        default: "my-app",
    },
    {
        type: "confirm",
        name: "framework",
        message: "Would you like to use react?",
        default: true,
    },
    {
        type: "confirm",
        name: "language",
        message: "Would you like to use TypeScript?",
        default: false,
    },
    {
        type: "checkbox",
        name: "features",
        message: "Select additional packages:",
        choices: ["ESLint", "Prettier", "React Router"],
    },
    {
        type: "list",
        name: "cssFramework",
        message: "Select a CSS framework:",
        choices: ["None", "Tailwind CSS", "Material UI"],
        default: "None",
    },
    {
        type: "confirm",
        name: "api",
        message: "Would you like to use axios?",
        default: true
    }
];
