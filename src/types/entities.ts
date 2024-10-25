import { Dispatch, SetStateAction } from "react";

export const inputStateDefaultValue = {
  value: "",
  isValid: undefined,
};

export type InputStateType = {
  value: string;
  isValid: undefined | boolean;
};

export type InputSetStateType = Dispatch<
  SetStateAction<{
    value: string;
    isValid: undefined | boolean;
  }>
>;

export interface Breed {
  _id: string;
  title: string;
  image: string;
}

export interface Parent {
  _id: string;
  name: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  video: string;
  birthDate: string;
  father: string;
  mother: string;
  sex: "male" | "female";
  code: string;
  breed: string;
  createdAt?:string

}
