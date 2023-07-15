import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type PropTypes = {
	exampleName?: string;
};

const ExampleCode = (props: PropTypes) => {
	const [code, setCode] = useState<string>("");
	const { component = "", exampleName = props.exampleName || "" } =
		useParams();

	useEffect(() => {
		import(
			`!!raw-loader!3dds-components/${component}/examples/${exampleName}.tsx`
		).then((module) => setCode(module.default.toString()));
	}, [component, exampleName]);

	/// Derived State:
	const codeFormatted = code.replace("../../", "3dds-components");
	return props.exampleName ? (
		<details>
			<summary>Example Code</summary>
			<pre>{codeFormatted}</pre>
		</details>
	) : (
		<pre>{codeFormatted}</pre>
	);
};

export default ExampleCode;
