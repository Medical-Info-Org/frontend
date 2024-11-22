"use client";

import type { Prettify } from "@zayne-labs/toolkit/type-helpers";
import { type VariantProps, tv } from "tailwind-variants";
import { IconBox } from "../common/IconBox";
import { Slot } from "../common/Slot";

// prettier-ignore
export type ButtonProps = Prettify<{
	isLoading?: boolean;
	asChild?: boolean;
	unstyled?: boolean;
} & VariantProps<typeof buttonVariants> & React.ComponentPropsWithRef<"button">>;

const buttonVariants = tv(
	{
		base: "flex items-center justify-center rounded-[8px]",

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
				true: "",
			},

			disabled: {
				true: "cursor-not-allowed",
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
				withInteractions: true,
				className: "hover:bg-medinfo-primary-darker active:bg-medinfo-primary-lighter",
			},
			{
				theme: "secondary",
				withInteractions: true,
				className: `hover:border-medinfo-primary-darker active:border-medinfo-primary-lighter
				active:text-medinfo-primary-lighter`,
			},
			{
				size: "icon",
				withInteractions: true,
				className: "hover:rounded-full",
			},
			{
				disabled: true,
				isLoading: false,
				className: "border-2 border-medinfo-dark-4 bg-medinfo-disabled text-medinfo-dark-4",
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
		asChild,
		isLoading = false,
		children,
		unstyled,
		withInteractions = true,
		className,
		type = "button",
		theme,
		size,
		disabled,
		...extraButtonProps
	} = props;

	const Component = asChild ? Slot : "button";

	const BTN_CLASSES = !unstyled
		? buttonVariants({ theme, size, className, disabled, withInteractions, isLoading })
		: className;

	return (
		<Component type={type} className={BTN_CLASSES} disabled={Boolean(disabled)} {...extraButtonProps}>
			{!isLoading ? (
				children
			) : (
				<div className="flex items-center gap-4">
					{children}
					<IconBox icon="svg-spinners:ring-resize" className="animate-spin [animation-duration:1s]" />
				</div>
			)}
		</Component>
	);
}

export default Button;
