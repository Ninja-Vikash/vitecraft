import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

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
        version: "0.1.0",
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
            globals: "^15.15.0",
            vite: "^6.2.0",
        },
    };

    // Would you like to use axios?
    if (answers.api === true) {
        packageJson.dependencies["axios"] = "^1.8.0";
    }

    // Would you like to use react?
    if (answers.framework === true) {
        packageJson.dependencies["react"] = "^19.0.0";
        packageJson.dependencies["react-dom"] = "^19.0.0";
        packageJson.devDependencies["@vitejs/plugin-react"] = "^4.3.4";
    } else if (answers.framework === false) {
    }

    // Would you like to use TypeScript?
    if (answers.language === true) {
        packageJson.devDependencies["typescript"] = "^4.9.0";
        packageJson.devDependencies["@types/react"] = "^19.0.10";
        packageJson.devDependencies["@types/react-dom"] = "^19.0.4";
    }

    // Add optional features
    if (answers.features.includes("ESLint")) {
        packageJson.devDependencies["@eslint/js"] = "^9.21.0";
        packageJson.devDependencies["eslint"] = "^9.21.0";
        packageJson.devDependencies["eslint-plugin-react"] = "^7.37.4";
        packageJson.devDependencies["eslint-plugin-react-hooks"] = "^5.0.0";
        packageJson.devDependencies["eslint-plugin-react-refresh"] = "^0.4.19";
    }

    if (answers.features.includes("Prettier")) {
        packageJson.devDependencies["prettier"] = "^2.8.0";
    }

    // Additional packages
    if (answers.features.includes("React Router")) {
        packageJson.dependencies["react-router-dom"] = "^6.4.0";
    }

    // Add CSS framework
    if (answers.cssFramework === "Tailwind CSS") {
        packageJson.dependencies["@tailwindcss/vite"] = "^4.0.9";
    } else if (answers.cssFramework === "Material UI") {
        packageJson.dependencies["@mui/material"] = "^5.11.0";
        packageJson.dependencies["@emotion/react"] = "^11.10.0";
        packageJson.dependencies["@emotion/styled"] = "^11.10.0";
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
