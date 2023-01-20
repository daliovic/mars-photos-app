import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import '@testing-library/jest-dom/extend-expect'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
