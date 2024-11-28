import { Main } from "@/app/_components";
import { IconBox } from "@/components/common";
import { Button } from "@/components/ui";
import { appointmentPlaceholder } from "@/public/assets/images/dashboard";
import Image from "next/image";
// import { useForm } from "react-hook-form";

function AppointmentPage() {
	// const methods = useForm({
	// 	defaultValues: {},
	// });

	return (
		<Main className="w-full gap-8 max-md:mx-auto max-md:max-w-[400px]">
			<header>
				<Button size="icon" theme="primary-inverted" className="border-[0.6px] border-medinfo-light-1">
					<IconBox icon="lucide:chevron-left" className="size-5 text-medinfo-primary-darker" />
				</Button>
			</header>

			<section className="rounded-[16px] p-4 shadow-[0_4px_6px_hsl(150,20%,25%,0.25)]">
				<article className="flex gap-5">
					<Image
						src={appointmentPlaceholder as string}
						className="size-[88px]"
						width={88}
						height={88}
						alt=""
					/>

					<div className="flex flex-col justify-between">
						<h1 className="text-[18px] font-medium">Primary care appointment</h1>
						<p className="text-[14px] text-medinfo-dark-1">$0 - $120</p>
					</div>
				</article>

				<hr className="my-6 h-[0.6px] bg-medinfo-light-1" />

				{/* <Form.Root methods={methods}>

				</Form.Root> */}
			</section>
		</Main>
	);
}

export default AppointmentPage;
