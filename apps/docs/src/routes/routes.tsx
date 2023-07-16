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
			path: "/components",
		},
		{
			lazy: async () => ({
				Component: (await import("../components/example/example"))
					.default,
			}),
			path: "/components/:component/:exampleName",
		},
		{
			lazy: async () => ({
				Component: (
					await import(
						"../components/example-component/example-component"
					)
				).default,
			}),
			path: "/components/:component/:exampleName/example",
		},
		{
			lazy: async () => ({
				Component: (
					await import("../components/example-code/example-code")
				).default,
			}),
			path: "/components/:component/:exampleName/code",
		},
	],
	{ basename: process.env.PUBLIC_URL }
);

const Routes = () => (
	<RouterProvider fallbackElement={<h1>Loading...</h1>} router={Router} />
);

export default Routes;
