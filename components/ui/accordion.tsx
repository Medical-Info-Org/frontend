"use client";

import { cnMerge } from "@/lib/utils/cn";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { InferProps } from "@zayne-labs/toolkit/react/utils";
import { isString } from "@zayne-labs/toolkit/type-helpers";
import { IconBox } from "../common/IconBox";

function AccordionItem(props: InferProps<typeof AccordionPrimitive.Item>) {
	const { className, ...restOfProps } = props;

	return <AccordionPrimitive.Item className={className} {...restOfProps} />;
}

function AccordionTrigger(
	props: InferProps<typeof AccordionPrimitive.Trigger> & {
		withDefaultIcon?: boolean | string;
		classNames?: { header?: string; base?: string; icon?: string };
	}
) {
	const { classNames, className, children, withDefaultIcon = true, ...restOfProps } = props;

	return (
		<AccordionPrimitive.Header className={cnMerge("flex", classNames?.header)}>
			<AccordionPrimitive.Trigger
				className={cnMerge(
					`flex flex-1 items-center justify-between py-4 text-[14px] font-medium transition-all
					[&[data-state=open]>svg]:rotate-180`,
					className,
					classNames?.base
				)}
				{...restOfProps}
			>
				{children}

				{withDefaultIcon && (
					<IconBox
						icon={isString(withDefaultIcon) ? withDefaultIcon : "radix-icons:chevron-down"}
						className={cnMerge(
							"size-4 shrink-0 transition-transform duration-200",
							classNames?.icon
						)}
					/>
				)}
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent(props: InferProps<typeof AccordionPrimitive.Content>) {
	const { className, children, ...restOfProps } = props;

	return (
		<AccordionPrimitive.Content
			className={cnMerge(
				`overflow-hidden py-4 text-[14px] data-[state=closed]:animate-accordion-up
				data-[state=open]:animate-accordion-down`,
				className
			)}
			{...restOfProps}
		>
			{children}
		</AccordionPrimitive.Content>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const { Root } = AccordionPrimitive;

export const Item = AccordionItem;

export const Trigger = AccordionTrigger;

export const Content = AccordionContent;
