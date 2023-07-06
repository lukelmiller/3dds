import libConfig from "3dds-components/package.json";
import { FC, Suspense } from "react";
import "./App.css";

const getExamples = (component: string, examples: string[]) => {
	return examples.map(
		(example) =>
			require(`!!raw-loader!3dds-components/src/${component}/examples/${example}.tsx`).default.toString() +
			"\n\n"
	);
};

const getExampleNames = (components: string[]): string[][] =>
	components.map(
		(component) =>
			require(`3dds-components/dist/${component}/examples/`).default
	);

const lazyLoadExamples = (component: string, examples: string[]): FC[] =>
	examples.map(
		(example) =>
			require(`3dds-components/dist/${component}/examples/${example}.js`)
				.default
	);

function App() {
	const exampleNames = getExampleNames(libConfig.components);
	const exampleCode = getExamples("button", exampleNames[0]);
	const examplesComponents = lazyLoadExamples("button", exampleNames[0]);

	return (
		<>
			<Suspense></Suspense>
			<h1>Hello</h1>
			{examplesComponents.map((Component, index) => (
				<Component key={`${exampleNames[0]}-example-${index}`} />
			))}

			<br />
			<br />

			<pre>{exampleCode}</pre>
		</>
	);
}

export default App;
