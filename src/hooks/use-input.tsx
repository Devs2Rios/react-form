import {
    useState,
    ChangeEventHandler,
    ChangeEvent,
    FocusEventHandler,
    FocusEvent,
    Dispatch,
    SetStateAction
} from "react";

export type InputHook = {
    value: string,
    touched: boolean,
    error: string | null,
    isValid: () => boolean,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    handleBlur: FocusEventHandler<HTMLInputElement>,
    setInputValue: Dispatch<SetStateAction<string>>,
    setIsTouched: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string | null>>,
    defineError: () => string | null
}

export default function useInput(inputName: string, txtValidator: RegExp): InputHook {
    const [inputValue, setInputValue] = useState<string>(""),
        [isTouched, setIsTouched] = useState<boolean>(false),
        [errorMessage, setErrorMessage] = useState<string | null>(null);

    const inputIsValid = (): boolean => (inputValue.trim() !== '' && txtValidator.test(inputValue)),
        defineError = (): string | null => inputIsValid()
            ? null
            : `${inputName[0].toUpperCase()}${inputName.slice(1)} is invalid`,
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
