"use client";

import { IconBox } from "@/components/common";
import { Button, DropZone } from "@/components/ui";
import type { DropZoneProps } from "@/components/ui/drop-zone";
import { toArray } from "@zayne-labs/toolkit";

type FileOrNull = File | null;

type DropZoneInputProps = {
	value: FileOrNull | FileOrNull[];
	onChange: (file: FileOrNull | FileOrNull[]) => void;
};

function DropZoneInput(props: DropZoneInputProps) {
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

export default DropZoneInput;
