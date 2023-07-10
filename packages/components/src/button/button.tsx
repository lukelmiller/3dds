import {
	ElementType,
	ForwardedRef,
	HTMLAttributes,
	ReactElement,
	forwardRef,
} from "react";

type PropTypes<HTMLElementType = HTMLButtonElement> = {
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
	}: PropTypes<HTMLElementType>,
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
		(props: PropTypes, ref: ForwardedRef<unknown>): ReactElement;
	}
) as <HTMLElementType = HTMLButtonElement>(
	props: PropTypes<HTMLElementType> & {
		ref?: ForwardedRef<HTMLElementType>;
	}
) => ReturnType<typeof Button>;
