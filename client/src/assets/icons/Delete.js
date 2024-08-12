const Delete = ({ mode, width, height, ...rest }) => {
    return (
        <svg
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
            width={width || "24"}
            height={height || "24"}
            fill="none"
            viewBox="0 0 24 24"
        >
            <rect
                width="15"
                height="18"
                x="4.5"
                y="5.1"
                stroke={mode || "#FF4043"}
                strokeWidth="1.5"
                rx="1.5"
            ></rect>
            <rect
                width="19.5"
                height="3"
                x="2.25"
                y="2.1"
                stroke={mode || "#FF4043"}
                strokeLinejoin="round"
                strokeWidth="1.5"
                rx="0.75"
            ></rect>
            <path
                stroke={mode || "#FF4043"}
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M9 .9h6M12 9v10.5M15.75 9v10.5M8.25 9v10.5"
            ></path>
        </svg>
    )
}

export default Delete;