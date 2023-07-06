import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import glob from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import typescript from "rollup-plugin-typescript2";
import ts from "typescript";
import pkg from "./package.json";

const config = [
	{
		external: [
			...Object.keys(pkg.peerDependencies || {}),
			"react/jsx-runtime",
		],
		input: Object.fromEntries(
			glob
				.sync("src/**/*.{ts,tsx}", {
					ignore: ["/**/*.test.*", "src/setupTests.ts"],
				})
				.map((file) => [
					// This remove `src/` as well as the file extension from each
					// file, so e.g. src/nested/foo.js becomes nested/foo
					path.relative(
						"src",
						file.slice(0, file.length - path.extname(file).length)
					),
					// This expands the relative paths to absolute paths, so e.g.
					// src/nested/foo becomes /project/src/nested/foo.js
					fileURLToPath(new URL(file, import.meta.url)),
				])
		),
		output: [
			{
				exports: "auto",
				dir: "./dist/cjs",
				format: "cjs",
			},
			{
				exports: "auto",
				dir: "./dist",
				format: "es",
			},
		],
		plugins: [
			nodeResolve({ moduleDirectories: ["node_modules"] }),
			commonjs(),
			terser(),
			typescript({
				tsconfig: "./tsconfig.build.json",
				typescript: ts,
			}),
		],
	},
];

export default config;
