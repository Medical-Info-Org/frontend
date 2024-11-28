"use client";

import { toast } from "sonner";
import { InputPrimitive } from "../form";
import { type UseDropZoneProps, useDropZone } from "./useDropZone";

function DropZone(props: UseDropZoneProps) {
	const api = useDropZone({
		onUploadError: (ctx) => toast.error("Error", { description: ctx.message }),
		onUploadSuccess: (ctx) => toast.success("Success", { description: ctx.message }),
		...props,
	});

	return (
		<div {...api.getRootProps()}>
			<InputPrimitive {...api.getInputProps()} />

			{api.getChildren()}
		</div>
	);
}

export { DropZone };
