"use client";

import { IconBox, NavLink } from "@/components/common";
import { Card } from "@/components/ui";
import type { TipsResponse } from "@/lib/api/callBackendApi/types";
import { cnMerge } from "@/lib/utils/cn";
import { useDragScroll } from "@zayne-labs/ui-react/drag-scroll";
import { getElementList } from "@zayne-labs/ui-react/for";
import Image from "next/image";

export type DailyTipCardProps = {
	id: string;
	className?: string;
	imageUrl: string;
	title: string;
};

export function DailyTipCard({ className, id, imageUrl, title }: DailyTipCardProps) {
	return (
		<Card.Root
			as="li"
			className={cnMerge(
				`flex w-[161px] shrink-0 flex-col gap-3 rounded-[16px] border-[1.4px] border-medinfo-light-1
				pb-3 md:w-[276px]`,
				className
			)}
		>
			<Card.Header className="h-[117px] md:h-[176px]">
				<Image
					className="h-full rounded-t-[16px] object-cover"
					src={imageUrl}
					alt=""
					draggable={false}
					width={161}
					height={117}
				/>
			</Card.Header>

			<Card.Content className="h-full px-3">{title}</Card.Content>

			<Card.Footer className="px-3" asChild={true}>
				<NavLink href={`/daily-tips/${id}`} className="flex items-center gap-4">
					Learn More
					<IconBox icon="material-symbols:play-arrow" className="text-[20px]" />
				</NavLink>
			</Card.Footer>
		</Card.Root>
	);
}

export function ScrollableTipCards({ tips }: { tips: TipsResponse["data"] }) {
	const { getItemProps, getRootProps } = useDragScroll<HTMLUListElement>({
		classNames: {
			base: "mt-6 select-none gap-5 md:mt-14 md:justify-between",
		},
	});

	const [CardList] = getElementList();

	return (
		<CardList
			{...getRootProps()}
			each={tips}
			render={(tip) => (
				<DailyTipCard
					key={tip.id}
					id={tip.id}
					imageUrl={tip.imageUrl}
					title={tip.title}
					{...getItemProps()}
				/>
			)}
		/>
	);
}
