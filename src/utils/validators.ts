interface Validators {
    name: RegExp;
    email: RegExp;
}

const validators: Validators = {
    name: /^\p{L}[\p{L}\.\s]*$/u,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
}

export default validators;