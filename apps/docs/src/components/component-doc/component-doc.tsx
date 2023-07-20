import { FC, Fragment, Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ComponentPackageJson } from "../../types";
const LazyExample = lazy(() => import("../example/example"));
const LazyPropTable = lazy(() => import("../props-table/props-table"));

const defaultComponentPackageJson: ComponentPackageJson = {
	props: [{}],
};
const ComponentDoc = () => {
	/// State:
	const [componentPackageJson, setComponentPackageJson] =
		useState<ComponentPackageJson>(defaultComponentPackageJson);
	const [examples, setExamples] = useState<{ example: FC; name: string }[]>(
		[]
	);
	const { component = "" } = useParams();

	useEffect(() => {
		setExamples([]);
		import(`3dds-components/${component}/examples/index`)
			.then((module) =>
				setExamples(
					Object.keys(module).map((moduleName) => ({
						example: module[moduleName],
						name: moduleName,
					}))
				)
			)
			.catch((error) => setExamples([]));
		import(`3dds-components/${component}/package.json`)
			.then((module) => setComponentPackageJson(module))
			.catch((error) =>
				setComponentPackageJson(defaultComponentPackageJson)
			);
	}, [component]);

	const DefaultExample = examples.find(
		({ name }) => name === "default"
	)?.example;

	return (
		<>
			<h1>{componentPackageJson.displayName}</h1>
			<p>{componentPackageJson.description}</p>
			<a
				href={componentPackageJson.gitLink}
				rel="noreferrer"
				target="_blank"
			>
				Component Source Code
			</a>
			{DefaultExample && <DefaultExample />}
			{examples.map(({ example: Example, name }) =>
				name === "default" ? (
					<Fragment key={`${component}-default-example-${name}`} />
				) : (
					<Suspense
						key={`${component}-example-${name}`}
						fallback={<p>Loading Example...</p>}
					>
						<LazyExample
							exampleName={name}
							key={`${component}-example-${name}`}
						>
							<Example />
						</LazyExample>
					</Suspense>
				)
			)}

			<br />
			<Suspense fallback={"Loading Props..."}>
				<LazyPropTable props={componentPackageJson.props} />
			</Suspense>
			<div style={{ height: "100vh" }} />
		</>
	);
};

export default ComponentDoc;
