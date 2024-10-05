export const required = () => ({ rule: "REQUIRED" });
export const minLength = (value: number) => ({ rule: "MIN_LENGTH", value });
export const maxLength = (value: number) => ({ rule: "MAX_LENGTH", value });
