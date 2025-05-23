import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    build: {
        outDir: "dist-react",
    },
    server: {
        port: 5123,
        strictPort: true,
    },
});
