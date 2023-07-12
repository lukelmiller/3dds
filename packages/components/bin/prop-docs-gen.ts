import { parse, PropItem, ComponentDoc } from "react-docgen-typescript";
import { globSync } from "glob";

const options = {
	propFilter: (prop: PropItem, component: { name: string }) => {
		const filterOut =
			prop.parent?.fileName.includes("node_modules") ||
			prop.description.includes("@ignore");
		return !filterOut;
	},
	shouldExtractValuesFromUnion: false,
};
const files = globSync("../src/**/*.tsx", {
	ignore: ["../**/examples/**", "**/index.ts"],
});

const parser = parse(files, options);

const docs = parser.map(
	({ description, displayName, filePath, props, tags, ...componentDoc }) => {
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

parser.map((doc) => console.log(doc));

// console.log(docs);
