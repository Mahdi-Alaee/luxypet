export interface ValidationRule {
  rule:
    | "REQUIRED"
    | "MIN_LENGTH"
    | "MAX_LENGTH"
    | "COUNT"
    | "EMAIL"
    | "THE_SAME_AS"
    | "MUST_NUMBER"
    | "IS_IMAGE"
    | "IS_DATE";
  validationValue?: number | string;
}

export const required = () => ({ rule: "REQUIRED" } as ValidationRule);

export const minLength = (validationValue: number) =>
  ({
    rule: "MIN_LENGTH",
    validationValue,
  } as ValidationRule);

export const maxLength = (validationValue: number) =>
  ({
    rule: "MAX_LENGTH",
    validationValue,
  } as ValidationRule);

export const fieldCount = (validationValue: number) =>
  ({
    rule: "COUNT",
    validationValue,
  } as ValidationRule);

export const isEmail = () =>
  ({
    rule: "EMAIL",
  } as ValidationRule);

export const theSameAs = (validationValue: string) =>
  ({
    rule: "THE_SAME_AS",
    validationValue,
  } as ValidationRule);

export const mustNumber = () =>
  ({
    rule: "MUST_NUMBER",
  } as ValidationRule);

export const isImage = () =>
  ({
    rule: "IS_IMAGE",
  } as ValidationRule);

export const isDate = () =>
  ({
    rule: "IS_DATE",
  } as ValidationRule);

// ! validate
export default function validate(
  value: string | number,
  validationRules: ValidationRule[]
) {
  const messages: string[] = [];
  for (const type of validationRules) {
    if (messages.length < 1) {
      switch (type.rule) {
        case "REQUIRED":
          if (value.toString().length < 1) {
            messages.push("پر کردن این فیلد ضروری میباشد");
          }
          break;
        case "MIN_LENGTH":
          if (value.toString().length < Number(type.validationValue)) {
            messages.push(
              `طول این فیلد نباید کمتر از ${type.validationValue} باشد!`
            );
          }
          break;
        case "MAX_LENGTH":
          if (value.toString().length > Number(type.validationValue)) {
            messages.push(
              `طول این فیلد نباید بیشتر از ${type.validationValue} باشد!`
            );
          }
          break;
        case "COUNT":
          if (value.toString().length !== Number(type.validationValue)) {
            messages.push(`این فیلد باید حاوی 11 کاراکتر باشد`);
          }
          break;
        case "EMAIL":
          const regex = new RegExp("^[a-zA-Z0-9._%+-]+@gmail.com$", "i");

          if (!regex.test(value.toString())) {
            messages.push(`ایمیل نامعتبر است!`);
          }
          break;
        case "THE_SAME_AS":
          if (value !== type.validationValue) {
            messages.push(`معتبر نیست!`);
          }
          break;
        case "MUST_NUMBER":
          if (isNaN(value as number)) {
            messages.push(`این فیلد باید از اعداد تشکیل شده باشد!`);
          }
          break;
        case "IS_IMAGE": {
          const regex = new RegExp(
            "^[a-zA-Z0-9_-]+.(jpg|jpeg|png|gif|bmp|webp|svg)$",
            "i"
          );

          if (!regex.test(value.toString())) {
            messages.push(`فایل نامعتبر است!`);
          }
          break;
        }
        case "IS_DATE": {
          const regex = new RegExp(
            "^(13|14)[0-9]{2}\/(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])$",
            "i"
          );

          if (!regex.test(value.toString())) {
            messages.push(`تاریخ نامعتبر است!`);
          }
          break;
        }
      }
    }
  }

  return messages;
}
