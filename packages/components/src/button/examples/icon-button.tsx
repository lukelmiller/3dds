import { Button } from "../../";

/**
 * This is a button that has an icon inside.
 */
const IconButton = () => {
	const onClick = () => {
		console.log("Button Clicked");
	};
	return <Button onClick={onClick}>+</Button>;
};

export default IconButton;
