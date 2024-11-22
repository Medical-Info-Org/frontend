"use client";

import { cnMerge } from "@/lib/utils/cn";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { InferProps } from "@zayne-labs/toolkit/react";
import { IconBox } from "../common";

function DropdownMenuSubTrigger(
	props: InferProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
) {
	const { className, inset, children, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.SubTrigger
			className={cnMerge(
				`flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none
				focus:bg-shadcn-accent data-[state=open]:bg-shadcn-accent`,
				inset && "pl-8",
				className
			)}
			{...restOfProps}
		>
			{children}
			<IconBox icon="radix-icons:chevron-right" className="ml-auto size-4" />
		</DropdownMenuPrimitive.SubTrigger>
	);
}

function DropdownMenuSubContent(props: InferProps<typeof DropdownMenuPrimitive.SubContent>) {
	const { className, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.SubContent
			className={cnMerge(
				`z-50 min-w-32 overflow-hidden rounded-md border bg-shadcn-popover p-1
				text-shadcn-popover-foreground shadow-lg data-[state=open]:animate-in
				data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
				data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
				data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
				data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
				className
			)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuContent(props: InferProps<typeof DropdownMenuPrimitive.Content>) {
	const { className, sideOffset = 4, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				sideOffset={sideOffset}
				className={cnMerge(
					`z-50 min-w-32 overflow-hidden rounded-md border bg-shadcn-popover p-1
					text-shadcn-popover-foreground shadow-md`,
					`data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
					data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
					data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
					data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
					className
				)}
				{...restOfProps}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

function DropdownMenuItem(
	props: InferProps<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
) {
	const { className, inset, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Item
			className={cnMerge(
				`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm
				outline-none transition-colors focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				inset && "pl-8",
				className
			)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuCheckboxItem(
	props: InferProps<typeof DropdownMenuPrimitive.CheckboxItem> & { withIndicator?: boolean }
) {
	const { className, checked, children, withIndicator = true, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.CheckboxItem
			className={cnMerge(
				`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm
				outline-none transition-colors focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				className
			)}
			checked={checked}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="absolute left-2 flex size-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<IconBox icon="radix-icons:check" className="size-4" />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

function DropdownMenuRadioItem(
	props: InferProps<typeof DropdownMenuPrimitive.RadioItem> & { withIndicator?: boolean }
) {
	const { className, children, withIndicator = true, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.RadioItem
			className={cnMerge(
				`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm
				outline-none transition-colors focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				className
			)}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="absolute left-2 flex size-3.5 items-center justify-center">
					<DropdownMenuPrimitive.ItemIndicator>
						<IconBox icon="radix-icons:dot-filled" className="size-4 fill-current" />
					</DropdownMenuPrimitive.ItemIndicator>
				</span>
			)}

			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

function DropdownMenuLabel(props: InferProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
	const { className, inset, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Label
			className={cnMerge("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuSeparator(props: InferProps<typeof DropdownMenuPrimitive.Separator>) {
	const { className, ...restOfProps } = props;

	return (
		<DropdownMenuPrimitive.Separator
			className={cnMerge("-mx-1 my-1 h-px bg-shadcn-muted", className)}
			{...restOfProps}
		/>
	);
}

function DropdownMenuShortcut({ className, ...restOfProps }: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cnMerge("ml-auto text-xs tracking-widest opacity-60", className)}
			{...restOfProps}
		/>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const { Root, Trigger, Group, Portal, Sub, RadioGroup } = DropdownMenuPrimitive;
export const Content = DropdownMenuContent;
export const Item = DropdownMenuItem;
export const CheckboxItem = DropdownMenuCheckboxItem;
export const RadioItem = DropdownMenuRadioItem;
export const Label = DropdownMenuLabel;
export const Separator = DropdownMenuSeparator;
export const Shortcut = DropdownMenuShortcut;
export const SubTrigger = DropdownMenuSubTrigger;
export const SubContent = DropdownMenuSubContent;
