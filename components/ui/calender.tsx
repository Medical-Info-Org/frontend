"use client";

import { cnMerge } from "@/lib/utils/cn";
import type { InferProps } from "@zayne-labs/toolkit/react";
import { DayPicker } from "react-day-picker";
import { IconBox } from "../common";
import { shadcnButtonVariants } from "./constants";

export type CalendarProps = InferProps<typeof DayPicker>;

const IconLeft = () => <IconBox icon="lucide:chevron-left" className="size-4" />;
const IconRight = () => <IconBox icon="lucide:chevron-right" className="size-4" />;

function Calendar(props: CalendarProps) {
	const { className, classNames, showOutsideDays = true, ...restOfProps } = props;

	return (
		<DayPicker
			components={{ IconLeft, IconRight }}
			showOutsideDays={showOutsideDays}
			className={cnMerge("p-[1.2rem]", className)}
			classNames={{
				months: "flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "relative flex items-center justify-center pt-1",
				caption_label: "text-xs font-medium",
				nav: "flex items-center space-x-1",
				nav_button: cnMerge(
					shadcnButtonVariants({
						variant: "outline",
						className: `border-[1.4px] border-medinfo-primary-main hover:bg-medinfo-primary-lighter
						hover:text-shadcn-primary-foreground`,
					}),
					"size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "w-9 rounded-md text-sm font-normal text-shadcn-muted-foreground",
				row: "mt-2 flex w-full",
				cell: `relative size-8 p-0 text-center text-xs focus-within:relative focus-within:z-20
				has-[[aria-selected].day-range-end]:rounded-r-md
				has-[[aria-selected].day-outside]:bg-shadcn-accent/50 has-[[aria-selected]]:bg-shadcn-accent
				first:has-[[aria-selected]]:rounded-l-md last:has-[[aria-selected]]:rounded-r-md`,
				day: cnMerge(
					shadcnButtonVariants({
						variant: "ghost",
						className: "hover:bg-medinfo-primary-subtle hover:text-medinfo-body-color",
					}),
					"size-8 p-0 font-normal aria-selected:opacity-100"
				),
				day_range_end: "day-range-end",
				day_selected: `bg-shadcn-primary text-shadcn-primary-foreground hover:bg-shadcn-primary
				hover:text-shadcn-primary-foreground focus:bg-shadcn-primary
				focus:text-shadcn-primary-foreground`,
				day_today: "bg-shadcn-primary/15 text-shadcn-muted-foreground",
				day_outside: `day-outside text-shadcn-muted-foreground aria-selected:bg-shadcn-accent/50
				aria-selected:text-shadcn-muted-foreground`,
				day_disabled: "text-shadcn-muted-foreground opacity-50",
				day_range_middle: "aria-selected:bg-shadcn-accent aria-selected:text-shadcn-accent-foreground",
				day_hidden: "invisible",
				...classNames,
			}}
			{...restOfProps}
		/>
	);
}

export default Calendar;
