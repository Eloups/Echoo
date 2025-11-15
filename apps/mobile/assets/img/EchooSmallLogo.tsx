
import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

type Props = Partial<SvgProps> & {
    width?: number | string;
    height?: number | string;
};

const EchooSmallLogo: React.FC<Props> = ({ width = 240, height = 61, ...props }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 154 154"
        fill="none"
        {...props}
    >
        <Path
            opacity={0.984}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.6523 47.3339C66.9794 47.6815 85.3064 47.6815 103.633 47.3339C116.74 47.7819 123.859 54.5503 124.993 67.6387C125.237 74.5903 125.149 81.5343 124.729 88.4709C122.605 100.175 115.573 106.152 103.633 106.402C85.702 106.051 67.7705 106.051 49.839 106.402C37.7463 106.163 30.7145 100.098 28.7431 88.2072C28.333 81.4449 28.245 74.6766 28.4794 67.9024C29.3546 55.2053 36.0789 48.3492 48.6523 47.3339ZM48.3886 57.0908C57.565 57.0747 66.7506 67.6184 75.9452 67.6387C85.648 67.6602 95.3609 57.1605 105.084 57.2226C109.719 57.7255 112.664 60.2306 113.918 64.738C114.158 65.8706 114.334 67.0132 114.445 68.1661C114.621 74.0553 114.621 79.9447 114.445 85.8339C114.304 89.7646 112.678 92.885 109.567 95.1952C108.137 95.8474 106.643 96.2869 105.084 96.5137C95.3603 96.58 85.6474 85.8131 75.9452 85.8339C67.2345 85.8526 58.5325 96.6635 49.839 96.6456C43.6653 96.4496 40.1494 93.2853 39.291 87.1524C38.7665 80.1212 38.7665 73.0891 39.291 66.0565C40.2211 60.863 43.2536 57.8745 48.3886 57.0908Z"
            fill="url(#paint0_linear_18_464)"
        />
        <Defs>
            <LinearGradient
                id="paint0_linear_18_464"
                x1={28.3516}
                y1={76.8682}
                x2={125.127}
                y2={76.8682}
                gradientUnits="userSpaceOnUse"
            >
                <Stop stopColor="#3243DF" />
                <Stop offset={0.846154} stopColor="#7D32DF" />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default EchooSmallLogo;