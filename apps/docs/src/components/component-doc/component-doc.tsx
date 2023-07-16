import { Suspense, lazy, useEffect, useState } from "react";
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
	const [exampleNames, setExampleNames] = useState<string[]>([]);
	const { component = "" } = useParams();

	useEffect(() => {
		setExampleNames([]);
		import(`3dds-components/${component}/examples/index`)
			.then((module) => setExampleNames(module.default))
			.catch((error) => setExampleNames([]));
		import(`3dds-components/${component}/package.json`)
			.then((module) => setComponentPackageJson(module))
			.catch((error) =>
				setComponentPackageJson(defaultComponentPackageJson)
			);
	}, [component]);

	return (
		<>
			<h1>{componentPackageJson.displayName}</h1>
			<p>{componentPackageJson.description}</p>
			{exampleNames.map((exampleName) => {
				return (
					<Suspense
						key={`${component}-example-${exampleName}`}
						fallback={<p>Loading Example...</p>}
					>
						<LazyExample
							exampleName={exampleName}
							key={`${component}-example-${exampleName}`}
						/>
					</Suspense>
				);
			})}

			<br />
			<Suspense fallback={"Loading Props..."}>
				<LazyPropTable props={componentPackageJson.props} />
			</Suspense>
		</>
	);
};

export default ComponentDoc;
