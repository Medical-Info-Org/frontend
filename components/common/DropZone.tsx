"use client";

import { Switch } from "@/components/common/Switch";
import { cnMerge } from "@/lib/utils/cn";
import { toArray } from "@zayne-labs/toolkit/core";
import { isFile, isString } from "@zayne-labs/toolkit/type-helpers";
import { getElementList } from "@zayne-labs/ui-react/common/for";
import { DropZone, type UseDropZoneProps } from "@zayne-labs/ui-react/drop-zone";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { IconBox } from "./IconBox";

type FileOrNull = File | null;

type DropZoneInputProps = {
	onChange: (file: FileOrNull | FileOrNull[]) => void;
	value: FileOrNull | FileOrNull[];
};

export function DropZoneInput(props: DropZoneInputProps) {
	const { onChange, value } = props;

	const existingFiles = toArray(value).filter(Boolean);

	const handleFileUpload: UseDropZoneProps["onUpload"] = ({ acceptedFiles }) => {
		const newFileState = [...existingFiles, ...acceptedFiles];

		onChange(newFileState.at(-1) as File);
	};

	return (
		<DropZone
			onUploadError={(ctx) => toast.error("Error", { description: ctx.message })}
			onUploadSuccess={(ctx) => toast.success("Success", { description: ctx.message })}
			onUpload={handleFileUpload}
			classNames={{
				base: `items-center gap-2 rounded-[8px] border-[1.4px] border-dashed
				border-medinfo-primary-darker px-4 py-3`,
			}}
			allowedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
			validationSettings={{ maxFileSize: 4 }}
		>
			<span className="block shrink-0 md:size-10">
				<IconBox icon="solar:file-send-outline" className="size-full" />
			</span>

			<p className="text-[18px] font-medium text-medinfo-primary-darker md:text-[20px]">
				Drag files to upload
			</p>

			<p className="text-sm text-medinfo-dark-2">Files supported: JPG, PNG, PDF </p>

			<p className="text-sm text-medinfo-dark-2">or</p>

			<Button size="large">Choose File</Button>

			<p className="text-sm text-medinfo-dark-2">Maximum size: 4mb</p>
		</DropZone>
	);
}

type ImagePreviewProps = {
	classNames?: {
		image?: string;
		listContainer?: string;
		listItem?: string;
	};
	onChange: (file: File | File[]) => void;
	value: File | File[];
};

export function DropZoneImagePreview(props: ImagePreviewProps) {
	const { classNames, onChange, value } = props;

	const newFilesArray = toArray(value).filter(Boolean);

	const [ImagePreviewList] = getElementList();

	if (newFilesArray.length === 0) return;

	const handleRemoveImage = (file: File) => () => {
		const updatedFileState = newFilesArray.filter((item) => {
			if (isFile(item) && isFile(file)) {
				return item.name !== file.name;
			}

			return false;
		});

		onChange(updatedFileState);
	};

	return (
		<ImagePreviewList
			className={cnMerge(
				`relative mt-[13px] max-h-[140px] divide-y divide-gray-600 overflow-y-auto overscroll-y-contain
				rounded-md border border-gray-600`,
				classNames?.listContainer
			)}
			each={newFilesArray}
			render={(file) => {
				return (
					<li
						key={isFile(file) ? file.name : file}
						className={cnMerge(
							"flex items-center justify-between p-2 text-xs",
							classNames?.listItem
						)}
					>
						<div className="flex min-h-[66px] min-w-0 items-center gap-4">
							<Switch.Root>
								<Switch.Match
									when={(isFile(file) && file.type.startsWith("image")) || isString(file)}
								>
									<Image
										src={isFile(file) ? URL.createObjectURL(file) : file}
										className={cnMerge(
											"size-[50px] shrink-0 rounded-md object-cover",
											classNames?.image
										)}
										width={50}
										height={50}
										priority={true}
										alt="image-preview-thumbnail"
									/>
								</Switch.Match>

								<Switch.Match when={isFile(file) && file.type.includes("pdf")}>
									<span className="block size-[40px] shrink-0">
										<IconBox icon="solar:document-medicine-linear" className="size-full" />
									</span>
								</Switch.Match>

								<Switch.Default>
									<span className="block size-[40px] shrink-0">
										<IconBox icon="solar:file-outline" className="size-full" />
									</span>
								</Switch.Default>
							</Switch.Root>

							{isFile(file) && <p className="truncate">{file.name}</p>}
						</div>

						{isFile(file) && (
							<button type="button" onClick={handleRemoveImage(file)}>
								<IconBox
									icon="lucide:trash-2"
									className="size-[20px] text-red-500 active:scale-110"
								/>
							</button>
						)}
					</li>
				);
			}}
		/>
	);
}
