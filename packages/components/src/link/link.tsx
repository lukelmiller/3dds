import "3dds-styles/button/button.css";
import { ForwardedRef, ReactElement, cloneElement } from "react";
import ForwardedRefTyped, { RefPropTypes } from "../utils/forward-ref-typed";

type LinkPropTypes = {
	/** @ignore */
	className?: string;
	/** Tag of Component */
	element?: ReactElement;
	[remainingProps: string]: unknown;
};

const Link = <HTMLElementType,>(
	{ className, element = <a />, ...remainingProps }: LinkPropTypes,
	ref: ForwardedRef<HTMLElementType>
) =>
	cloneElement<LinkPropTypes & RefPropTypes<HTMLElementType>>(element, {
		className,
		ref,
		...remainingProps,
	});

/**
 * This is the link description
 * @status In-Development
 */
export default ForwardedRefTyped<LinkPropTypes, HTMLAnchorElement>(Link);

Link.defaultProps = {
	element: <a />,
};

Link.displayName = "Link";
