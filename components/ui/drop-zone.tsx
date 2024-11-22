"use client";

import { cnMerge } from "@/lib/utils/cn";
import { handleFileValidation } from "@zayne-labs/toolkit";
import { useToggle } from "@zayne-labs/toolkit/react";
import { isFunction, isObject } from "@zayne-labs/toolkit/type-helpers";
import { type ChangeEvent, type DragEvent, useState } from "react";
import { toast } from "sonner";
import { InputPrimitive } from "./form";

type RenderProps = {
	acceptedFiles: File[];
};

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "onDrop" | "children"> & {
	classNames?: { base?: string; input?: string; activeDragState?: string };
	children?: React.ReactNode | ((props: RenderProps) => React.ReactNode);
};

export type DropZoneProps = {
	existingFiles?: File[];

	allowedFileTypes?: string[];

	disableInbuiltValidation?: boolean;

	validationSettings?: {
		fileLimit?: number;
		maxFileSize?: number;
		disallowDuplicates?: boolean;
	};

	validator?: (context: { newFileList: FileList; existingFileArray: File[] | undefined }) => File[];

	onDrop: (details: {
		acceptedFiles: File[];
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
	}) => void;
};

function DropZone(props: DropZoneProps & InputProps) {
	const {
		onDrop,
		validationSettings,
		validator,
		allowedFileTypes,
		disableInbuiltValidation,
		existingFiles,
		className,
		classNames,
		onChange,
		children,
		...restOfInputProps
	} = props;

	const [isDragging, toggleIsDragging] = useToggle(false);

	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

	const handleFileUpload = (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) => {
		if (event.type === "drop") {
			event.preventDefault();
			toggleIsDragging(false);
		}

		const fileList =
			event.type === "drop"
				? (event as DragEvent).dataTransfer.files
				: (event as ChangeEvent<HTMLInputElement>).target.files;

		if (fileList === null) {
			toast.error("Error", {
				description: "No file selected",
			});

			return;
		}

		const inbuiltValidatedFilesArray = !disableInbuiltValidation
			? handleFileValidation({
					newFileList: fileList,
					existingFileArray: existingFiles,
					validationSettings: isObject(validationSettings)
						? { ...validationSettings, allowedFileTypes }
						: {},
					onError: (ctx) => toast.error("Error", { description: ctx.message }),
					onSuccess: (ctx) => toast.success("Success", { description: ctx.message }),
				})
			: [];

		const validatorFnFileArray = validator
			? validator({ newFileList: fileList, existingFileArray: existingFiles })
			: [];

		const validFilesArray = [...inbuiltValidatedFilesArray, ...validatorFnFileArray];

		if (validFilesArray.length === 0) return;

		setAcceptedFiles(validFilesArray);

		onDrop({ acceptedFiles: validFilesArray, event });
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
			onDrop={handleFileUpload}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={cnMerge(
				"relative flex flex-col",
				classNames?.base,
				isDragging && ["opacity-60", classNames?.activeDragState]
			)}
		>
			<InputPrimitive
				className={cnMerge("absolute inset-0 cursor-pointer opacity-0", className, classNames?.input)}
				type="file"
				{...(allowedFileTypes && { accept: allowedFileTypes.join(", ") })}
				{...restOfInputProps}
				onChange={(event) => {
					handleFileUpload(event);
					onChange?.(event);
				}}
			/>

			{isFunction(children) ? children({ acceptedFiles }) : children}
		</div>
	);
}

export default DropZone;
