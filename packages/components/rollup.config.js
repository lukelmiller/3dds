import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import glob from "glob";
import { extname, relative } from "path";
import typescript from "rollup-plugin-typescript2";
import { fileURLToPath } from "node:url";
import pkg from "./package.json";

const config = [
	{
		external: [
			...(Object.keys(pkg.peerDependencies) || {}),
			"react/jsx-runtime",
		],
		input: Object.fromEntries(
			glob
				.sync("src/**/*.{ts,tsx}", {
					ignore: { ignored: (path) => path.name.includes(".test.") },
				})
				.map((file) => [
					relative(
						"src",
						file.slice(0, file.length - extname(file).length)
					),
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
				include: ["**/*.ts+(|x)"],
				exclude: ["**/node_modules/**/*"],
				tsconfig: "./tsconfig.json",
				typescript: require("typescript"),
			}),
		],
	},
];

export default config;
