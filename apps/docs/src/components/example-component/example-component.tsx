import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

const lazyLoadExample = (component: string, example: string) =>
	lazy(() => import(`3dds-components/${component}/examples/${example}.js`));

type PropTypes = {
	exampleName?: string;
};

const ExampleComponent = (props: PropTypes) => {
	const { component = "", exampleName = props.exampleName || "" } =
		useParams();
	const LazyLoadExample = lazyLoadExample(component, exampleName);
	return (
		<Suspense fallback={<p>Loading Example...</p>}>
			<LazyLoadExample />
		</Suspense>
	);
};

export default ExampleComponent;
