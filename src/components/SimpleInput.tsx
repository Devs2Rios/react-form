import { useState, ChangeEventHandler, FormEventHandler, FormEvent, ChangeEvent } from "react";
import { nameInputValidator } from "@/utils/validators";

const SimpleInput = () => {
  const [nameInput, setNameInput] = useState<string>(''),
    [nameInputIsValid, setNameInputIsValid] = useState<boolean>(false),
    handleNameChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
      setNameInput(event.target?.value);
      setNameInputIsValid(nameInputValidator(event.target?.value));
    },
    submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
      event.preventDefault();
      if (!nameInput.trim()) {
        alert('Please enter a name');
        return;
      }
      console.log(nameInput);
    };

  return (
    <form onSubmit={submitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={handleNameChange}
          value={nameInput}
        />
        {nameInputIsValid && <p className="error-text"></p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
