import { Main } from "@/app/_components";
import { getElementList } from "@/components/common";
import { callBackendApi } from "@/lib/api/callBackendApi";
import type { DiseasesResponse, SingleDisease } from "@/lib/api/callBackendApi/types";
import Image from "next/image";
import { AlternateDiseaseCard, ScrollableAlternateDiseaseCards } from "../../DiseaseCard";

async function TipDetailsPage({ params }: { params: { name: string } }) {
	const [oneDisease, allDiseases] = await Promise.all([
		callBackendApi<SingleDisease>("/diseases/oneDisease", { query: params }),
		callBackendApi<DiseasesResponse>("/diseases/allDiseases", { query: { limit: 3 } }),
	]);

	if (oneDisease.error) {
		console.error(oneDisease.error.errorData);
		return null;
	}

	if (allDiseases.error) {
		console.error(allDiseases.error.errorData);
	}

	const [List] = getElementList();

	return (
		<Main className="flex w-full flex-col">
			<section className="lg:flex lg:gap-16">
				<Image
					className="size-[272px] rounded-br-[16px] rounded-tl-[16px] lg:size-[460px]"
					src={oneDisease.data.Image}
					alt=""
					priority={true}
					width={272}
					height={272}
				/>

				<section
					id="Ads"
					className="scrollbar-none hidden max-h-[460px] overflow-auto lg:flex lg:flex-col lg:gap-2"
				>
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
					<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				</section>
			</section>

			<section className="mt-5 flex flex-col gap-5 lg:mt-10">
				<h1
					className="text-[32px] font-semibold text-medinfo-primary-darker lg:text-[52px] lg:font-bold"
				>
					{oneDisease.data.Disease}
				</h1>

				<p className="text-[18px]">{oneDisease.data.Description}</p>

				<article>
					<h4>Symptoms</h4>
					<List
						as="ul"
						className="pl-12"
						each={oneDisease.data.Symptoms}
						render={(symptom) => <li className="list-['-_']">{symptom}</li>}
					/>
				</article>

				<article>
					<h4>Precautions</h4>
					<List
						as="ul"
						className="pl-12"
						each={oneDisease.data.Precautions}
						render={(precaution) => <li className="list-['-_']">{precaution}</li>}
					/>
				</article>
			</section>

			<section id="Ads" className="mt-14 flex flex-col gap-2 lg:hidden">
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
				<AlternateDiseaseCard type="list" linkToAd="https://www.google.com" />
			</section>

			<section id="Related Posts" className="mt-14 w-full lg:mt-[92px]">
				<h2 className="text-[48px] font-bold text-medinfo-primary-darker max-lg:hidden">
					Related Posts
				</h2>

				{allDiseases.data && <ScrollableAlternateDiseaseCards diseases={allDiseases.data.diseases} />}
			</section>
		</Main>
	);
}
export default TipDetailsPage;
