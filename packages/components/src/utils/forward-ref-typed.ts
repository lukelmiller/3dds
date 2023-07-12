import { ForwardedRef, HTMLAttributes, ReactElement, forwardRef } from "react";

export type RefPropTypes<HTMLElementType> = {
	/** This is a useRef */
	ref?: ForwardedRef<HTMLElementType>;
} & HTMLAttributes<HTMLElementType>;

const ForwardedRefTyped = <CustomPropTypes, DefaultHTMLElementType>(
	component: (
		props: CustomPropTypes & RefPropTypes<DefaultHTMLElementType>,
		ref: ForwardedRef<DefaultHTMLElementType>
	) => JSX.Element
) =>
	forwardRef(
		component as {
			(
				props: CustomPropTypes & RefPropTypes<DefaultHTMLElementType>,
				ref: ForwardedRef<DefaultHTMLElementType>
			): ReactElement;
		}
	) as {
		<HTMLElementType = DefaultHTMLElementType>(
			props: CustomPropTypes & RefPropTypes<HTMLElementType>
		): ReactElement;
		defaultProps?: {};
		displayName?: string;
	};

export default ForwardedRefTyped;
