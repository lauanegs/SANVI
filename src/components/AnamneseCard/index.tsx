import { Text } from "@components/Text";
import { Container, TextField, TextFieldWrapper } from "./styles";
import { AnamneseCardProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppStore } from "store/appStore";

export function AnamneseCard({ title, onHeightChange, ...rest }: AnamneseCardProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const isFullScreen = useAppStore().isFullScreen;

    useEffect(() => {
        const textArea = textAreaRef.current;
        if(textArea){
            const prevHeight = textArea.style.height;
            textArea.style.height = 'auto';
            textArea.style.height = `${textArea.scrollHeight}px`;

            const heightValueChanged = Number(prevHeight) - Number(textArea.style.height);
            const isSum = heightValueChanged > 0;
            const value = isSum ? heightValueChanged : heightValueChanged * -1;

            onHeightChange(value, isSum);
        }

    }, [textAreaRef.current?.value, isFullScreen])

    return (
        <Container>
            {title &&
                <Text
                    color="PRIMARY"
                    size={12}
                    text={title}
                />
            }
            <TextFieldWrapper>
                <TextField
                    ref={textAreaRef}
                    spellCheck={false}
                    {...rest}
                />
            </TextFieldWrapper>
        </Container>

    );
}