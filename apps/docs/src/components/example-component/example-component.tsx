import { lazy, ReactNode, Suspense } from "react";
import { useParams } from "react-router-dom";

type PropTypes = {
	children?: ReactNode;
	exampleName?: string;
};

const ExampleComponent = ({
	children,
	exampleName: propsExampleName,
}: PropTypes) => {
	const { component = "", exampleName = propsExampleName || "" } =
		useParams();
	const LazyLoadExample = children
		? undefined
		: lazy(
				() =>
					import(
						`3dds-components/${component}/examples/${exampleName}.js`
					)
		  );
	return (
		<Suspense fallback={<p>Loading Example...</p>}>
			{LazyLoadExample ? <LazyLoadExample /> : children}
		</Suspense>
	);
};

export default ExampleComponent;
