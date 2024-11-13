"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@/components/icons/ArrowBackIcon";
import { useForm } from "react-hook-form";
import { Button, Form } from "@/components/ui";
import Image from "next/image";
import MessageImage from "@/public/assets/images/message.png";
import ViewIcon from "@/components/icons/ViewIcon";

function Page() {
	const contactInfoMethods = useForm({
		defaultValues: { text: "" },
	});

	const router = useRouter();
	const handleBackClick = () => {
		router.push("/patient/community");
	};
	return (
		<div className="p-[24px] lg:p-[40px]">
			<div
				className="flex max-w-[48px] items-center rounded-[8px] border border-solid
					border-medinfo-light-1 bg-white p-[14px] lg:max-w-[64px] lg:p-[20px]"
				onClick={handleBackClick}
			>
				<ArrowBackIcon />
			</div>
			<div className="mt-[32px] rounded-[16px] bg-white p-[16px] shadow-md lg:p-[32px]">
				<div className="flex flex-col gap-[32px] lg:flex-row lg:gap-[64px]">
					<div className="w-full max-w-[426px]">
						<h2 className="font-semibold text-medinfo-dark-1 lg:text-[24px]">Start a new topic</h2>
						<Form.Root className="gap-[14px] lg:mt-[32px]" methods={contactInfoMethods}>
							<Form.Item<typeof contactInfoMethods.control>
								name="text"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Discussion topic</Form.Label>
								<Form.Input
									type="text"
									className="h-[48px] rounded-[8px] border-[1.4px] border-medinfo-primary-main
										px-4 py-3 placeholder:text-medinfo-dark-4 focus-visible:ring-transparent
										md:h-[64px] md:py-5 md:text-base"
								/>
							</Form.Item>
							<Form.Item<typeof contactInfoMethods.control>
								name="text"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Message</Form.Label>
								<Form.Input
									type="textarea"
									className="h-[163px] rounded-[8px] border-[1.4px] border-medinfo-primary-main
										px-4 py-5 placeholder:text-medinfo-dark-4 focus-visible:ring-transparent
										md:h-[159px] md:text-base"
								/>
							</Form.Item>
						</Form.Root>
						<div className="lg:mt-[32px]">
							<Button theme="primary" className="lg:w-[185px] lg:px-[32px] lg:py-[18px]">
								Create topic
							</Button>
						</div>
					</div>
					<hr className="hidden h-[460px] w-0.5 rotate-0 border-none bg-medinfo-light-1 lg:flex" />
					<hr className="flex w-full lg:hidden" />
					<div className="">
						<h2 className="font-medium text-medinfo-dark-1 lg:text-[22px]">Checkout these topics</h2>
						<div className="rounded-[8px] border border-solid border-medinfo-light-1 p-[16px]">
							<div className="flex cursor-pointer flex-col items-end gap-[12px] lg:flex-row">
								<div className="flex gap-[12px]">
									<Image src={MessageImage} alt="profile" className="size-[48px]" />
									<div>
										<h2 className="text-[20px]">Malaria parasites</h2>
										<p className="font-normal text-medinfo-dark-3">
											Lorem ipsum dolor sit amet consectetur. Eget vivamus.
										</p>
									</div>
								</div>
								<div className="flex items-center gap-[4px]">
									<ViewIcon />
									<p className="text-[14px] font-normal text-medinfo-dark-3">13 views</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
