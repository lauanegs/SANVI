import { IconProps, LibNames } from "./types";
import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import * as pi from "react-icons/pi";
import * as lu from "react-icons/lu";  
import * as io5 from "react-icons/io5";
import * as cg from "react-icons/cg";
import * as bs from "react-icons/bs";
import * as fa6 from "react-icons/fa6";
import * as io6 from "react-icons/io5";
import * as hi2 from "react-icons/hi2";
import * as fi from "react-icons/fi";

export const libs = {
    fa,
    md,
    ai,
    pi,
    lu,
    io5,
    cg,
    bs,
    fa6,
    io6,
    hi2,
    fi
}

function Icon<T extends LibNames>({color, fill, iconLibName, icon, size}:IconProps<T>){
    const IconComponent = libs[iconLibName][icon] as React.ElementType;
    return(
        <IconComponent
            color={color}
            fill={fill ? fill : color}
            size={size}
        />
    );
}

export default Icon;