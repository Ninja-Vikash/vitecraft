export function indexHtmlContent(projectName, hasFramework, hasTypeScript) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="${hasFramework === true ? "root" : "app"}"></div>
    <script type="module" src="/src/main.${
        hasTypeScript ? "tsx" : "jsx"
    }"></script>
  </body>
</html>`;
}
