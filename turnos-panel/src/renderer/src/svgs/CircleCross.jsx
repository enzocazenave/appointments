export const CircleCross = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-circle-x"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#ff2825"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M0 0h24v24H0z" stroke="none" />
        <circle cx={12} cy={12} r={9} />
        <path d="m10 10 4 4m0-4-4 4" />
    </svg>
)