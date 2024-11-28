import { StepIndicator, StepInformation } from "./StepDetails";

type StepTrackerProps = {
	currentStep: number;
};

function StepTracker(props: StepTrackerProps) {
	const { currentStep } = props;

	return (
		<>
			<div className="flex flex-col text-[14px]">
				<StepIndicator step={1} isCompleted={currentStep > 1} />

				<StepIndicator step={2} disabled={currentStep < 2} isCompleted={currentStep > 2} />

				<StepIndicator step={3} disabled={currentStep < 3} />
			</div>

			<div className="flex flex-col items-center justify-between gap-8 text-xs">
				<StepInformation
					title="Basic Info"
					description="Create a campaign to fund your passion or cause"
				/>

				<StepInformation
					title="Funding"
					description="Share your funding goal and deadline"
					disabled={currentStep < 2}
				/>

				<StepInformation
					title="Preview"
					description="Preview your campaign"
					disabled={currentStep < 3}
				/>
			</div>
		</>
	);
}

export default StepTracker;
