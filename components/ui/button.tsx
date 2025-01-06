"use client";

import type { Prettify } from "@zayne-labs/toolkit/type-helpers";
import { Slot, Slottable } from "@zayne-labs/ui-react/slot";
import { type VariantProps, tv } from "tailwind-variants";
import { WhiteSpinnerIcon } from "../icons";

// prettier-ignore
export type ButtonProps = Prettify<{
	isLoading?: boolean;
	asChild?: boolean;
	unstyled?: boolean;
} & VariantProps<typeof buttonVariants> & React.ComponentPropsWithRef<"button">>;

const buttonVariants = tv(
	{
		base: "grid items-center justify-center rounded-[8px]",

		variants: {
			theme: {
				primary: "bg-medinfo-primary-main text-white",

				"primary-inverted": "bg-white text-medinfo-primary-main",

				secondary: "border-2 border-medinfo-primary-main bg-transparent text-medinfo-primary-main",

				"secondary-inverted": "border-2 border-white bg-transparent text-white",
			},

			size: {
				icon: "size-12 md:size-16",

				medium: `h-[48px] w-fit min-w-[105px] px-6 text-base md:h-[64px] md:min-w-[135px]
				md:text-[20px] md:font-medium`,

				large: "h-[48px] w-full text-base",
			},

			isLoading: {
				true: "grid",
			},

			disabled: {
				true: "cursor-not-allowed",
			},

			isDisabled: {
				true: `cursor-not-allowed border-2 border-medinfo-dark-4 bg-medinfo-disabled-fill
				text-medinfo-dark-4`,
			},

			withInteractions: {
				true: "[transition:border-radius_250ms_ease] hover:shadow-[0_4px_4px_0_hsl(0,0%,0%,0.12)]",
			},
		},

		compoundVariants: [
			{
				size: "medium",
				withInteractions: true,
				className: "hover:rounded-[16px]",
			},
			{
				theme: "primary",
				isDisabled: false,
				withInteractions: true,
				className: "hover:bg-medinfo-primary-darker active:bg-medinfo-primary-lighter",
			},
			{
				theme: "secondary",
				isDisabled: false,
				withInteractions: true,
				className: `hover:border-medinfo-primary-darker active:border-medinfo-primary-lighter
				active:text-medinfo-primary-lighter`,
			},
			{
				size: "icon",
				withInteractions: true,
				className: "hover:rounded-full hover:shadow-none",
			},
			{
				isDisabled: true,
				isLoading: false,
				className: "border-2 border-medinfo-dark-4 bg-medinfo-disabled-fill text-medinfo-dark-4",
			},
		],

		defaultVariants: {
			theme: "primary",
			size: "medium",
		},
	},
	{
		responsiveVariants: ["md", "lg"],
	}
);

function Button(props: ButtonProps) {
	const {
		disabled,
		asChild,
		isLoading = false,
		isDisabled = disabled,
		children,
		unstyled,
		withInteractions = true,
		className,
		type = "button",
		theme,
		size,
		...extraButtonProps
	} = props;

	const Component = asChild ? Slot : "button";

	const BTN_CLASSES = !unstyled
		? buttonVariants({
				className,
				disabled,
				isDisabled,
				isLoading,
				size,
				theme,
				withInteractions,
			})
		: className;

	const childrenWithIcon = (
		<>
			<span className="flex justify-center [grid-area:1/1]">
				<WhiteSpinnerIcon />
			</span>
			<Slottable>
				<div className="invisible [grid-area:1/1]">{children}</div>
			</Slottable>
		</>
	);

	return (
		<Component type={type} className={BTN_CLASSES} disabled={disabled} {...extraButtonProps}>
			{isLoading ? childrenWithIcon : children}
		</Component>
	);
}

export { Button };
