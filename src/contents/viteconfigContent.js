export function viteConfigContent(hasTailwind) {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
${hasTailwind ? 'import tailwindcss from "@tailwindcss/vite"' : ""}

export default defineConfig({
  plugins: [react()${hasTailwind ? ", tailwindcss()" : ""}],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
})`;
}
