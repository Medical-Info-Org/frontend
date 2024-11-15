"use client";

import { Logo, NavLink, ProgressBar } from "@/components/common";
import { HamburgerIcon, SearchIcon, XIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { cnMerge } from "@/lib/utils/cn";
import { useToggle } from "@zayne-labs/toolkit/react";

function NavBar() {
	const [isNavShow, toggleNavShow] = useToggle(false);

	return (
		<header
			id="NavBar"
			className={`sticky inset-[0_0_auto_0] z-[500] flex w-full items-center justify-between bg-white
				px-6 py-[17px] shadow-[0_4px_8px_hsl(150,20%,25%,0.25)] [transition:box-shadow_0.3s_ease]
				md:px-10 md:py-5 lg:px-[100px]`}
		>
			<ProgressBar />

			<Logo className="min-w-fit max-lg:h-[46px] max-lg:w-[60px]" />

			<DesktopNavigation className="max-md:hidden" />

			<MobileNavigation isNavShow={isNavShow} toggleNavShow={toggleNavShow} className="md:hidden" />

			<Button unstyled={true} className="z-10 md:hidden" onClick={toggleNavShow}>
				{isNavShow ? <XIcon /> : <HamburgerIcon />}
			</Button>
		</header>
	);
}

export default NavBar;

function DesktopNavigation({ className }: { className?: string }) {
	return (
		<article className={cnMerge("flex w-full items-center", className)}>
			<nav className="mx-auto flex min-w-fit gap-14 text-[22px] font-medium">
				<NavLink transitionType="Navbar" href="/">
					Home
				</NavLink>
				<NavLink transitionType="Navbar" href="/library">
					Library
				</NavLink>
				<NavLink transitionType="Navbar" href="/about">
					About us
				</NavLink>
				<NavLink transitionType="Navbar" href="/contact">
					Contact us
				</NavLink>
			</nav>

			<div className="flex min-w-fit items-center gap-8">
				<Button size="icon" theme="secondary">
					<SearchIcon type="green" />
				</Button>

				<Button asChild={true}>
					<NavLink href={{ pathname: "/signup", query: { user: "patient" } }}>Join Us</NavLink>
				</Button>
			</div>
		</article>
	);
}

type MobileNavProps = {
	className?: string;
	isNavShow: boolean;
	toggleNavShow: () => void;
};

function MobileNavigation(props: MobileNavProps) {
	const { className, isNavShow, toggleNavShow } = props;

	return (
		<article
			className={cnMerge(
				`fixed inset-[0_0_0_auto] flex flex-col items-center gap-7 overflow-hidden
				bg-medinfo-primary-main pt-10 text-white`,
				isNavShow ? "w-full [transition:width_350ms_ease]" : "w-0 [transition:width_500ms_ease]",
				className
			)}
			onClick={(event) => {
				const element = event.target as HTMLElement;

				element.tagName === "A" && toggleNavShow();
			}}
		>
			<Logo type="footer" className="h-[46px] w-[60px]" />

			<nav className="flex flex-col items-center gap-5 text-nowrap font-medium lg:text-[22px]">
				<NavLink transitionType="Navbar" href="/">
					Home
				</NavLink>
				<NavLink transitionType="Navbar" href="/library">
					Library
				</NavLink>
				<NavLink transitionType="Navbar" href="/about">
					About us
				</NavLink>
				<NavLink transitionType="Navbar" href="/contact">
					Contact us
				</NavLink>
			</nav>

			<div className="flex flex-col items-center gap-4">
				<Button unstyled={true}>
					<SearchIcon type="white" />
				</Button>

				<Button theme="secondary-inverted" asChild={true}>
					<NavLink href={{ pathname: "/signup", query: { user: "patient" } }}>Join Us</NavLink>
				</Button>
			</div>
		</article>
	);
}
