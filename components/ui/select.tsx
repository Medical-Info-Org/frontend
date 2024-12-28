import { cnMerge } from "@/lib/utils/cn";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { InferProps } from "@zayne-labs/toolkit/react/utils";
import { IconBox } from "../common";

function SelectTrigger(
	props: InferProps<typeof SelectPrimitive.Trigger> & {
		icon?: string;
		classNames?: { icon?: string; base?: string };
	}
) {
	const { children, icon, classNames, className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Trigger
			className={cnMerge(
				`flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border
				border-shadcn-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-shadcn-background
				placeholder:text-medinfo-dark-4 focus:outline-none focus:ring-1 focus:ring-shadcn-ring
				disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
				[classNames?.base, className]
			)}
			{...restOfProps}
		>
			{children}

			<SelectPrimitive.Icon asChild={true}>
				<IconBox
					icon={icon ?? "lucide:chevron-down"}
					className={cnMerge("size-5", classNames?.icon)}
				/>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectScrollUpButton(props: InferProps<typeof SelectPrimitive.ScrollUpButton>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollUpButton
			className={cnMerge("flex cursor-default items-center justify-center py-1", className)}
			{...restOfProps}
		>
			<IconBox icon="lucide:chevron-up" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton(props: InferProps<typeof SelectPrimitive.ScrollDownButton>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.ScrollDownButton
			className={cnMerge("flex cursor-default items-center justify-center py-1", className)}
			{...restOfProps}
		>
			<IconBox icon="lucide:chevron-down" />
		</SelectPrimitive.ScrollDownButton>
	);
}

function SelectContent(
	props: InferProps<typeof SelectPrimitive.Content> & {
		classNames?: { base?: string; viewport?: string };
	}
) {
	const { classNames, className, children, position = "popper", ...restOfProps } = props;

	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				className={cnMerge(
					`relative z-50 flex max-h-96 min-w-[128px] flex-col overflow-hidden rounded-md border
					bg-shadcn-popover text-shadcn-popover-foreground shadow-md data-[state=open]:animate-in
					data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
					data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
					data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
					data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`,
					position === "popper" &&
						`data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1
						data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1`,
					[className, classNames?.base]
				)}
				position={position}
				{...restOfProps}
			>
				<ScrollDownButton />

				<SelectPrimitive.Viewport
					className={cnMerge(
						"flex flex-col p-1",
						position === "popper" &&
							"h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]",
						classNames?.viewport
					)}
				>
					{children}
				</SelectPrimitive.Viewport>

				<ScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel(props: InferProps<typeof SelectPrimitive.Label>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Label
			className={cnMerge("px-2 py-2.5 text-sm font-semibold", className)}
			{...restOfProps}
		/>
	);
}

function SelectItem(props: InferProps<typeof SelectPrimitive.Item> & { withIndicator?: boolean }) {
	const { className, children, withIndicator = true, ...restOfProps } = props;

	return (
		<SelectPrimitive.Item
			className={cnMerge(
				`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-[25px] pr-2
				text-[13px] outline-none focus:bg-shadcn-accent focus:text-shadcn-accent-foreground
				data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
				className
			)}
			{...restOfProps}
		>
			{withIndicator && (
				<span className="absolute left-2 flex size-3.5 items-center justify-center">
					<SelectPrimitive.ItemIndicator>
						<IconBox icon="lucide:check" className="size-[14px]" />
					</SelectPrimitive.ItemIndicator>
				</span>
			)}

			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator(props: InferProps<typeof SelectPrimitive.Separator>) {
	const { className, ...restOfProps } = props;

	return (
		<SelectPrimitive.Separator
			className={cnMerge("-mx-1 my-1 h-px bg-shadcn-muted", className)}
			{...restOfProps}
		/>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const { Root, Group, Value } = SelectPrimitive;
export const Content = SelectContent;
export const Item = SelectItem;
export const Label = SelectLabel;
export const ScrollDownButton = SelectScrollDownButton;
export const ScrollUpButton = SelectScrollUpButton;
export const Separator = SelectSeparator;
export const Trigger = SelectTrigger;
