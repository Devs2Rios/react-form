import { useState, ChangeEventHandler, FormEventHandler, FormEvent, ChangeEvent, FocusEventHandler, FocusEvent } from "react";
import { nameInputValidator, emailInputValidator } from "utils/validators";
import TextInput from "./TextInput";

const SimpleInput = (): JSX.Element => {
  const [nameInput, setNameInput] = useState<string>(''),
    [nameInputIsValid, setNameInputIsValid] = useState<boolean>(false),
    [nameIsTouched, setNameIsTouched] = useState<boolean>(false),
    [nameErrorMessage, setNameErrorMessage] = useState<string | null>(null);

  const [emailInput, setEmailInput] = useState<string>(''),
    [emailInputIsValid, setEmailInputIsValid] = useState<boolean>(false),
    [emailIsTouched, setEmailIsTouched] = useState<boolean>(false),
    [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);

  const inputIsInvalid = (fieldIsValid: boolean, fieldIsTouched: boolean): boolean => !fieldIsValid && fieldIsTouched;

  const validateNameInput = (): string | null =>
    !nameInput.trim() ?
      'Please enter a name'
      : !nameInputIsValid ?
        'Please enter a valid name'
        : null,
    handleNameChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
      setNameInput(event.target?.value);
      setNameIsTouched(false);
      setNameInputIsValid(nameInputValidator(event.target?.value));
    },
    handleNameBlur: FocusEventHandler<HTMLInputElement> = (_: FocusEvent<HTMLInputElement>) => {
      setNameIsTouched(true);
      setNameErrorMessage(validateNameInput());
    };

  const validateEmailInput = (): string | null =>
    !emailInput.trim() ?
      'Please enter an email'
      : !emailInputIsValid ?
        'Please enter a valid email'
        : null,
    handleEmailChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target?.value);
      setEmailIsTouched(false);
      setEmailInputIsValid(emailInputValidator(event.target?.value));
    },
    handleEmailBlur: FocusEventHandler<HTMLInputElement> = (_: FocusEvent<HTMLInputElement>) => {
      setEmailIsTouched(true);
      setEmailErrorMessage(validateEmailInput());
    };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
    event.preventDefault();
    setNameIsTouched(true);
    setNameErrorMessage(validateNameInput());
    setEmailIsTouched(true);
    setEmailErrorMessage(validateEmailInput());
    if (nameInputIsValid && emailInputIsValid) {
      console.log(nameInput, emailInput);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <TextInput
        label='Your Name'
        id='name'
        inputIsInvalid={inputIsInvalid(nameInputIsValid, nameIsTouched)}
        type='text'
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        value={nameInput}
        minLength={2}
        maxLength={255}
        errorMessage={nameErrorMessage}
      />
      <TextInput
        label='Your Email'
        id='email'
        inputIsInvalid={inputIsInvalid(emailInputIsValid, emailIsTouched)}
        type='email'
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        value={emailInput}
        minLength={2}
        maxLength={255}
        errorMessage={emailErrorMessage}
      />
      <div className="form-actions">
        <button disabled={!(nameInputIsValid && emailInputIsValid)}>Submit</button>
      </div>
    </form >
  );
};

export default SimpleInput;