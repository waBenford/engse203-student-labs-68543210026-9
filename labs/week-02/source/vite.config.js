import { defineConfig } from "vite";

// TODO: เปลี่ยนให้ตรงชื่อ repository ของตนเอง เช่น engse203-lab02-67123456789
const repositoryName = "engse203-student-labs-68543210026";

export default defineConfig({
  base: `/${repositoryName}/labs/week-02/`,
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});