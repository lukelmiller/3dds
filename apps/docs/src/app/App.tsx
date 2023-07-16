import { Suspense, lazy } from "react";

const LazyRouting = lazy(() => import("../routes/routes"));

const App = () => {
	return (
		<Suspense fallback={<>Loading...</>}>
			<LazyRouting />
		</Suspense>
	);
};

export default App;
