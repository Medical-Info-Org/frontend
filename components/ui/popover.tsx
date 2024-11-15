"use client";

import { cnMerge } from "@/lib/utils/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { InferProps } from "@zayne-labs/toolkit/react";

function PopoverContent(props: InferProps<typeof PopoverPrimitive.Content>) {
	const { className, align = "center", sideOffset = 4, ...restOfProps } = props;

	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				align={align}
				sideOffset={sideOffset}
				className={cnMerge(
					`z-50 w-72 rounded-md border bg-shadcn-popover p-4 text-shadcn-popover-foreground shadow-md
					outline-none data-[state=open]:animate-in data-[state=closed]:animate-out
					data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95
					data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2
					data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2
					data-[side=top]:slide-in-from-bottom-2`,
					className
				)}
				{...restOfProps}
			/>
		</PopoverPrimitive.Portal>
	);
}

export const Root = PopoverPrimitive.Root;

export const Content = PopoverContent;

export const Trigger = PopoverPrimitive.Trigger;
