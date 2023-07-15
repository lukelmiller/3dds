import { FC } from "react";
import { ComponentPackageJson } from "../../types";

type PropTypes = {
	props: ComponentPackageJson["props"];
};

const PropsTable: FC<PropTypes> = ({ props }) => {
	return (
		<table>
			<tr>
				<th>Name</th>
				<th>Default Value</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
			{props.map((prop) => (
				<tr>
					<td>{prop.name}</td>
					<td>{prop?.required ? "REQUIRED" : prop.defaultValue}</td>
					<td>{prop.type}</td>
					<td>{prop.description}</td>
				</tr>
			))}
		</table>
	);
};

export default PropsTable;
