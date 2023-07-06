import { Button } from "../../";

/**
 * This is a button that has only text inside.
 */
const TextButton = () => {
	const onClick = () => {
		console.log("Button Clicked");
	};
	return <Button onClick={onClick}>Text</Button>;
};

export default TextButton;
