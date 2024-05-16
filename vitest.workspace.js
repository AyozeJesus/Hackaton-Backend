import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vite.config.unit.js",
  "./vite.config.js",
  "./vite.config.integration.js",
  "./vite.config.e2e.js",
  "./vite.config.all.js"
])
