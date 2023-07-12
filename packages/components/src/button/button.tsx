import {
	ElementType,
	ForwardedRef,
	HTMLAttributes,
	ReactElement,
	forwardRef,
} from "react";

type ButtonPropTypes<HTMLElementType = HTMLButtonElement> = {
	/** @ignore */
	className?: string;
	/** This is a useRef */
	ref?: ForwardedRef<HTMLElementType>;
	/** Optional Tag of Component */
	tag?: ElementType;
	[remainingProps: string]: unknown;
} & HTMLAttributes<HTMLElementType>;

const Button = <HTMLElementType,>(
	{
		className,
		tag: Tag = "button",
		...remainingProps
	}: ButtonPropTypes<HTMLElementType>,
	ref: ForwardedRef<HTMLElementType>
) => <Tag className={className} {...remainingProps} ref={ref} />;

Button.defaultProps = {
	tag: "button",
};

Button.displayName = "Button";

/**
 * This is the button description
 * @status Development
 */
export default forwardRef(
	Button as {
		(props: ButtonPropTypes, ref: ForwardedRef<unknown>): ReactElement;
	}
) as <HTMLElementType = HTMLButtonElement>(
	props: ButtonPropTypes<HTMLElementType> & {
		ref?: ForwardedRef<HTMLElementType>;
	}
) => ReturnType<typeof Button>;
