import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // The entry point to your library (your main source file)
      entry: './src/main.js',
      name: 'NetSuiteJson',              // Global variable name when used via <script>
      fileName: (format) => `netsuite-json.${format}.js`,
      formats: ['es', 'umd'],     // ESM for modern bundlers, UMD for <script>
    },
    rollupOptions: {
      // Externalize deps you don’t want bundled (they’ll be required separately)
      external: [],
      output: {
        globals: {
          // If you externalize, map package → global name
          // e.g. lodash: '_'
        },
      },
    },
  },
})