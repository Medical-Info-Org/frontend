"use client";

import { IconBox, Logo, NavLink, Show } from "@/components/common";
import { Button, Form } from "@/components/ui";
import { callBackendApi } from "@/lib/api/callBackendApi";
import type { SuccessContext } from "@zayne-labs/callapi";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Main } from "../_components";

function SignInPage() {
	const methods = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { control } = methods;

	const user = useSearchParams().get("user") as "doctor" | "patient" | null;

	const router = useRouter();

	const onSubmit = async (data: Record<string, unknown>) => {
		const resolvedUser = user ?? "patient";

		await callBackendApi("/:user/login", {
			params: { user: resolvedUser },
			method: "POST",
			body: data,

			onError: (ctx) => {
				toast.error(ctx.error.message);
			},

			onSuccess: (ctx: SuccessContext<{ message: string }>) => {
				toast.success(ctx.data.message);

				router.push(`/${resolvedUser}`);
			},
		});
	};

	return (
		<Main className="w-full px-0 max-md:max-w-[342px] md:flex md:flex-col md:items-center">
			<div
				className="rounded-[16px] border-[1.4px] border-medinfo-light-2
					shadow-[0_0_0_2px_hsl(0,0%,0%,0.25)] md:flex md:max-w-fit"
			>
				<section
					className="m-6 md:mx-[93px] md:my-11 md:flex md:w-full md:max-w-[460px] md:flex-col
						md:items-center"
				>
					<Logo className="max-lg:h-[46px] max-lg:w-[60px]" />

					<div className="mt-3 flex flex-col items-center gap-8 md:w-max">
						<h1
							className="max-w-[186px] text-center text-[24px] font-semibold leading-[32px]
								text-medinfo-primary-darker md:mx-[42px] md:max-w-[375px] md:text-[48px]
								md:font-bold md:leading-[56px]"
						>
							Sign in to MedInfo Nigeria
						</h1>

						<Form.Root
							methods={methods}
							className="w-full gap-[14px]"
							onSubmit={(event) => void methods.handleSubmit(onSubmit)(event)}
						>
							<Form.Item control={control} name="email" className="gap-1 font-roboto font-medium">
								<Form.Label className="md:text-[20px]">Email</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="mynaui:envelope" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="email"
										placeholder="enter email"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>
							</Form.Item>

							<Form.Item
								control={control}
								name="password"
								className="gap-1 font-roboto font-medium"
							>
								<Form.Label className="md:text-[20px]">Password</Form.Label>

								<Form.InputGroup
									className="h-[48px] gap-4 rounded-[8px] border-[1.4px]
										border-medinfo-primary-main px-4 py-3 md:h-[64px] md:py-5"
								>
									<Form.InputLeftItem className="size-5 md:size-6">
										<IconBox icon="mynaui:lock-password" className="size-full" />
									</Form.InputLeftItem>

									<Form.Input
										type="password"
										placeholder="enter password"
										className="placeholder:text-medinfo-dark-4 md:text-base"
									/>
								</Form.InputGroup>

								<NavLink
									href="/forgot-password"
									className="mt-1 self-end font-work-sans text-medinfo-primary-main"
								>
									Forgot password?
								</NavLink>
							</Form.Item>

							<article className="flex flex-col items-center gap-[14px] md:mt-[14px] md:gap-7">
								<Show when={user !== "doctor"}>
									<p className="text-medinfo-dark-4 md:text-[20px]">Or</p>

									<div className="flex gap-8">
										<Button size="icon" theme="secondary" className="rounded-[8px]">
											<IconBox
												icon="icon-park-outline:google"
												className="size-[18px] lg:size-6"
											/>
										</Button>

										<Button size="icon" theme="secondary" className="rounded-[8px]">
											<IconBox
												icon="basil:facebook-outline"
												className="size-[18px] lg:size-6"
											/>
										</Button>
									</div>
								</Show>

								<Button
									type="submit"
									isLoading={methods.formState.isSubmitting}
									disabled={methods.formState.isSubmitting}
								>
									Sign In
								</Button>

								<div className="flex flex-col items-center gap-2">
									<NavLink
										transitionType="Regular"
										href={{
											query: { user: user === "doctor" ? "patient" : "doctor" },
										}}
										className="text-medinfo-primary-main md:text-[20px]"
									>
										{user === "doctor" ? "Sign in as a patient" : "Sign in as a doctor"}
									</NavLink>

									<p className="md:hidden">
										Don't have an account?{" "}
										<NavLink
											transitionType="Regular"
											href={{
												pathname: "/signup",
												query: { user: user === "doctor" ? "doctor" : "patient" },
											}}
											className="text-medinfo-primary-main"
										>
											Sign up
										</NavLink>
									</p>
								</div>
							</article>
						</Form.Root>
					</div>
				</section>

				<section
					className="flex max-w-[432px] flex-col items-center justify-center rounded-r-[16px]
						bg-medinfo-primary-main px-[35px] text-center text-white max-md:hidden xl:shrink-0"
				>
					<h2 className="text-[32px] font-semibold">Welcome friend!</h2>

					<p className="mt-6 text-[18px]">Enter in your details and lets get you started</p>

					<Button theme="secondary-inverted" className="mt-[38px]" asChild={true}>
						<NavLink
							href={{
								pathname: "/signup",
								query: { user: user === "doctor" ? "doctor" : "patient" },
							}}
						>
							Sign up
						</NavLink>
					</Button>
				</section>
			</div>
		</Main>
	);
}

// == This wrapper is necessary due to vercel's stupid rule for using useSearchParams in a component
// LINK - https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const WithSuspense = () => (
	<Suspense>
		<SignInPage />
	</Suspense>
);

export default WithSuspense;
