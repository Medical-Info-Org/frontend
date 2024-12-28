"use client";
// FIXME - Change accordions component to another suitable one and then remove use client from this page`

import { ChevronDownIcon } from "@/components/icons";
import { Accordion } from "@/components/ui";
import { getElementList } from "@zayne-labs/toolkit/react/ui/for";

const FAQs = [
	{
		question: "What is MedInfo Nigeria?",
		answer:
			"MedInfo Nigeria is an online platform that provides access to reliable health information and connects users with certified doctors for consultations.",
	},
	{
		question: "Is the platform free to use?",
		answer:
			"Yes, accessing our health information library is free. However, consultations with healthcare professionals may require payment.",
	},
	{
		question: "How do I consult a doctor?",
		answer:
			"Simply sign up, select a specialist or sub-specialist, and book a virtual consultation through our platform.",
	},
	{
		question: "Can I use MedInfo Nigeria at any time?",
		answer:
			"Absolutely! Our platform is available 24/7, so you can access health information or consult a doctor whenever you need.",
	},
	{
		question: "Are the doctors on the platform certified?",
		answer:
			"Yes, all doctors and healthcare professionals on MedInfo Nigeria are verified and certified to ensure you receive trustworthy advice.",
	},
];

function AccordionComponent() {
	const [FAQList] = getElementList();

	return (
		<Accordion.Root type="single" collapsible={true} asChild={true}>
			<FAQList
				className="mt-6 grid w-full gap-2 md:mt-14 md:gap-4"
				each={FAQs}
				render={(FAQ) => (
					<Accordion.Item key={FAQ.question} value={FAQ.answer} asChild={true}>
						<li>
							<Accordion.Trigger
								withDefaultIcon={false}
								classNames={{
									base: `flex min-h-[68px] flex-col items-start rounded-[16px] border
									border-medinfo-primary-darker px-6 py-[15px] text-[22px]
									text-medinfo-primary-main md:p-6 md:text-[32px] md:font-semibold
									[&[data-state=open]_svg]:rotate-180`,
								}}
							>
								<div className="flex w-full items-center justify-between gap-6">
									<p className="text-pretty text-left">{FAQ.question}</p>

									<span
										className="flex items-center justify-center rounded-full
											bg-medinfo-primary-main p-[10px] md:p-4"
									>
										<ChevronDownIcon className="size-4 md:size-6" />
									</span>
								</div>

								<Accordion.Content
									className="border-medinfo-primary-darker py-[18px] text-left md:py-[27px]"
								>
									<hr className="mb-4 h-[2px] bg-medinfo-secondary-main" />

									<p>{FAQ.answer}</p>
								</Accordion.Content>
							</Accordion.Trigger>
						</li>
					</Accordion.Item>
				)}
			/>
		</Accordion.Root>
	);
}

export default AccordionComponent;
