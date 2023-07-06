import { ElementType, ForwardedRef, HTMLAttributes, forwardRef } from "react";

type PropTypes<HTMLElementType> = {
	/** @ignore */
	className?: string;
	/** Optional Tag of Component */
	tag?: ElementType;
	/** @ignore */
	[remainingProps: string]: unknown;
} & HTMLAttributes<HTMLElementType>;

const ButtonInner = <HTMLElementType,>(
	{
		className,
		tag: Tag = "button",
		...remainingProps
	}: PropTypes<HTMLElementType>,
	ref: ForwardedRef<HTMLElementType>
) => <Tag className={className} ref={ref} {...remainingProps} />;

export default forwardRef(ButtonInner) as <T = HTMLButtonElement>(
	props: PropTypes<T> & {
		ref?: ForwardedRef<T>;
	}
) => ReturnType<typeof ButtonInner>;
