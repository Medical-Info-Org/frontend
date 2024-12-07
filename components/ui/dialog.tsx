import { cnMerge } from "@/lib/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { InferProps } from "@zayne-labs/toolkit/react";
import { IconBox } from "../common";

function DialogOverlay(props: InferProps<typeof DialogPrimitive.Overlay>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Overlay
			className={cnMerge(
				`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out
				data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
				className
			)}
			{...restOfProps}
		/>
	);
}

function DialogContent(props: InferProps<typeof DialogPrimitive.Content>) {
	const { className, children, ...restOfProps } = props;

	return (
		<DialogPrimitive.Portal>
			<DialogOverlay />

			<DialogPrimitive.Content
				className={cnMerge(
					`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4
					border bg-shadcn-background p-6 shadow-lg duration-200 data-[state=open]:animate-in
					data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
					data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
					data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
					data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
					sm:rounded-lg`,
					className
				)}
				{...restOfProps}
			>
				{children}

				<DialogPrimitive.Close
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-shadcn-background
						transition-opacity hover:opacity-100 focus:outline-none focus:ring-2
						focus:ring-shadcn-ring focus:ring-offset-2 disabled:pointer-events-none
						data-[state=open]:bg-shadcn-accent data-[state=open]:text-shadcn-muted-foreground"
				>
					<IconBox icon="lucide:x" className="size-4" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

function DialogHeader(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return (
		<div
			className={cnMerge("flex flex-col space-y-1.5 text-center sm:text-left", className)}
			{...restOfProps}
		/>
	);
}

function DialogFooter(props: InferProps<"div">) {
	const { className, ...restOfProps } = props;

	return (
		<div
			className={cnMerge("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
			{...restOfProps}
		/>
	);
}

function DialogTitle(props: InferProps<typeof DialogPrimitive.Title>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Title
			className={cnMerge("text-lg font-semibold leading-none tracking-tight", className)}
			{...restOfProps}
		/>
	);
}

function DialogDescription(props: InferProps<typeof DialogPrimitive.Description>) {
	const { className, ...restOfProps } = props;

	return (
		<DialogPrimitive.Description
			className={cnMerge("text-sm text-shadcn-muted-foreground", className)}
			{...restOfProps}
		/>
	);
}

export const Root = DialogPrimitive.Root;

export const Close = DialogPrimitive.Close;

export const Content = DialogContent;

export const Description = DialogDescription;

export const Footer = DialogFooter;

export const Header = DialogHeader;

export const Overlay = DialogOverlay;

export const Portal = DialogPrimitive.Portal;

export const Title = DialogTitle;

export const Trigger = DialogPrimitive.Trigger;
