import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

type Props = Partial<SvgProps> & {
    width?: number | string;
    height?: number | string;
};

const EchooLogo: React.FC<Props> = ({ width = 194, height = 119, ...props }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 194 119"
        fill="none"
        preserveAspectRatio="none"
        {...props}
    >
        <Path
            opacity={0.984}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.6904 0C77.4248 0.696631 114.159 0.696631 150.893 0C177.163 0.898009 191.434 14.4643 193.706 40.6985C194.195 54.6322 194.019 68.5505 193.178 82.4541C188.92 105.913 174.825 117.894 150.893 118.396C114.952 117.691 79.0104 117.691 43.0689 118.396C18.8306 117.916 4.73622 105.759 0.784771 81.9255C-0.0371269 68.3713 -0.213663 54.805 0.256219 41.227C2.01048 15.7773 15.4886 2.03492 40.6904 0ZM40.1619 19.5564C58.5549 19.5243 76.9661 40.6577 95.3956 40.6985C114.844 40.7415 134.312 19.6961 153.801 19.8207C163.091 20.8286 168.993 25.8499 171.507 34.8844C171.989 37.1545 172.342 39.4448 172.564 41.7556C172.917 53.5597 172.917 65.3644 172.564 77.1685C172.282 85.0471 169.022 91.3015 162.786 95.9321C159.921 97.2392 156.926 98.1203 153.801 98.5749C134.311 98.7077 114.843 77.1268 95.3956 77.1685C77.9362 77.2061 60.494 98.8752 43.0689 98.8392C30.6945 98.4465 23.6473 92.1038 21.9268 79.8113C20.8756 65.718 20.8756 51.6231 21.9268 37.5272C23.791 27.1173 29.8694 21.1273 40.1619 19.5564Z"
            fill="url(#paint0_linear_343_3272)"
        />

        <Defs>
            <LinearGradient
                id="paint0_linear_343_3272"
                x1="0"
                y1="59.1978"
                x2="193.975"
                y2="59.1978"
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#3243DF" />
                <Stop offset={0.846154} stopColor="#7D32DF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default EchooLogo;
