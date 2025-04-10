import { IconProps, LibNames } from "./types";
import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import * as lia from "react-icons/lia";

export const libs = {
    fa,
    md,
    ai,
    lia
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