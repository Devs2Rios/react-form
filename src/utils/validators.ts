export const nameInputValidator = (name: string) => {
    // eslint-disable-next-line no-useless-escape
    return /^\p{L}[\p{L}\.\s]*$/u.test(name);
}
export const emailInputValidator = (email: string) => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(email);
}
