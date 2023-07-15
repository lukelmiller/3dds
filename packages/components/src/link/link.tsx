import "3dds-styles/button/button.css";
import { ElementType, ForwardedRef } from "react";
import ForwardedRefTyped from "../utils/forward-ref-typed";

type LinkPropTypes = {
	/** @ignore */
	className?: string;
	/** Tag of Component */
	tag?: ElementType;
	[remainingProps: string]: unknown;
};

const Link = <HTMLElementType,>(
	{ className, tag: Tag = "a", ...remainingProps }: LinkPropTypes,
	ref: ForwardedRef<HTMLElementType>
) => <Tag className={className} {...remainingProps} ref={ref} />;

/**
 * This is the link description
 * @status In-Development
 */
export default ForwardedRefTyped<LinkPropTypes, HTMLAnchorElement>(Link);

Link.defaultProps = {
	tag: "a",
};

Link.displayName = "Link";
