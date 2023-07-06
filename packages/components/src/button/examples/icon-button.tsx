import { Button } from "../../";

/**
 * @description This is a button that has only text inside.
 */
const IconButton = () => {
	const onClick = () => {
		console.log("Button Clicked");
	};
	return <Button onClick={onClick}>+</Button>;
};

export default IconButton;
