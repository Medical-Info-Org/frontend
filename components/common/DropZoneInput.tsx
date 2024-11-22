import { cnMerge } from "@/lib/utils/cn";
import { toArray } from "@zayne-labs/toolkit";
import { isFile, isString } from "@zayne-labs/toolkit/type-helpers";
import Image from "next/image";
import { Button } from "../ui/button";
import { DropZone, type DropZoneProps } from "../ui/drop-zone";
import { getElementList } from "./For";
import { IconBox } from "./IconBox";
import { Switch } from "./Switch";

type FileOrNull = File | null;

type DropZoneInputProps = {
	value: FileOrNull | FileOrNull[];
	onChange: (file: FileOrNull | FileOrNull[]) => void;
};

export function DropZoneInput(props: DropZoneInputProps) {
	const { onChange, value } = props;

	const existingFiles = toArray(value).filter(Boolean);

	const handleFileUpload: DropZoneProps["onDrop"] = ({ acceptedFiles }) => {
		const newFileState = [...existingFiles, ...acceptedFiles];

		onChange(newFileState.at(-1) as File);
	};

	return (
		<DropZone
			onDrop={handleFileUpload}
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
		listContainer?: string;
		listItem?: string;
		image?: string;
	};
	value: File | File[];
	onChange: (file: File | File[]) => void;
};

export function DropZoneImagePreview(props: ImagePreviewProps) {
	const { value, onChange, classNames } = props;

	const newFilesArray = toArray(value).filter(Boolean);

	const [ImagePreviewList] = getElementList();

	if (newFilesArray.length === 0) return;

	const handleRemoveImage = (file: File) => () => {
		const updatedFileState = newFilesArray.filter((item) => {
			if (item instanceof File && file instanceof File) {
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
						key={file instanceof File ? file.name : file}
						className={cnMerge(
							"flex items-center justify-between gap-4 px-4 py-2 text-xs",
							classNames?.listItem
						)}
					>
						<div className="flex min-h-[66px] min-w-0 items-center gap-4">
							<Switch>
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
							</Switch>

							{isFile(file) && <p className="truncate">{file.name}</p>}
						</div>

						{isFile(file) && (
							<Button unstyled={true} onClick={handleRemoveImage(file)}>
								<IconBox
									icon="lucide:trash-2"
									className="size-[20px] text-red-500 active:scale-110"
								/>
							</Button>
						)}
					</li>
				);
			}}
		/>
	);
}
