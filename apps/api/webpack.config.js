const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join, resolve } = require("path");

module.exports = {
  output: {
    path: join(__dirname, "dist"),
    ...(process.env.NODE_ENV !== "production" && {
      devtoolModuleFilenameTemplate: "[absolute-resource-path]"
    })
  },
  resolve: {
    alias: {
      "@/*": resolve(__dirname, "src/*")
    }
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: "node",
      compiler: "tsc",
      main: "./src/server.ts",
      tsConfig: "./tsconfig.app.json",
      assets: [],
      optimization: false,
      outputHashing: "none",
      generatePackageJson: true,
      sourceMaps: true
    })
  ]
};
