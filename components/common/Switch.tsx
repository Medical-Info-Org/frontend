"use client";

import { getSlotElement } from "@zayne-labs/toolkit/react/utils";
import { isArray } from "@zayne-labs/toolkit/type-helpers";

type ValidSwitchComponentType = React.ReactElement<SwitchMatchProps>;

type SwitchProps<TCondition> = {
	condition?: TCondition;
	children: ValidSwitchComponentType | ValidSwitchComponentType[];
};

type SwitchMatchProps<TWhen = boolean> = {
	when: TWhen;
	children: React.ReactNode;
};

function Switch<TCondition = true>(props: SwitchProps<TCondition>) {
	const { children, condition = true } = props;

	const defaultCase = getSlotElement(children, Default, {
		throwOnMultipleSlotMatch: true,
		errorMessage: "Only one <Switch.Default> component is allowed",
	});

	const childrenCasesArray = isArray(children) ? children : [children];

	const matchedCase = childrenCasesArray.find((child) => child.props.when === condition);

	return matchedCase ?? defaultCase;
}

export function Match<TWhen>({ children }: SwitchMatchProps<TWhen>) {
	return children;
}

export function Default({ children }: Pick<SwitchMatchProps, "children">) {
	return children;
}
Default.slot = Symbol.for("fallback");

Switch.Match = Match;
Switch.Default = Default;

export default Switch;
