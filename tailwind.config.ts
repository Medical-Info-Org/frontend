import typographyPlugin from "@tailwindcss/typography";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";
import animationPlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";

const tailwindConfig = withTV({
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./node_modules/@zayne-labs/toolkit/dist/esm-min/**/*.js",
	],

	theme: {
		screens: {
			sm: "480px",
			md: "800px",
			lg: "1000px",
			xl: "1280px",
		},

		extend: {
			colors: {
				medinfo: {
					primary: {
						main: "var(--color-primary-main)",
						darker: "var(--color-primary-darker)",
						lighter: "var(--color-primary-lighter)",
						subtle: "var(--color-primary-subtle)",
					},

					secondary: {
						main: "var(--color-secondary-main)",
						darker: "var(--color-secondary-darker)",
						lighter: "var(--color-secondary-lighter)",
						subtle: "var(--color-secondary-subtle)",
					},

					light: {
						"1": "var(--color-light-1)",
						"2": "var(--color-light-2)",
						"3": "var(--color-light-3)",
						"4": "var(--color-light-4)",
					},

					dark: {
						"1": "var(--color-dark-1)",
						"2": "var(--color-dark-2)",
						"3": "var(--color-dark-3)",
						"4": "var(--color-dark-4)",
					},

					disabled: "var(--disabled)",

					"body-color": "var(--body-color)",
				},

				sonner: {
					"success-bg": "hsl(150 100% 6%)",
					"success-text": "hsl(150 100% 90%)",
					"success-border": "hsl(147 100% 12%)",
					"error-bg": "hsl(358 76% 10%)",
					"error-text": "hsl(358 100% 81%)",
					"error-border": "hsl(357 89% 16%)",
				},

				shadcn: {
					background: "hsl(0,0%,0%)",
					foreground: "hsl(222.2 47.4% 11.2%)",
					popover: "theme(colors.shadcn.background)",
					primary: "theme(colors.shadcn.foreground)",
					"primary-foreground": "hsl(210 40% 98%)",
					"popover-foreground": "theme(colors.shadcn.foreground)",
					accent: "hsl(210 40% 96.1%)",
					"accent-foreground": "theme(colors.shadcn.foreground)",
					input: "hsl(214.3 31.8% 91.4%)",
					border: "theme(colors.shadcn.input)",
					ring: "hsl(215 20.2% 65.1%)",
					muted: "theme(colors.shadcn.accent)",
					"muted-foreground": "hsl(215.4 16.3% 46.9%)",
				},
			},

			borderRadius: {
				full: "50%",
			},

			fontFamily: {
				roboto: ["var(--font-roboto)"],
				"work-sans": ["var(--font-work-sans)"],
			},

			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},

			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},

	plugins: [
		typographyPlugin,
		animationPlugin,
		// eslint-disable-next-line ts-eslint/unbound-method
		plugin(({ addComponents }) => {
			const scrollNone = {
				".scrollbar-none": {
					"-ms-overflow-style": "none" /* IE and Edge */,
					"scrollbar-width": "none" /* Firefox */,

					"&::-webkit-scrollbar": {
						display: "none",
					},
				},
			};

			const navLinkTransition = {
				".navLink-transition": {
					"&::before": {
						content: '""',
						position: "absolute",
						bottom: "20px",
						left: "50%",
						backgroundColor: "theme(colors.medinfo.primary.darker)",

						"@media (width < 800px)": {
							".nav-mobile&": {
								backgroundColor: "white",
							},
						},
						opacity: "0",
						transform: "translateX(-50%)",
						height: " 2px",
						width: "2px",
						borderRadius: "50%",
						transition: `opacity 0.4s ease 0s,
						bottom 0.3s ease 0.1s,
						height 0.5s ease 0.3s,
						border-radius 0.2s ease 0.4s,
						width 0.5s ease 0.4s`,
					},

					"&:hover::before": {
						bottom: "-0.7px",
						height: "2px",
						width: "calc(100% + 2px)",
						borderRadius: "20px",
						opacity: "1",
					},
				},
			};

			addComponents([scrollNone, navLinkTransition]);
		}),
	],
}) satisfies Config;

export default tailwindConfig;
