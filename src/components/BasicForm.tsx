import { FormEventHandler, FormEvent } from "react";
import useInput from "hooks/use-input";
import validators from "utils/validators";
import TextInput from "./TextInput";
import { Input, InputHook } from "utils/types";

const BasicForm = (): JSX.Element => {
  const firstNameInput: InputHook = useInput('first-name', validators.name),
    lastNameInput: InputHook = useInput('last-name', validators.name),
    emailInput: InputHook = useInput('email', validators.email),
    inputs: Input[] = [
      { id: 'first-name', label: 'Your First Name', type: 'text', min: 3, max: 255, hook: firstNameInput },
      { id: 'last-name', label: 'Your Last Name', type: 'text', min: 3, max: 255, hook: lastNameInput },
      { id: 'email', label: 'Email Address', type: 'email', min: 8, max: 255, hook: emailInput }
    ],
    formIsValid = (): boolean => inputs.every(((input: Input) => input.hook.isValid()));

  const submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
    event.preventDefault();
    if (formIsValid()) {
      for (const input of inputs) {
        const { value, handleReset } = input.hook;
        handleReset();
        console.log(value);
      }
    };
  };

  return (
    <form onSubmit={submitHandler}>
      {
        inputs.map((input: Input, i: number) => {
          const {
            id, label, type, min, max,
            hook: { value, touched, error, isValid, handleChange, handleBlur }
          } = input;
          return (
            <TextInput
              key={`input-${id}-${i}`}
              label={label}
              id={id}
              inputIsValid={isValid() || !touched}
              type={type}
              onChange={handleChange}
              onBlur={handleBlur}
              value={value}
              minLength={min}
              maxLength={max}
              errorMessage={error}
            />)
        })
      }
      <div className="form-actions">
        <button disabled={!formIsValid()}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
