"use client";

import { IconBox } from "@/components/common";
import { cnMerge } from "@/lib/utils/cn";
import { format } from "date-fns";
import Button from "../button";
import Calendar from "../calender";
import * as Popover from "../popover";
import { getDateFromString } from "./getDateFromString";

type DatePickerProps = {
	className?: string;
	placeholder?: string;
	formats?: {
		visibleDate?: string;
		onChange?: string;
	};
	dateValueString: string;
	onChange: (dateValueString?: string) => void;
};

function DatePicker(props: DatePickerProps) {
	const { placeholder, dateValueString = "", formats, className, onChange } = props;

	const dateValue = getDateFromString(dateValueString);

	const isDateSelected = dateValueString !== "";

	return (
		<Popover.Root>
			<Popover.Trigger asChild={true}>
				<Button
					theme="secondary"
					withInteractions={false}
					className={cnMerge(
						"w-full justify-between text-[14px] text-medinfo-body-color md:w-full",
						className
					)}
				>
					<span className={cnMerge(!isDateSelected && "text-medinfo-dark-4")}>
						{isDateSelected ? format(dateValue, formats?.visibleDate ?? "PPP") : placeholder}
					</span>

					<IconBox icon="solar:calendar-outline" className="size-5" />
				</Button>
			</Popover.Trigger>
			<Popover.Content className="w-auto p-0">
				<Calendar
					className="rounded-[10px] border-[1.4px] border-medinfo-primary-main p-3"
					classNames={{
						cell: "hover:scale-[1.03]",
						button: "text-xs font-medium",
						day_selected: `bg-medinfo-primary-main text-shadcn-primary-foreground
						hover:bg-medinfo-primary-darker hover:text-shadcn-primary-foreground
						focus:bg-medinfo-primary-main focus:text-shadcn-primary-foreground`,
					}}
					mode="single"
					selected={dateValue}
					onSelect={(date) => {
						if (!date) return;

						onChange(format(date, formats?.onChange ?? "MM-dd-yyyy"));
					}}
				/>
			</Popover.Content>
		</Popover.Root>
	);
}

export default DatePicker;
