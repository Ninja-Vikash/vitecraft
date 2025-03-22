import { program } from "commander";
import inquirer from "inquirer";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";

import questions from "./questions.js";
import {
    createDirectory,
    createFile,
    processTemplate,
    generatePackageJson,
} from "./utils.js";
import { rootFolders, srcFolders } from "./folders.js";
import { jsconfigJsonContent } from "./contents/jsconfigJsonContent.js";
import { viteConfigContent } from "./contents/viteconfigContent.js";
import { indexHtmlContent } from "./contents/indexHtmlContent.js";
import { mainJsxContent } from "./contents/mainJsxContent.js";
import { appJsxContent } from "./contents/AppJsxContent.js";
import { appCssContent } from "./contents/appCssContent.js";
import { indexCssContent } from "./contents/indexCssContent.js";
import { eslintConfigJsContent } from "./contents/eslintConfigJsContent.js";
import { eslintrcContent } from "./contents/eslintrcContent.js";
import { prettierrcContent } from "./contents/prettierrcContent.js";
import { tsconfigJsonContent } from "./contents/tsconfigJsonContent.js";
import { tsconfigNodeJsonContent } from "./contents/tsconfigNodeJsonContent.js";
import { readmeMdContent } from "./contents/readmeMdContent.js";

// Setup Commander
program
    .name("scaffold")
    .description("A CLI tool for scaffolding projects")
    .version("0.1.0")
    .argument("[project-directory]", "Directory to create the project using vite")
    .action(async (projectDirectory) => {
        try {
            console.log(chalk.blue("🚀 Welcome to flash setup!\n"));

            // Get user answers through inquirer
            const answers = await inquirer.prompt(questions);

            // If project directory wasn't provided as argument, use the projectName from answers
            const targetDir = projectDirectory || answers.projectName;
            const fullPath = path.resolve(process.cwd(), targetDir);

            // Check if directory exists
            if (fs.existsSync(fullPath)) {
                const { overwrite } = await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "overwrite",
                        message: `Directory ${targetDir} already exists. Do you want to overwrite it?`,
                        default: false,
                    },
                ]);

                if (!overwrite) {
                    console.log(chalk.yellow("⚠️ Operation cancelled."));
                    return;
                }

                fs.removeSync(fullPath);
            }

            // Create project directory
            createDirectory(fullPath);

            // Create basic structure
            rootFolders.map((folderName) => {
                createDirectory(path.join(fullPath, folderName));
            });

            if (answers.framework === true) {
                srcFolders.map((folderName) => {
                    createDirectory(path.join(`${fullPath}/src`, folderName));
                });
            }

            // Create jsconfig.json
            createFile(
                path.join(fullPath, "jsconfig.json"),
                jsconfigJsonContent
            );

            // Create package.json
            const packageJsonContent = generatePackageJson(answers);
            createFile(path.join(fullPath, "package.json"), packageJsonContent);

            // Create README.md
            createFile(path.join(fullPath, "README.md"), readmeMdContent);

            // Create .gitignore
            const gitignoreContent = `node_modules\ndist\n\n.env\n`;
            createFile(path.join(fullPath, ".gitignore"), gitignoreContent);

            // Create vite.config.js/ts
            const viteConfigExt = answers.language === true ? "ts" : "js";

            createFile(
                path.join(fullPath, `vite.config.${viteConfigExt}`),
                answers.framework === true
                    ? viteConfigContent(
                          answers.cssFramework.includes("Tailwind CSS")
                      )
                    : ""
            );

            // Create index.html
            createFile(
                path.join(fullPath, "index.html"),
                indexHtmlContent(
                    answers.projectName,
                    answers.framework === true,
                    answers.language === true
                )
            );

            // Create framework-specific files
            const fileExt = answers.language === true ? "tsx" : "jsx";
            const mainExt = answers.language === true ? "tsx" : "jsx";

            if (answers.framework === true) {
                createFile(
                    path.join(fullPath, `src/main.${mainExt}`),
                    mainJsxContent
                );

                createFile(
                    path.join(fullPath, `src/App.${fileExt}`),
                    appJsxContent(answers.projectName, fileExt)
                );
            }

            // Create CSS files
            createFile(
                path.join(
                    fullPath,
                    answers.framework === true ? "src/App.css" : "src/style.css"
                ),
                appCssContent
            );

            createFile(path.join(fullPath, "src/index.css"), indexCssContent);

            // eslint.config.js file
            if (answers.features.includes("ESLint")) {
                createFile(
                    path.join(fullPath, "eslint.config.js"),
                    eslintConfigJsContent
                );
            }

            // Setup additional features
            if (answers.features.includes("ESLint")) {
                createFile(
                    path.join(fullPath, ".eslintrc.js"),
                    eslintrcContent(
                        answers.framework === true,
                        answers.language === true
                    )
                );
            }

            if (answers.features.includes("Prettier")) {
                createFile(
                    path.join(fullPath, ".prettierrc"),
                    prettierrcContent
                );
            }

            // TypeScript configuration
            if (answers.language === true) {
                createFile(
                    path.join(fullPath, "tsconfig.json"),
                    tsconfigJsonContent
                );

                createFile(
                    path.join(fullPath, "tsconfig.node.json"),
                    tsconfigNodeJsonContent
                );
            }

            // Update index.css for tailwindcss
            if (answers.cssFramework.includes("Tailwind CSS")) {
                createFile(
                    path.join(fullPath, "src/index.css"),
                    `@import "tailwindcss";`
                );
            }

            console.log(
                chalk.green.bold(
                    `\n✅ Project created successfully at ${fullPath}!`
                )
            );
            console.log(chalk.blue("\nNext steps:"));
            console.log(chalk.cyan(`  cd ${targetDir}`));
            console.log(chalk.cyan("  npm install"));
            console.log(chalk.cyan("  npm run dev\n"));
        } catch (error) {
            console.error(chalk.red("Error creating project:"), error);
            process.exit(1);
        }
    });

program.parse();
