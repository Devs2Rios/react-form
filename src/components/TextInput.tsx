import { memo, ChangeEvent, FocusEvent } from 'react';
import clsx from "clsx";

interface Props {
    label: string;
    id: string;
    inputIsInvalid: boolean;
    type: 'text' | 'email' | 'password';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    value: string;
    minLength?: number;
    maxLength?: number;
    errorMessage: string | null;
}

function TextInput({
    label,
    inputIsInvalid,
    type,
    id,
    onChange,
    onBlur,
    value,
    minLength,
    maxLength,
    errorMessage,
}: Props) {
    return (
        <div className={clsx('form-control', {
            invalid: inputIsInvalid,
        })}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                minLength={minLength}
                maxLength={maxLength}
            />
            {errorMessage && <p className="error-text">{errorMessage}</p>}
        </div>
    );
}

export default memo(TextInput);