import { cnMerge } from "@/lib/utils/cn";

export type StepIndicatorProps = {
	step: number;
	disabled?: boolean;
	isCompleted?: boolean;
};

export type StepInfoProps = Pick<StepIndicatorProps, "disabled"> & {
	title: string;
	description: string;
};

function StepIndicator(props: StepIndicatorProps) {
	const { step, isCompleted = false, disabled = false } = props;

	const Separator = (
		<hr
			className={cnMerge(
				"border-abeg-primary my-1 basis-full border border-dashed",
				disabled && "border-unfocused"
			)}
		/>
	);

	return (
		<div className={cnMerge(step > 1 && "flex basis-full flex-col items-center")}>
			{step > 1 && Separator}

			<span
				className={cnMerge(
					`bg-abeg-primary grid aspect-square w-5 shrink-0 place-content-center rounded-full font-bold
					text-white`,
					disabled && "bg-unfocused"
				)}
			>
				{isCompleted ? <TickIcon /> : step}
			</span>
		</div>
	);
}

function StepInformation({ title, description, disabled = false }: StepInfoProps) {
	return (
		<article className={cnMerge("w-full", disabled && "text-unfocused")}>
			<h4>{title}</h4>

			<p>{description}</p>
		</article>
	);
}

export { StepIndicator, StepInformation };
