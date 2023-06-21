export const nameInputValidator = (name: string) => {
    return /$[A-Za-z\.\s]+$/.test(name)
}