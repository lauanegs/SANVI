import * as fa from "react-icons/fa";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import { IconProps } from "./types";


function Icon({color, iconLib, iconName, size}:IconProps){
    let IconComponent;
    switch(iconLib){
        case "fa":
            IconComponent = (fa as any)[iconName];
            break;
        case "md":
            IconComponent = (md as any)[iconName];
            break;
        case "ai":
            IconComponent = (ai as any)[iconName];
            break;
    }

    return(
        <IconComponent
            color={color}
            size={size}
        />
    );
}

export default Icon;