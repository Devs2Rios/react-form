import { useReducer, ChangeEventHandler, ChangeEvent, FocusEventHandler, FocusEvent } from "react";
import { InputHook } from "utils/types";

const initialVaue: {
    value: string, touched: boolean, error: string | null
} = { value: '', touched: false, error: null };

const inputReducer = (
    state: typeof initialVaue,
    action: { type: string, payload?: string | null }
): typeof initialVaue => {
    switch (action.type) {
        case 'BLUR':
            return { ...state, touched: true, error: action.payload || null };
        case 'CHANGE':
            return { ...state, value: action.payload || '' };
        case 'RESET':
            return { ...state, touched: false, error: null, value: '' };
        default:
            return state;
    }
};

export default function useInput(inputName: string, txtValidator: RegExp): InputHook {
    const [inputState, dispatch] = useReducer(inputReducer, initialVaue);;

    const inputIsValid = (): boolean => (inputState.value.trim() !== '' && txtValidator.test(inputState.value)),
        inputNameToReadable = (): string =>
            inputName.split('-').map((word: string) => `${word[0].toUpperCase()}${word.slice(1)}`).join(' '),
        defineError = (): string | null => inputIsValid()
            ? null
            : `${inputNameToReadable()} is invalid`,
        handleChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'CHANGE', payload: event.target?.value });
        },
        handleBlur: FocusEventHandler<HTMLInputElement> = (_: FocusEvent<HTMLInputElement>) => {
            dispatch({ type: 'BLUR', payload: defineError() });
        },
        handleReset = (): void => dispatch({ type: 'RESET' });

    return {
        value: inputState.value,
        touched: inputState.touched,
        error: inputState.error,
        isValid: inputIsValid,
        handleChange,
        handleBlur,
        handleReset,
        defineError
    };
}
