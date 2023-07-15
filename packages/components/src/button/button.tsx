import { ElementType, ForwardedRef } from "react";
import ForwardedRefTyped from "../utils/forward-ref-typed";
import "3dds-styles/button/button.css";

type ButtonPropTypes = {
	/** @ignore */
	className?: string;
	/** Tag of Component */
	tag?: ElementType;
	[remainingProps: string]: unknown;
};

const Button = <HTMLElementType,>(
	{ className, tag: Tag = "button", ...remainingProps }: ButtonPropTypes,
	ref: ForwardedRef<HTMLElementType>
) => <Tag className={className} {...remainingProps} ref={ref} />;

/**
 * This is the button description
 * @status In-Development
 */
export default ForwardedRefTyped<ButtonPropTypes, HTMLButtonElement>(Button);

Button.defaultProps = {
	tag: "button",
};

Button.displayName = "Button";
