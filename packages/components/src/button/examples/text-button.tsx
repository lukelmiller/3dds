import { Button } from "../../";

export const TextButton = () => {
	const onClick = () => {
		console.log("Button Clicked");
	};
	return <Button onClick={onClick}>Text</Button>;
};

export default TextButton;
