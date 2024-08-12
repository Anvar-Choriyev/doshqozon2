const ThreeDots = ({ mode, width, height }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width || "24"}
			height={height || "25"}
			fill="none"
			viewBox="0 0 24 25"
		>
			<g fill={mode || "#35383F"} clipPath="url(#clip0_504_769)">
				<rect width="6" height="6" x="9" y="0.231" rx="3"></rect>
				<rect width="6" height="6" x="9" y="9.231" rx="3"></rect>
				<rect width="6" height="6" x="9" y="18.231" rx="3"></rect>
			</g>
			<defs>
				<clipPath id="clip0_504_769">
					<path
						fill="#fff"
						d="M0 0H24V24H0z"
						transform="translate(0 .23)"
					></path>
				</clipPath>
			</defs>
		</svg>
	)
}

export default ThreeDots;