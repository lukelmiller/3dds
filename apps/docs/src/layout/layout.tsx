import libConfig from "3dds-components/package.json";
import { NavLink, Outlet } from "react-router-dom";
import Styles from "./layout.module.css";

const ComponentNames = libConfig.components;

const Layout = () => {
	return (
		<div className={Styles.layout}>
			<div className={Styles.sideNav}>
				{ComponentNames.map((componentName) => (
					<NavLink
						className={({ isActive }) =>
							isActive ? Styles.navLinkActive : Styles.navLink
						}
						key={`side-nav-link-${componentName}`}
						to={`/components/${componentName}`}
					>
						{componentName}
					</NavLink>
				))}
			</div>
			<main className={Styles.content}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
