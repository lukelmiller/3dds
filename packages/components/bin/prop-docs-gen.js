import { writeFileSync } from "fs";
import { globSync } from "glob";
import { resolve } from "path";
import { parse } from "react-docgen-typescript";

const fileName = "package.json";
const filenameRegex = new RegExp("/[^/]*$");
const files = globSync("src/**/*.tsx", {
	ignore: ["**/examples/**", "**/index.ts"],
});
const options = {
	propFilter: (prop) => {
		const filterOut =
			prop.parent?.fileName.includes("node_modules") ||
			prop.description.includes("@ignore");
		return !filterOut;
	},
	shouldExtractValuesFromUnion: false,
};

const parser = parse(files, options);

const docs = parser.map(
	({ description, displayName, filePath, props, tags }) => {
		return {
			description,
			displayName,
			filePath,
			props: Object.values(props).map(
				({ defaultValue, description, name, type }) => ({
					defaultValue: defaultValue?.value,
					description,
					name,
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
		const file = JSON.stringify(doc, null, 2);
		writeFileSync(resolve(filePath), file);
	});

generateDocs();
