import { Text } from "@components/Text";
import { Container, TextField, TextFieldWrapper } from "./styles";
import { AnamneseCardProps } from "./types";
import { useEffect, useRef } from "react";
import { useAppStore } from "store/appStore";

export function AnamneseCard({ title, ...rest }: AnamneseCardProps) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const isFullScreen = useAppStore().isFullScreen;

    useEffect(() => {
        const textArea = textAreaRef.current;
        if(textArea){
            textArea.style.height = 'auto';
            console.log("EXECUTOU")
            textArea.style.height = `${textArea.scrollHeight}px`;
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