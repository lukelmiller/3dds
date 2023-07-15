import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";

const Router = createBrowserRouter(
	[
		{
			children: [
				{
					lazy: async () => ({
						Component: (
							await import(
								"../components/component-doc/component-doc"
							)
						).default,
					}),
					path: "/components/:component",
				},
			],
			element: <Layout />,
			path: "/",
		},
		{
			lazy: async () => ({
				Component: (
					await import("../components/component-doc/component-doc")
				).default,
			}),
			path: "/:component",
		},
		{
			lazy: async () => ({
				Component: (
					await import(
						"../components/example-component/example-component"
					)
				).default,
			}),
			path: "/:component/:exampleName",
		},
		{
			lazy: async () => ({
				Component: (
					await import("../components/example-code/example-code")
				).default,
			}),
			path: "/:component/:exampleName/code",
		},
	],
	{ basename: process.env.PUBLIC_URL }
);

const Routes = () => (
	<RouterProvider
		fallbackElement={<h1>Loading Props Table...</h1>}
		router={Router}
	/>
);

export default Routes;
