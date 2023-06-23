import {
    ChangeEvent,
    FocusEvent,
    ChangeEventHandler,
    FocusEventHandler,
} from "react";

export type InputHook = {
    value: string,
    touched: boolean,
    error: string | null,
    isValid: () => boolean,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    handleBlur: FocusEventHandler<HTMLInputElement>,
    handleReset: () => void,
    defineError: () => string | null
}

export interface Input {
    id: string;
    label: string;
    type: 'email' | 'text' | 'password';
    min?: number;
    max?: number;
    hook: InputHook;
}

export interface TextInputProps {
    label: string;
    id: string;
    inputIsValid: boolean;
    type: 'text' | 'email' | 'password';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    value: string;
    minLength?: number;
    maxLength?: number;
    errorMessage: string | null;
}