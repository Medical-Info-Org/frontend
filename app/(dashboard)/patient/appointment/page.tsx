"use client";

import { IconBox } from "@/components/common";
import { Button, DatePicker, Dialog, Form, Select } from "@/components/ui";
import { appointmentPlaceholder } from "@/public/assets/images/dashboard";
import { Steps } from "@ark-ui/react/steps";
import { getElementList } from "@zayne-labs/ui-react/for";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Main } from "../../_components";

const stepperItems = [{ title: "Book appointment" }, { title: "Accept specialist" }];

function AppointmentPage() {
	const methods = useForm({
		defaultValues: {
			name: "",
			email: "",
			phoneNumber: "",
			gender: "",
			dob: "",
			reason: "",
			dateTime: "",
			language: "",
			existingConditions: "",
			allergies: "",
			healthInsurance: "",
			agreeToPrivacyPolicy: "",
			allowTeleMedicine: "",
			allowInfoDisclosure: "",
			allowEmailOrSMS: "",
		},
	});

	return (
		<Main className="w-full gap-8 max-md:mx-auto max-md:max-w-[400px]">
			<header>
				<Button size="icon" theme="primary-inverted" className="border-[0.6px] border-medinfo-light-1">
					<IconBox icon="lucide:chevron-left" className="size-5 text-medinfo-primary-darker" />
				</Button>
			</header>

			<Form.Root methods={methods} onSubmit={(event) => void methods.handleSubmit(() => {})(event)}>
				<Steps.Root
					className="flex flex-col gap-8 rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]
						md:p-8"
					count={stepperItems.length}
					linear={true}
				>
					<StepsList />

					<section className="flex flex-col gap-[64px] max-md:items-center">
						<div className="flex gap-5">
							<Image
								src={appointmentPlaceholder as string}
								className="size-[88px]"
								width={88}
								height={88}
								alt=""
							/>

							<h1 className="text-[18px] font-medium md:text-[24px]">Primary care appointment</h1>
						</div>
					</section>

					<hr className="h-[0.6px] bg-medinfo-light-1" />

					<section className="flex flex-col gap-4">
						<h2 className="text-[18px] font-medium text-medinfo-dark-1 md:text-[22px]">
							Patient Information
						</h2>

						<div className="flex gap-2 md:gap-5">
							<Form.Item name="info" className="flex-row-reverse items-center gap-2">
								<Form.Label className="text-[14px] md:text-base">Use current profile</Form.Label>

								<Form.InputPrimitive
									type="radio"
									value="manual"
									className="size-5 accent-medinfo-primary-main"
								/>
							</Form.Item>

							<Form.Item name="info" className="flex-row-reverse items-center gap-2">
								<Form.Label className="text-[14px] md:text-base">Fill out manually</Form.Label>

								<Form.InputPrimitive
									defaultChecked={true}
									type="radio"
									value="manual"
									className="size-5 accent-medinfo-primary-main"
								/>
							</Form.Item>
						</div>

						<article className="flex flex-col gap-4 md:flex-row md:gap-[92px]">
							<div className="flex w-full flex-col gap-4">
								<Form.Item
									control={methods.control}
									name="name"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Name</Form.Label>

									<Form.Input
										type="text"
										placeholder="enter full name"
										className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
											border-medinfo-primary-main px-4 py-3 placeholder:text-medinfo-dark-4
											md:h-[64px] md:py-5 md:text-base"
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="email"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Email</Form.Label>

									<Form.Input
										type="email"
										placeholder="enter email"
										className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
											border-medinfo-primary-main px-4 py-3 placeholder:text-medinfo-dark-4
											md:h-[64px] md:py-5 md:text-base"
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="phoneNumber"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Phone Number</Form.Label>

									<Form.Input
										type="text"
										placeholder="enter phone number"
										className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
											border-medinfo-primary-main px-4 py-3 placeholder:text-medinfo-dark-4
											md:h-[64px] md:py-5 md:text-base"
									/>
								</Form.Item>
							</div>

							<div className="flex w-full flex-col gap-4">
								<Form.Item
									control={methods.control}
									name="gender"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Gender</Form.Label>

									<Form.Controller
										render={({ field }) => (
											<Select.Root
												name={field.name}
												value={field.value}
												onValueChange={field.onChange}
											>
												<Select.Trigger
													classNames={{
														base: `group h-[48px] gap-2 rounded-[8px] border-[1.4px]
														border-medinfo-primary-main px-4 font-medium
														data-[placeholder]:text-medinfo-dark-4 md:h-[64px] md:text-base`,
														icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
														md:size-6`,
													}}
												>
													<Select.Value placeholder="select gender" />
												</Select.Trigger>

												<Select.Content
													classNames={{
														base: `border-[1.4px] border-medinfo-primary-main bg-white/90 p-0
														backdrop-blur-lg`,
														viewport: "gap-1",
													}}
												>
													<Select.Item
														value="Male"
														className="h-[48px] bg-medinfo-light-3 font-medium
															text-medinfo-dark-4 focus:bg-medinfo-light-1
															focus:text-medinfo-body-color
															data-[state=checked]:bg-medinfo-light-1 md:h-[64px]
															md:text-base"
													>
														Male
													</Select.Item>
													<Select.Item
														value="Female"
														className="h-[48px] bg-medinfo-light-3 font-medium
															text-medinfo-dark-4 focus:bg-medinfo-light-1
															focus:text-medinfo-body-color
															data-[state=checked]:bg-medinfo-light-1 md:h-[64px]
															md:text-base"
													>
														Female
													</Select.Item>
												</Select.Content>
											</Select.Root>
										)}
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="dob"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Date of Birth</Form.Label>

									<Form.Controller
										render={({ field }) => (
											<DatePicker
												className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
													border-medinfo-primary-main px-4 py-3 text-[14px] md:h-[64px]
													md:py-5 md:text-base"
												dateValueString={field.value}
												placeholder="DD/MM/YYYY"
												onChange={field.onChange}
											/>
										)}
									/>
								</Form.Item>
							</div>
						</article>
					</section>

					<hr className="h-[0.6px] bg-medinfo-light-1" />

					<section className="flex flex-col gap-4">
						<h2 className="text-[18px] font-medium text-medinfo-dark-1 md:text-[22px]">
							Appointment details
						</h2>

						<article className="flex flex-col gap-4 md:flex-row md:gap-[92px]">
							<Form.Item
								control={methods.control}
								name="reason"
								className="w-full gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Reason</Form.Label>

								<Form.TextArea
									placeholder="tell us your symptoms"
									className="min-h-[180px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 [field-sizing:content]
										placeholder:text-medinfo-dark-4 md:py-5 md:text-base"
								/>
							</Form.Item>

							<div className="flex w-full flex-col gap-4">
								<Form.Item
									control={methods.control}
									name="dateTime"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Preferred date & time</Form.Label>

									<Form.Controller
										render={({ field }) => (
											<DatePicker
												className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
													border-medinfo-primary-main px-4 py-3 text-[14px] md:h-[64px]
													md:py-5 md:text-base"
												dateValueString={field.value}
												placeholder="DD/MM/YYYY - 00:00"
												onChange={field.onChange}
											/>
										)}
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="gender"
									className="gap-1 font-roboto font-medium"
								>
									<Form.Label className="text-medinfo-dark-4 md:text-[20px]">Language</Form.Label>

									<Form.Controller
										render={({ field }) => (
											<Select.Root
												disabled={true}
												defaultValue="English"
												name={field.name}
												value={field.value}
												onValueChange={field.onChange}
											>
												<Select.Trigger
													classNames={{
														base: `group h-[48px] gap-2 rounded-[8px] border-[1.4px]
														border-medinfo-primary-main px-4 font-medium
														disabled:border-medinfo-dark-4 disabled:bg-medinfo-disabled-fill
														disabled:text-medinfo-dark-4 disabled:opacity-[initial]
														data-[placeholder]:text-medinfo-dark-4 md:h-[64px] md:text-base`,
														icon: `text-medinfo-body-color group-data-[state=open]:rotate-180
														md:size-6`,
													}}
												>
													<Select.Value placeholder="select language" />
												</Select.Trigger>

												<Select.Content
													classNames={{
														base: `border-[1.4px] border-medinfo-primary-main bg-white/90 p-0
														backdrop-blur-lg`,
														viewport: "gap-1",
													}}
												>
													<Select.Item
														value="English"
														className="h-[48px] bg-medinfo-light-3 font-medium
															text-medinfo-dark-4 focus:bg-medinfo-light-1
															focus:text-medinfo-body-color
															data-[state=checked]:bg-medinfo-light-1 md:h-[64px]
															md:text-base"
													>
														English
													</Select.Item>
												</Select.Content>
											</Select.Root>
										)}
									/>
								</Form.Item>
							</div>
						</article>

						<div className="flex flex-col gap-2">
							<p className="text-[14px] text-medinfo-dark-4">Appointment will be held via</p>
							<a className="inline-flex items-center gap-1 text-medinfo-primary-main">
								Google Meet <IconBox icon="logos:google-meet" className="size-5" />
							</a>
						</div>
					</section>

					<hr className="h-[0.6px] bg-medinfo-light-1" />

					<section className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h2 className="text-[18px] font-medium text-medinfo-dark-1 md:text-[22px]">
								Health Information
							</h2>

							<p className="text-[14px] font-normal text-medinfo-dark-4">
								This section will help the doctor prepare better for your consultation
							</p>
						</div>

						<article className="flex flex-col gap-4">
							<div className="flex flex-col gap-4 md:flex-row md:gap-[92px]">
								<Form.Item
									control={methods.control}
									name="existingConditions"
									className="w-full gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Existing medical conditions</Form.Label>

									<Form.TextArea
										placeholder={`write "none" if there is none`}
										className="min-h-[180px] rounded-[8px] border-[1.4px]
											border-medinfo-primary-main px-4 py-3 [field-sizing:content]
											placeholder:text-medinfo-dark-4 md:py-5 md:text-base"
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="allergies"
									className="w-full gap-1 font-roboto font-medium"
								>
									<Form.Label className="md:text-[20px]">Allergies</Form.Label>

									<Form.TextArea
										placeholder={`write "none" if there is none`}
										className="min-h-[180px] rounded-[8px] border-[1.4px]
											border-medinfo-primary-main px-4 py-3 [field-sizing:content]
											placeholder:text-medinfo-dark-4 md:py-5 md:text-base"
									/>
								</Form.Item>
							</div>

							<div className="flex flex-col gap-5 md:flex-row">
								<Form.Item
									control={methods.control}
									name="healthInsurance"
									className="flex-row-reverse items-center justify-end gap-2"
								>
									<Form.Label className="md:text-[20px]">Yes, I have health insurance</Form.Label>

									<Form.Input
										type="radio"
										value="true"
										className="size-5 accent-medinfo-primary-main"
									/>
								</Form.Item>

								<Form.Item
									control={methods.control}
									name="healthInsurance"
									className="flex-row-reverse items-center justify-end gap-2"
								>
									<Form.Label className="md:text-[20px]">
										No, I don't have health insurance
									</Form.Label>

									<Form.Input
										defaultChecked={true}
										type="radio"
										value="false"
										className="size-5 accent-medinfo-primary-main"
									/>
								</Form.Item>
							</div>
						</article>
					</section>

					<hr className="h-[0.6px] bg-medinfo-light-1" />

					<section className="flex flex-col gap-4">
						<h2 className="text-[18px] font-medium text-medinfo-dark-1 md:text-[22px]">
							Consent & policies
						</h2>

						<article className="flex flex-col gap-3">
							<Form.Item
								control={methods.control}
								name="agreeToPrivacyPolicy"
								className="flex-row-reverse items-center justify-end gap-2"
							>
								<Form.Label className="md:text-[20px]">Privacy policy agreement</Form.Label>

								<Form.Input
									type="checkbox"
									value="true"
									className="size-5 shrink-0 rounded-[4px] border border-medinfo-primary-main
										accent-medinfo-primary-main"
								/>
							</Form.Item>

							<Form.Item
								control={methods.control}
								name="allowTeleMedicine"
								className="flex-row-reverse items-center justify-end gap-2"
							>
								<Form.Label className="md:text-[20px]">Consent for telemedicine</Form.Label>

								<Form.Input
									type="checkbox"
									value="false"
									className="size-5 shrink-0 rounded-[4px] border border-medinfo-primary-main
										accent-medinfo-primary-main"
								/>
							</Form.Item>

							<Form.Item
								control={methods.control}
								name="allowInfoDisclosure"
								className="flex-row-reverse justify-end gap-2"
							>
								<Form.Label className="md:text-[20px]">
									Agreement to disclose medical information to appropriate healthcare
									professionals
								</Form.Label>

								<Form.Input
									type="checkbox"
									value="false"
									className="size-5 shrink-0 rounded-[4px] border border-medinfo-primary-main
										accent-medinfo-primary-main"
								/>
							</Form.Item>

							<Form.Item
								control={methods.control}
								name="allowInfoDisclosure"
								className="flex-row-reverse items-center justify-end gap-2"
							>
								<Form.Label className="md:text-[20px]">Consent to SMS/email reminders</Form.Label>

								<Form.Input
									type="checkbox"
									value="false"
									className="size-5 shrink-0 rounded-[4px] border border-medinfo-primary-main
										accent-medinfo-primary-main"
								/>
							</Form.Item>
						</article>
					</section>

					<Dialog.Root>
						<div className="flex justify-center gap-6 md:justify-end">
							<Button theme="secondary">Cancel</Button>

							<Dialog.Trigger asChild={true}>
								<Steps.NextTrigger asChild={true}>
									<Button type="submit" theme="primary">
										Book Now
									</Button>
								</Steps.NextTrigger>
							</Dialog.Trigger>
						</div>
						<Dialog.Content className="max-w-[292px]">
							<Dialog.Header>
								<Dialog.Title>Book Appointment</Dialog.Title>

								<Dialog.Description>
									Please fill out the form below to book an appointment with Dr. Tezon.
								</Dialog.Description>
							</Dialog.Header>
						</Dialog.Content>
						E
					</Dialog.Root>
				</Steps.Root>
			</Form.Root>
		</Main>
	);
}

function StepsList() {
	const [ForList] = getElementList();

	return (
		<Steps.List className="flex justify-center" asChild={true}>
			<ForList
				each={stepperItems}
				render={(item, index) => (
					<Steps.Item key={index} index={index} className="flex items-center">
						{index !== 0 && <Steps.Separator className="h-[2px] w-[82px] bg-medinfo-light-2" />}

						<Steps.Trigger type="button" className="relative flex flex-col items-center">
							<Steps.Indicator
								className="flex size-6 items-center justify-center rounded-full border-[1.4px]
									border-[hsl(150,20%,95%)] bg-[hsl(150,20%,95%)] text-[10px]
									text-medinfo-secondary-darker data-[current]:border-medinfo-primary-main
									data-[current]:text-medinfo-primary-main md:size-12 md:text-[20px]"
							>
								{index + 1}
							</Steps.Indicator>

							<span
								className="absolute top-[calc(theme(spacing.6)_+_2px)] text-nowrap text-[10px]
									italic text-medinfo-dark-3 md:top-[calc(theme(spacing.12)_+_2px)]"
							>
								{item.title}
							</span>
						</Steps.Trigger>
					</Steps.Item>
				)}
			/>
		</Steps.List>
	);
}

export default AppointmentPage;
