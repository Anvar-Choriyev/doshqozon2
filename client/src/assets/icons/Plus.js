const Plus = ({ mode, width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "16"}
            height={height || "16"}
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                fill={mode || "#35383F"}
                d="M16 9.506H9.663V16H6.337V9.506H0V6.494h6.337V0h3.326v6.494H16v3.012z"
            ></path>
        </svg>
    );
}
export default Plus;