import { TextComponent } from "./styles";
import { TextProps } from "./types";

export function Text({color, size, text, weight}: TextProps){
    return(
        <TextComponent
            color={color}
            size={size}
            weight={weight}
        >
            {text}
        </TextComponent>
    );
}