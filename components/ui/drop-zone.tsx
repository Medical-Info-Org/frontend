"use client";

import { cnMerge } from "@/lib/utils/cn";
import { handleFileValidation } from "@zayne-labs/toolkit";
import { useToggle } from "@zayne-labs/toolkit/react";
import { isFunction, isObject } from "@zayne-labs/toolkit/type-helpers";
import type { ChangeEvent, DragEvent } from "react";
import { toast } from "sonner";
import { InputPrimitive } from "./form";

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "className" | "onDrop"> & {
	classNames?: { base?: string; input?: string; activeDragState?: string };
};

export type DropZoneProps =
	| {
			existingFiles?: File[];

			allowedFileTypes?: string[];

			// eslint-disable-next-line ts-eslint/no-explicit-any
			validator?: (...params: any[]) => File[];

			validationRules?: "Option not available since you're using the validator prop";

			onDrop: (details: {
				acceptedFiles: File[];
				event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
			}) => void;
	  }
	| {
			existingFiles?: File[];

			allowedFileTypes?: string[];

			validationRules?: {
				fileLimit?: number;
				maxFileSize?: number;
				disallowDuplicates?: boolean;
			};

			validator?: "Option not available since you're using the validationRules prop";

			onDrop: (details: {
				acceptedFiles: File[];
				event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
			}) => void;
	  };

function DropZone(props: DropZoneProps & InputProps) {
	const {
		onDrop,
		validationRules,
		validator,
		allowedFileTypes,
		existingFiles,
		classNames,
		children,
		...restOfInputProps
	} = props;

	const [isDragging, toggleIsDragging] = useToggle(false);

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
		if (event.type === "drop") {
			event.preventDefault();
			toggleIsDragging(false);
		}

		const fileList =
			event.type === "drop"
				? (event as DragEvent).dataTransfer.files
				: (event as ChangeEvent<HTMLInputElement>).target.files;

		if (fileList === null) {
			console.warn("No file selected");

			toast.error("Error", {
				description: "No file selected",
			});

			return;
		}

		const filesArray = isFunction(validator)
			? validator(fileList, existingFiles)
			: handleFileValidation({
					newFileList: fileList,
					existingFileArray: existingFiles,
					validationRules: isObject(validationRules) ? { ...validationRules, allowedFileTypes } : {},
				});

		if (filesArray.length === 0) return;

		onDrop({ acceptedFiles: filesArray, event });
	};

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragging(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		toggleIsDragging(false);
	};

	return (
		<div
			onDrop={handleImageUpload}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={cnMerge(
				"relative flex flex-col",
				classNames?.base,
				isDragging && ["opacity-60", classNames?.activeDragState]
			)}
		>
			<InputPrimitive
				className={cnMerge("absolute inset-0 cursor-pointer opacity-0", classNames?.input)}
				type="file"
				{...(allowedFileTypes && { accept: allowedFileTypes.join(", ") })}
				onChange={handleImageUpload}
				{...restOfInputProps}
			/>

			{children}
		</div>
	);
}

export default DropZone;
