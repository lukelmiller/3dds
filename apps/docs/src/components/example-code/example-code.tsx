import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Styles from "./example-code.module.css";

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
		)
			.then((module) => setCode(module.default.toString()))
			.catch((error) => setCode("Example Couldn't Be Found"));
	}, [component, exampleName]);

	/// Derived State:
	const codeFormatted = code.replace("../../", "3dds-components");

	return props.exampleName ? (
		<details>
			<summary>Example Code</summary>
			<pre className={Styles.codeExample}>{codeFormatted}</pre>
		</details>
	) : (
		<pre>{codeFormatted}</pre>
	);
};

export default ExampleCode;
