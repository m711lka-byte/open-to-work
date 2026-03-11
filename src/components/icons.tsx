import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 3v18" />
            <path d="M3 12h18" />
            <path d="M17.5 17.5 14 14" />
            <path d="M6.5 6.5 10 10" />
            <path d="m14 10-4 4" />
            <path d="M17.5 6.5 14 10" />
            <path d="m10 14-4 4" />
        </svg>
    );
}
