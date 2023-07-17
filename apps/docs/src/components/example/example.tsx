import { lazy, RefObject, Suspense, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
const LazyExampleCode = lazy(() => import("../example-code/example-code"));
const LazyExampleComponent = lazy(
	() => import("../example-component/example-component")
);

const updatePosition = (
	ref: RefObject<HTMLDivElement>,
	component: string,
	example: string,
	urlRegex: RegExp
) => {
	if (window.scrollY < 5) {
		window.history.replaceState(
			null,
			"",
			window.location.href.replace(urlRegex, `/${component}/`)
		);
		return;
	}
	const offset = (ref?.current?.offsetTop || 0) - window.scrollY;
	if (offset < 5 && offset > 0)
		window.history.replaceState(
			null,
			"",
			window.location.href.replace(urlRegex, `/${component}/${example}/`)
		);
};

type PropTypes = {
	exampleName?: string;
};

const Example = (props: PropTypes) => {
	const exampleRef = useRef<HTMLDivElement>(null);
	const { component = "", exampleName } = useParams();

	/// Derived Data
	const name = props.exampleName || "";

	useEffect(() => {
		if (exampleName === props.exampleName)
			exampleRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		const regex = new RegExp(
			`(/${component}/[^/]*($|/))|(/${component}($|/))`
		);
		window.addEventListener("scroll", () =>
			updatePosition(exampleRef, component, name, regex)
		);
		return () => {
			window.removeEventListener("scroll", () =>
				updatePosition(exampleRef, component, name, regex)
			);
		};
	}, [component, name]);

	return (
		<div ref={exampleRef}>
			<h2>{name}</h2>
			<Suspense fallback={<p>Loading Example Component...</p>}>
				<LazyExampleComponent exampleName={name} />
			</Suspense>
			<Suspense fallback={<p>Loading Code...</p>}>
				<LazyExampleCode exampleName={name} />
			</Suspense>
		</div>
	);
};
export default Example;
