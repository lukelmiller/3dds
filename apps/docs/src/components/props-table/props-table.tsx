import { FC } from "react";
import { ComponentPackageJson } from "../../types";

type PropTypes = {
	props: ComponentPackageJson["props"];
};

const PropsTable: FC<PropTypes> = ({ props }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Default Value</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{props.map((prop, index) => (
					<tr key={`props-table-row-${index}-${prop.name}`}>
						<td>{prop.name}</td>
						<td>
							{prop?.required ? "REQUIRED" : prop.defaultValue}
						</td>
						<td>{prop.type}</td>
						<td>{prop.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default PropsTable;
