import { useRef, useState, ChangeEvent, ChangeEventHandler, FormEventHandler, FormEvent } from "react";

const BasicForm = () => {
  const [enteredName, setEnteredName] = useState<string>(""),
    lastNameInputRef = useRef<HTMLInputElement>(null),
    nameInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
      setEnteredName(event.target.value);

    },
    submitHandler: FormEventHandler<HTMLFormElement> = (event: FormEvent) => {
      event.preventDefault();
    };

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} />
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' ref={lastNameInputRef} />
        </div>
      </div>
      <div className='form-control'>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name' />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
