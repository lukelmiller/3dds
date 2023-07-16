import { writeFileSync } from "fs";
import { globSync } from "glob";
import { resolve } from "path";
import { parse, PropItem } from "react-docgen-typescript";
import packageJson from "../package.json" assert { type: "json" };

const fileName = "package.json";
const filenameRegex = new RegExp("/[^/]*$");
const files = globSync("src/**/*.tsx", {
	ignore: ["**/examples/**", "**/index.ts"],
});
const options = {
	propFilter: (prop: PropItem) => {
		const filterOut =
			prop.parent?.fileName.includes("node_modules") ||
			prop.description.includes("@ignore");
		return !filterOut;
	},
	shouldExtractValuesFromUnion: false,
};

const formatGitLink = (filePath: string) =>
	`${packageJson.repository.url.replace(".git", "/tree/main/")}${
		packageJson.repository.directory
	}/${filePath}`;

const parser = parse(files, options);

const docs = parser.map(
	({ description, displayName, filePath, props, tags }) => {
		return {
			description,
			displayName,
			filePath,
			gitLink: "",
			props: Object.values(props).map(
				({ defaultValue, description, name, required, type }) => ({
					defaultValue: defaultValue?.value,
					description,
					name,
					required,
					type: type.name,
				})
			),
			...tags,
		};
	}
);

export const generateDocs = () =>
	docs.forEach((doc) => {
		const filePath = doc.filePath.replace(filenameRegex, `/${fileName}`);
		doc.gitLink = formatGitLink(doc.filePath);
		const file = JSON.stringify(doc, null, 2);
		writeFileSync(resolve(filePath), file);
	});

generateDocs();
