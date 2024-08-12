const Minus = ({ mode, width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || "16"}
            height={height || "16"}
            fill="none"
            viewBox="0 0 9 3"
        >
            <path fill={mode || "#35383F"} d="M8.96.646v1.92H.74V.646h8.22z"></path>
        </svg>
    );
}

export default Minus;