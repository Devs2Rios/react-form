import { useState, ChangeEventHandler, ChangeEvent, FocusEventHandler, FocusEvent } from "react";
import { InputHook } from "utils/types";

export default function useInput(inputName: string, txtValidator: RegExp): InputHook {
    const [inputValue, setInputValue] = useState<string>(""),
        [isTouched, setIsTouched] = useState<boolean>(false),
        [errorMessage, setErrorMessage] = useState<string | null>(null);

    const inputIsValid = (): boolean => (inputValue.trim() !== '' && txtValidator.test(inputValue)),
        inputNameToReadable = (): string =>
            inputName.split('-').map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`).join(' '),
        defineError = (): string | null => inputIsValid()
            ? null
            : `${inputNameToReadable()} is invalid`,
        handleInputChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
            setIsTouched(false);
            setInputValue(event.target?.value);
        },
        handleInputBlur: FocusEventHandler<HTMLInputElement> = (_: FocusEvent<HTMLInputElement>) => {
            setIsTouched(true);
            setErrorMessage(defineError());
        };

    return {
        value: inputValue,
        touched: isTouched,
        error: errorMessage,
        isValid: inputIsValid,
        handleChange: handleInputChange,
        handleBlur: handleInputBlur,
        setInputValue,
        setIsTouched,
        setErrorMessage,
        defineError
    };
}
