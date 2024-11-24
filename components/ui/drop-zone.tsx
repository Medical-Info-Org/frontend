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

type InputProps = Omit<React.ComponentPropsWithRef<"input">, "children" | "onDrop"> & {
	children?: React.ReactNode | ((props: RenderProps) => React.ReactNode);
	classNames?: { activeDragState?: string; base?: string; input?: string };
};

export type DropZoneProps = {
	allowedFileTypes?: string[];

	disableInbuiltValidation?: boolean;

	existingFiles?: File[];

	onDrop: (details: {
		acceptedFiles: File[];
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>;
	}) => void;

	validationSettings?: {
		disallowDuplicates?: boolean;
		fileLimit?: number;
		maxFileSize?: number;
	};

	validator?: (context: { existingFileArray: File[] | undefined; newFileList: FileList }) => File[];
};

function DropZone(props: DropZoneProps & InputProps) {
	const {
		allowedFileTypes,
		children,
		className,
		classNames,
		disableInbuiltValidation,
		existingFiles,
		onChange,
		onDrop,
		validationSettings,
		validator,
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
					existingFileArray: existingFiles,
					newFileList: fileList,
					onError: (ctx) => toast.error("Error", { description: ctx.message }),
					onSuccess: (ctx) => toast.success("Success", { description: ctx.message }),
					validationSettings: isObject(validationSettings)
						? { ...validationSettings, allowedFileTypes }
						: {},
				})
			: [];

		const validatorFnFileArray = validator
			? validator({ existingFileArray: existingFiles, newFileList: fileList })
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
				"relative isolate flex flex-col",
				classNames?.base,
				isDragging && ["opacity-60", classNames?.activeDragState]
			)}
		>
			<InputPrimitive
				className={cnMerge(
					"absolute inset-0 z-[100] cursor-pointer opacity-0",
					className,
					classNames?.input
				)}
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

export { DropZone };
