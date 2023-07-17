import { lazy, RefObject, Suspense, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
const LazyExampleCode = lazy(() => import("../example-code/example-code"));
const LazyExampleComponent = lazy(
	() => import("../example-component/example-component")
);

const getExampleUrl = (component: string) => {
	const prefixRegex = RegExp(`.*/${component}(/|$)`);
	const suffixRegex = RegExp("/.*");
	return window.location.href
		.replace(prefixRegex, "")
		.replace(suffixRegex, "");
};

const updatePosition = (
	ref: RefObject<HTMLDivElement>,
	component: string,
	example: string,
	urlRegex: RegExp
) => {
	const exampleFromUrl = getExampleUrl(component);
	if (window.scrollY < 5 && exampleFromUrl !== "") {
		window.history.replaceState(
			null,
			"",
			window.location.href.replace(urlRegex, `/${component}/`)
		);
		return;
	}
	if (example !== exampleFromUrl) {
		const offset = (ref?.current?.offsetTop || 0) - window.scrollY;
		if (offset < 5 && offset > 0) {
			window.history.replaceState(
				null,
				"",
				window.location.href.replace(
					urlRegex,
					`/${component}/${example}/`
				)
			);
		}
	}
};

type PropTypes = {
	exampleName?: string;
};

const Example = ({ exampleName = "" }: PropTypes) => {
	const exampleRef = useRef<HTMLDivElement>(null);
	const { component = "", exampleName: urlExampleName = "" } = useParams();

	useEffect(() => {
		if (exampleName === urlExampleName)
			exampleRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		const regex = new RegExp(
			`(/${component}/[^/]*($|/))|(/${component}($|/))`
		);
		window.addEventListener("scroll", () =>
			updatePosition(exampleRef, component, exampleName, regex)
		);
		return () => {
			window.removeEventListener("scroll", () =>
				updatePosition(exampleRef, component, exampleName, regex)
			);
		};
	}, [component, exampleName, urlExampleName]);

	return (
		<div ref={exampleRef}>
			<h2>{exampleName}</h2>
			<Suspense fallback={<p>Loading Example Component...</p>}>
				<LazyExampleComponent exampleName={exampleName} />
			</Suspense>
			<Suspense fallback={<p>Loading Code...</p>}>
				<LazyExampleCode exampleName={exampleName} />
			</Suspense>
		</div>
	);
};
export default Example;
