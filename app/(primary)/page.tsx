import { Main } from "@/app/_components";
import { IconBox, NavLink } from "@/components/common";
import { Button } from "@/components/ui";
import { callBackendApi } from "@/lib/api/callBackendApi";
import type { TipsResponse } from "@/lib/api/callBackendApi/types";
import { cnJoin } from "@/lib/utils/cn";
import { feature1, feature2, feature3, hero } from "@/public/assets/images/landing-page";
import { getElementList } from "@zayne-labs/toolkit/react/ui/for";
import Image from "next/image";
import { AccordionComponent } from "./_components";
import { ScrollableTipCards } from "./daily-tips/DailyTipCard";

const coreServices = [
	{
		imageSrc: feature1 as string,
		title: "SubSpecialists",
		description:
			"Connect with certified sub-specialists across various medical fields for expert guidance tailored to your specific health needs.",
	},
	{
		imageSrc: feature2 as string,
		title: "Open source library",
		description:
			"Access a rich, user-friendly library of health information covering a wide range of conditions, symptoms, and treatments—all for free.",
	},
	{
		imageSrc: feature3 as string,
		title: "Virtual consultancy",
		description:
			"Get personalized medical advice from experienced healthcare professionals through our secure and convenient virtual consultation service.",
	},
];

const features = [
	{ icon: "ic:sharp-access-time", title: "Efficient and user-friendly" },
	{ icon: "fluent:access-time-24-regular", title: "Accessible consultations" },
	{ icon: "mynaui:lock-password", title: "Ensured confidentiality" },
	{ icon: "mage:book-text", title: "Open library" },
];

const advantages = [
	{
		icon: "mage:book-text",
		title: "24/7 availability",
		description:
			"Get access to trusted healthcare information and professional support anytime, day or night, at your convenience.",
	},
	{
		icon: "solar:user-check-rounded-outline",
		title: "Remote visitation",
		description:
			"Consult with doctors from the comfort of your home, eliminating the need for travel or in-person visits.",
	},
	{
		icon: "tabler:calendar-check",
		title: "Zero appointments",
		description:
			"Experience quick and easy scheduling with minimal wait times, ensuring you get the help you need when you need it.",
	},
];

const [CoreServiceList] = getElementList();
const [FeatureList] = getElementList();
const [AdvantageList] = getElementList();

async function HomePage() {
	const allTips = await callBackendApi<TipsResponse>("/dailyTips/tips");

	if (allTips.error) {
		console.error(allTips.error.errorData);
	}

	return (
		<Main className="w-full gap-14 max-md:max-w-[400px] md:gap-[92px]">
			<section className="flex flex-col items-center md:flex-row-reverse md:gap-[67px]">
				<div className="flex flex-col items-center max-md:text-center md:items-start">
					<h1
						className="text-[clamp(32px,5.2vw,68px)] font-bold leading-10 text-medinfo-primary-main
							md:text-balance md:leading-[76px] [&:hover>span]:text-medinfo-secondary-darker
							[&>span]:[transition:color_250ms_ease-in-out]"
					>
						Free <span>access</span> to knowledge and an easy chit-chat with the best{" "}
						<span>doctors</span>
					</h1>

					<p className="mt-[15px] md:text-[18px] md:leading-[26px]">
						Getting the right health information shouldn’t be complicated, and talking to a doctor
						shouldn’t feel like a big task. That’s why we’ve made it easy for you to access reliable
						knowledge and chat with some of the best doctors in the field. Whether you have a simple
						question or need guidance on something more serious, we’re here to connect you with
						professionals who are ready to help—no stress, no barriers. It's healthcare made simple,
						just the way it should be.
					</p>
					<Button asChild={true} className="mt-6">
						<NavLink href={{ pathname: "/signup", query: { user: "patient" } }}>Join Us</NavLink>
					</Button>
				</div>

				<div
					className="relative ml-[--offset] w-max shrink-0 [--offset:19px]
						max-md:mt-[calc(40px_+_var(--offset))]"
				>
					<span
						className="absolute bottom-[--offset] right-[--offset] z-[-1] block size-full
							rounded-[16px] bg-medinfo-primary-main md:bottom-[28px] md:right-[28px]
							md:rounded-[24px]"
					/>
					<Image
						className="aspect-[223/273] min-h-[273px] md:aspect-[340/415] md:min-h-[415px]"
						src={hero as string}
						alt=""
						priority={true}
						width={223}
						height={273}
					/>
				</div>
			</section>

			<section>
				<h2
					className="text-center text-[28px] font-semibold leading-9 text-medinfo-primary-main
						md:text-[52px] md:font-bold md:leading-[60px]"
				>
					Our Core Services
				</h2>

				<CoreServiceList
					className="mt-6 flex flex-col items-center gap-4 text-center md:mt-14 md:flex-row
						md:justify-between md:gap-[28px]"
					each={coreServices}
					render={(coreService, index) => (
						<li key={coreService.title} className="group">
							<div className="relative">
								<Image
									className={cnJoin(
										"aspect-[272/292] max-h-[292px] md:aspect-[340/362] md:max-h-[362px]",
										index === 1 && "md:mt-[80px]"
									)}
									src={coreService.imageSrc}
									alt=""
									width={272}
									height={292}
								/>

								<span
									className="absolute inset-0 flex items-end rounded-[16px]
										bg-medinfo-primary-main p-7 font-normal text-white opacity-0
										[transition:opacity_300ms_ease] group-hover:opacity-100 md:text-[18px]"
								>
									{coreService.description}
								</span>
							</div>

							<p
								className="mt-4 text-[22px] font-medium [transition:opacity_300ms_ease]
									group-hover:opacity-0 md:text-[24px] md:font-semibold"
							>
								{coreService.title}
							</p>
						</li>
					)}
				/>
			</section>

			<section>
				<h2
					className="text-center text-[28px] font-semibold leading-9 text-medinfo-primary-main
						md:text-[52px] md:font-bold md:leading-[60px]"
				>
					Why MedInfo Nigeria?
				</h2>

				<FeatureList
					className="mt-12 grid grid-cols-2 justify-center gap-x-5 gap-y-10 text-center md:mt-[88px]
						md:grid-cols-[repeat(4,_minmax(161px,248px))] md:justify-between md:gap-x-[28px]"
					each={features}
					render={(feature) => (
						<li
							key={feature.title}
							className="relative flex flex-col items-center justify-center rounded-[16px] border
								border-medinfo-primary-main px-[3.5px] py-[54px] text-medinfo-primary-main
								md:px-[47px] md:py-[67px]"
						>
							<span
								className="absolute top-[-24px] block size-12 rounded-full bg-white p-3 text-[24px]
									[box-shadow:0_4px_4px_hsl(0,0%,0%,0.12)] md:size-16 md:text-[40px]"
							>
								<IconBox icon={feature.icon} />
							</span>
							<p className="md:text-[20px]">{feature.title}</p>
						</li>
					)}
				/>
			</section>

			<section>
				<h2
					className="text-center text-[28px] font-semibold leading-9 text-medinfo-primary-main
						md:text-[52px] md:font-bold md:leading-[60px]"
				>
					Advantages of Virtual Healthcare
				</h2>
				<AdvantageList
					className="mt-6 flex flex-col gap-6 md:mt-14 md:flex-row md:gap-[28px]"
					each={advantages}
					render={(advantage) => (
						<li key={advantage.title}>
							<span
								className="block size-[92px] rounded-[16px] bg-medinfo-primary-subtle p-6
									text-[44px] text-medinfo-primary-main"
							>
								<IconBox icon={advantage.icon} />
							</span>
							<h3 className="mt-5 text-[24px] font-semibold text-medinfo-primary-main">
								{advantage.title}
							</h3>
							<p className="mt-3">{advantage.description}</p>
						</li>
					)}
				/>
			</section>

			<section className="flex flex-col items-center">
				<h2
					className="text-center text-[28px] font-semibold leading-9 text-medinfo-primary-main
						md:text-[52px] md:font-bold md:leading-[60px]"
				>
					Did you know?
				</h2>

				{allTips.data && <ScrollableTipCards tips={allTips.data.data} />}
			</section>

			<section>
				<h2
					className="text-center text-[28px] font-semibold leading-9 text-medinfo-primary-main
						md:text-[52px] md:font-bold md:leading-[60px]"
				>
					Frequently Asked Questions
				</h2>

				<AccordionComponent />
			</section>
		</Main>
	);
}

export default HomePage;
