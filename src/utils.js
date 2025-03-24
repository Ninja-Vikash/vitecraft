import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import versions from "./versions.js";

// Create directory if it doesn't exist
const createDirectory = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        // console.log(chalk.green(`✅ Created directory: ${dirPath}`));
    }
};

// Create a file with content
const createFile = (filePath, content) => {
    fs.writeFileSync(filePath, content);
    // console.log(chalk.green(`✅ Created file: ${filePath}`));
};

// Copy template directory to destination
const copyTemplateDir = (templatePath, destPath, options = {}) => {
    fs.copySync(templatePath, destPath);
    // console.log(chalk.green(`✅ Copied template files to: ${destPath}`));
};

// Process template strings with variables
const processTemplate = (templateString, variables) => {
    let result = templateString;
    Object.keys(variables).forEach((key) => {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
        result = result.replace(regex, variables[key]);
    });
    return result;
};

// Generate package.json based on answers
const generatePackageJson = (answers) => {
    const packageJson = {
        name: answers.projectName,
        version: "0.0.1",
        private: true,
        type: "module",
        scripts: {
            dev: "vite",
            build: "vite build",
            lint: "eslint .",
            preview: "vite preview",
        },
        dependencies: {},
        devDependencies: {
            globals: versions.globals,
            vite: versions.vite,
        },
    };

    // Would you like to use axios?
    if (answers.api === true) {
        packageJson.dependencies["axios"] = versions.axios;
    }

    // Would you like to use react?
    if (answers.framework === true) {
        packageJson.dependencies["react"] = versions.react;
        packageJson.dependencies["react-dom"] = versions["react-dom"];
        packageJson.devDependencies["@vitejs/plugin-react"] = versions["@vitejs/plugin-react"];
    } else if (answers.framework === false) {
    }

    // Would you like to use TypeScript?
    if (answers.language === true) {
        packageJson.devDependencies["typescript"] = versions.typescript;
        packageJson.devDependencies["@types/react"] = versions["@types/react"];
        packageJson.devDependencies["@types/react-dom"] = versions["@types/react-dom"];
    }

    // Add optional features
    if (answers.features.includes("ESLint")) {
        packageJson.devDependencies["@eslint/js"] = versions["@eslint/js"];
        packageJson.devDependencies["eslint"] = versions.eslint;
        packageJson.devDependencies["eslint-plugin-react"] = versions["eslint-plugin-react"];
        packageJson.devDependencies["eslint-plugin-react-hooks"] = versions["eslint-plugin-react-hooks"];
        packageJson.devDependencies["eslint-plugin-react-refresh"] = versions["eslint-plugin-react-refresh"];
    }

    if (answers.features.includes("Prettier")) {
        packageJson.devDependencies["prettier"] = versions.prettier;
    }

    // Additional packages
    if (answers.features.includes("React Router")) {
        packageJson.dependencies["react-router-dom"] = versions["react-router-dom"];
    }

    // Add CSS framework
    if (answers.cssFramework === "Tailwind CSS") {
        packageJson.dependencies["@tailwindcss/vite"] = versions["@tailwind/vite"];
    } else if (answers.cssFramework === "Material UI") {
        packageJson.dependencies["@mui/material"] = versions["@mui/material"];
        packageJson.dependencies["@emotion/react"] = versions["@emotion/react"];
        packageJson.dependencies["@emotion/styled"] = versions["@emotion/styled"];
    }

    return JSON.stringify(packageJson, null, 2);
};

export {
    createDirectory,
    createFile,
    copyTemplateDir,
    processTemplate,
    generatePackageJson,
};
