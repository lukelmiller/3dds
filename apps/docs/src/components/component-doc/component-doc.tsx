import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ComponentPackageJson } from "../../types";

const LazyExample = lazy(() => import("../example/example"));
const LazyPropTable = lazy(() => import("../props-table/props-table"));

const ComponentDoc = () => {
	/// State:
	const [componentPackageJson, setComponentPackageJson] =
		useState<ComponentPackageJson>({
			props: [{}],
		} as ComponentPackageJson);
	const [exampleNames, setExampleNames] = useState<string[]>([]);
	const { component = "" } = useParams();

	useEffect(() => {
		import(`3dds-components/${component}/examples/index`).then((module) =>
			setExampleNames(module.default)
		);
		import(`3dds-components/${component}/package.json`).then((module) =>
			setComponentPackageJson(module)
		);
	}, [component]);

	return (
		<>
			<h1>{componentPackageJson.displayName}</h1>
			<p>{componentPackageJson.description}</p>
			{exampleNames.map((exampleName, index) => {
				return (
					<Suspense
						key={`${component}-example-${exampleName}`}
						fallback={<p>Loading Example...</p>}
					>
						<LazyExample exampleName={exampleName} />
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
