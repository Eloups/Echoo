import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

type IconProps = SvgProps & {
    /** Couleur appliquée aux strokes des paths */
    strokeColor?: string;
    /** Taille (largeur/hauteur) en pixels */
    size?: number;
};

const LibraryIcon: React.FC<IconProps> = ({
    strokeColor = "#5061F7",
    size = 28,
    ...rest
}) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        {...rest}
    >
        <Path
            stroke={strokeColor}
            strokeWidth={1.5}
            d="M23.453 7.75a2.665 2.665 0 0 0-2.625-3.125H7.173A2.665 2.665 0 0 0 4.548 7.75m16.327-3.125c.035-.325.054-.486.054-.62a2.5 2.5 0 0 0-2.234-2.491c-.132-.014-.295-.014-.62-.014h-8.15c-.325 0-.489 0-.621.014A2.5 2.5 0 0 0 7.07 4.005c0 .134.018.296.054.62"
        />
        <Path
            stroke={strokeColor}
            strokeLinecap="round"
            strokeWidth={2}
            d="M17.75 21.5h-7.5m15.242-1.509c-.437 3.1-.656 4.651-1.777 5.58-1.121.929-2.775.929-6.084.929H10.37c-3.308 0-4.963 0-6.084-.929-1.121-.929-1.34-2.479-1.777-5.58l-.528-3.75c-.559-3.955-.837-5.931.348-7.212C3.513 7.75 5.623 7.75 9.84 7.75h8.32c4.218 0 6.328 0 7.512 1.28.937 1.011.96 2.458.652 4.97"
        />
    </Svg>
);

export default LibraryIcon;
