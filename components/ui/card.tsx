import type { PolymorphicProps } from "@zayne-labs/toolkit/react";
import { Slot } from "../common/Slot";

type CardProps = {
	className?: string;
	children?: React.ReactNode;
};

function Card<TElement extends React.ElementType = "article">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "article", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

function CardHeader<TElement extends React.ElementType = "header">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "header", children, className } = props;

	return <Element className={className}>{children}</Element>;
}

function CardContent<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, CardProps>
) {
	const { as: Element = "div", children, className = "" } = props;

	return <Element className={className}>{children}</Element>;
}

function CardFooter(props: CardProps & { asChild?: boolean }) {
	const { asChild, children, className = "" } = props;

	const Element = asChild ? Slot : "footer";

	return <Element className={className}>{children}</Element>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export { Card };
