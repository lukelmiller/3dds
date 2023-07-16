import { useRef } from "react";
import { Link } from "../../";

/**
 * This is a plain link
 */
const LinkExample = () => {
	const ref = useRef<HTMLAnchorElement>(null);
	return (
		<Link
			element={<button />}
			ref={ref}
			href="https://google.com"
			target="_blank_"
		>
			Link
		</Link>
	);
};

export default LinkExample;
