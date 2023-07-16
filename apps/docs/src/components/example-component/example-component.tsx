import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";

type PropTypes = {
	exampleName?: string;
};

const ExampleComponent = (props: PropTypes) => {
	const { component = "", exampleName = props.exampleName || "" } =
		useParams();
	const LazyLoadExample = lazy(
		() => import(`3dds-components/${component}/examples/${exampleName}.js`)
	);
	return (
		<Suspense fallback={<p>Loading Example...</p>}>
			<LazyLoadExample />
		</Suspense>
	);
};

export default ExampleComponent;
