import { Link, Outlet } from "react-router-dom";
import libConfig from "3dds-components/package.json";

const ComponentNames = libConfig.components;

const Layout = () => {
	return (
		<main>
			<div className="side-nav">
				{ComponentNames.map((componentName) => (
					<>
						<Link
							key={`side-nav-link-${componentName}`}
							to={`/components/${componentName}`}
						>
							{componentName}
						</Link>
						<br />
					</>
				))}
			</div>
			<Outlet />
		</main>
	);
};

export default Layout;
