const Download = ({ mode, width, height, ...rest }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={width || "24"}
            height={height || "24"}
            fill="none"
            viewBox="0 0 24 24"
            {...rest}
        >
            <mask
                id="mask0_504_887"
                style={{ maskType: "alpha" }}
                width={width || "24"}
                height={height || "24"}
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
            >
                <path fill="url(#pattern0)" d="M0 0H24V24H0z"></path>
            </mask>
            <g mask="url(#mask0_504_887)">
                <path fill={mode || "#35383F"} d="M0 0H24V24H0z"></path>
            </g>
            <defs>
                <pattern
                    id="pattern0"
                    width="1"
                    height="1"
                    patternContentUnits="objectBoundingBox"
                >
                    <use transform="scale(.00195)" xlinkHref="#image0_504_887"></use>
                </pattern>
                <image
                    id="image0_504_887"
                    width="512"
                    height="512"
                    xlinkHref="data:image/png;base64,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"
                ></image>
            </defs>
        </svg>
    )
}

export default Download;