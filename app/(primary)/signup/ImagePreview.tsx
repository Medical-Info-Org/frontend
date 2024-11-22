"use client";

import { IconBox, Switch, getElementList } from "@/components/common";
import { Button } from "@/components/ui";
import { cnMerge } from "@/lib/utils/cn";
import { toArray } from "@zayne-labs/toolkit";
import { isString } from "@zayne-labs/toolkit/type-helpers";
import Image from "next/image";

type ImagePreviewProps = {
	classNames?: {
		listContainer?: string;
		listItem?: string;
		image?: string;
	};
	value: File | File[];
	onChange: (file: File | File[]) => void;
};

const isFile = (value: unknown) => value instanceof File;

function ImagePreview(props: ImagePreviewProps) {
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
							"flex items-center justify-between p-2 text-xs",
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

export default ImagePreview;
