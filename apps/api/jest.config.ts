import { createDefaultPreset, pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  setupFiles: ["<rootDir>/testSetup.ts"],
};
