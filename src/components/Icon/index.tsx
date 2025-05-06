import { IconProps, LibNames } from "./types";
import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import * as pi from "react-icons/pi";
import * as lu from "react-icons/lu";  

export const libs = {
    fa,
    md,
    ai,
    pi,
    lu
}

function Icon<T extends LibNames>({color, iconLibName, icon, size}:IconProps<T>){
    const IconComponent = libs[iconLibName][icon] as React.ElementType;
    return(
        <IconComponent
            color={color}
            size={size}
        />
    );
}

export default Icon;