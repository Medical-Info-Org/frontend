const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 20.64C16.7717 20.64 20.64 16.7717 20.64 12C20.64 7.22825 16.7717 3.35999 12 3.35999C7.22826 3.35999 3.36 7.22825 3.36 12C3.36 16.7717 7.22826 20.64 12 20.64Z"
			fill="url(#paint0_angular_2713_14725)"
		/>
		<circle cx="11.9998" cy="22.32" r="1.68" fill="white" />
		<defs>
			<radialGradient
				id="paint0_angular_2713_14725"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(12 12) rotate(90) scale(12)"
			>
				<stop stopColor="white" />
				<stop offset="1" stopColor="white" stopOpacity="0" />
			</radialGradient>
		</defs>
	</svg>
);

export default SpinnerIcon;
