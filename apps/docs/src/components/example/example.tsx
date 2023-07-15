import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
const LazyExampleCode = lazy(() => import("../example-code/example-code"));
const LazyExampleComponent = lazy(
	() => import("../example-component/example-component")
);

type PropTypes = {
	exampleName?: string;
};

const Example = (props: PropTypes) => {
	const { exampleName = props.exampleName || "" } = useParams();
	return (
		<>
			<h2>{exampleName}</h2>
			<Suspense fallback={<p>Loading Example Component...</p>}>
				<LazyExampleComponent exampleName={exampleName} />
			</Suspense>
			<Suspense fallback={<p>Loading Code...</p>}>
				<LazyExampleCode exampleName={exampleName} />
			</Suspense>
		</>
	);
};

export default Example;
