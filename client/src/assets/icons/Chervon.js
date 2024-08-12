const Chervon = ({ mode, ...rest }) => {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
			<path d="M7.5 19.5L15 12L7.5 4.5" stroke={mode || "#35383F"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

export default Chervon;