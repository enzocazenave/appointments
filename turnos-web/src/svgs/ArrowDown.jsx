export const ArrowDown = (props) => (
    <svg
        width={800}
        height={800}
        viewBox="0 0 24 24"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g
            clipPath="url(#a)"
            stroke="#fff"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7 10 5 5M12 15l5-5" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)