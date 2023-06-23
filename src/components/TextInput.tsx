import { memo } from 'react';
import clsx from "clsx";
import { TextInputProps } from 'utils/types';

function TextInput({
    label,
    inputIsValid,
    type,
    id,
    onChange,
    onBlur,
    value,
    minLength,
    maxLength,
    errorMessage,
}: TextInputProps) {
    return (
        <div className={clsx('form-control', {
            invalid: !inputIsValid,
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