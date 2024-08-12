const Eye = ({ mode, width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "24"}
            height={height || "24"}
            fill="none"
            viewBox="0 0 24 24"
        >
            <g
                stroke={mode || "#35383F"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                clipPath="url(#clip0_504_625)"
            >
                <path d="M3 3l18 18M10.585 10.587a2 2 0 102.827 2.83"></path>
                <path d="M9.363 5.365A9.466 9.466 0 0112 5c4 0 7.333 2.333 10 7-.778 1.361-1.612 2.524-2.503 3.488m-2.14 1.861C15.726 18.45 13.942 19 12 19c-4 0-7.333-2.333-10-7 1.369-2.395 2.913-4.175 4.632-5.34"></path>
            </g>
            <defs>
                <clipPath id="clip0_504_625">
                    <path fill="#fff" d="M0 0H24V24H0z"></path>
                </clipPath>
            </defs>
        </svg>
    )
}
export default Eye;