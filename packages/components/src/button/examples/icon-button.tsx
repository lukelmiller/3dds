import { Button } from "../../";

export const IconButton = () => {
	const onClick = () => {
		console.log("Button Clicked");
	};
	return <Button onClick={onClick}>+</Button>;
};

export default IconButton;
