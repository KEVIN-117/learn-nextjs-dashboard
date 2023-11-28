export default function Logo({width=100, height=100}){
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width={width}
            height={height}
            viewBox="0,0,256,256"
        >
            <defs>
                <linearGradient
                    x1={32}
                    y1={22.915}
                    x2={32}
                    y2={39.482}
                    gradientUnits="userSpaceOnUse"
                    id="color-1_NU48HGBGk0Do_gr1"
                >
                    <stop offset={0} stopColor="#fcf3fd" />
                    <stop offset={1} stopColor="#6edafc" />
                </linearGradient>
                <linearGradient
                    x1={32}
                    y1={4.319}
                    x2={32}
                    y2={56.536}
                    gradientUnits="userSpaceOnUse"
                    id="color-2_NU48HGBGk0Do_gr2"
                >
                    <stop offset={0} stopColor="#e090f0" />
                    <stop offset={1} stopColor="#05bdf5" />
                </linearGradient>
                <linearGradient
                    x1={32}
                    y1={4.319}
                    x2={32}
                    y2={56.536}
                    gradientUnits="userSpaceOnUse"
                    id="color-3_NU48HGBGk0Do_gr3"
                >
                    <stop offset={0} stopColor="#e090f0" />
                    <stop offset={1} stopColor="#05bdf5" />
                </linearGradient>
            </defs>
            <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth={1}
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit={10}
                strokeDasharray=""
                strokeDashoffset={0}
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{
                    mixBlendMode: "normal",
                }}
            >
                <g transform="scale(4,4)">
                    <path
                        d="M32,24l-16,7l16,9l16,-9z"
                        fill="url(#color-1_NU48HGBGk0Do_gr1)"
                    />
                    <path
                        d="M15.979,32.214l15.029,8.588c0.306,0.174 0.648,0.261 0.991,0.261c0.343,0 0.686,-0.087 0.992,-0.262l15.028,-8.588c0.473,-0.271 0.819,-0.729 0.949,-1.257c0.131,-0.528 0.038,-1.094 -0.254,-1.553l-15.027,-23.614c-0.369,-0.58 -1,-0.926 -1.687,-0.926c-0.688,0 -1.318,0.346 -1.688,0.926l-15.028,23.615c-0.292,0.459 -0.385,1.024 -0.254,1.553c0.13,0.529 0.477,0.987 0.949,1.257zM17.598,30.838l13.402,-5.361v13.017zM33,25.477l13.4,5.36l-13.4,7.658zM45.71,28.407l-12.71,-5.084v-14.889zM31,8.434v14.889l-12.71,5.084z"
                        fill="url(#color-2_NU48HGBGk0Do_gr2)"
                    />
                    <path
                        d="M50.178,35.027c-0.319,-0.354 -0.846,-0.434 -1.255,-0.19l-16.923,10.086l-16.923,-10.086c-0.409,-0.245 -0.935,-0.166 -1.255,0.19c-0.319,0.355 -0.344,0.886 -0.058,1.268l16.626,22.205c0.381,0.518 0.968,0.814 1.61,0.814c0.642,0 1.229,-0.296 1.605,-0.808l16.63,-22.211c0.286,-0.382 0.262,-0.913 -0.057,-1.268zM18.396,39.143l12.604,7.512v9.323zM33,55.968v-9.313l12.602,-7.511z"
                        fill="url(#color-3_NU48HGBGk0Do_gr3)"
                    />
                </g>
            </g>
        </svg>
    )
}