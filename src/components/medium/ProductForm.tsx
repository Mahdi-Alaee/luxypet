import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SelectBox from "../small/SelectBox";
import TextBox from "../small/TextBox";
import GlobalForm from "./GlobalForm";
import {
  InputStateType,
  InputSetStateType,
  Breed,
  Parent,
} from "@/types/entities";
import {
  isDate,
  isImage,
  maxLength,
  minLength,
  mustNumber,
  required,
} from "@/validation/inputs/validation-rules";

interface ProductFromProps {
  formSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  breeds: Breed[];
  setBreeds: Dispatch<SetStateAction<Breed[]>>;
  parents: Parent[];
  setParents: Dispatch<SetStateAction<Parent[]>>;
  formTitle: string;
  title: InputStateType;
  setTitle: InputSetStateType;
  image: InputStateType;
  setImage: InputSetStateType;
  code: InputStateType;
  setCode: InputSetStateType;
  price: InputStateType;
  setPrice: InputSetStateType;
  video: InputStateType;
  setVideo: InputSetStateType;
  birthDate: InputStateType;
  setBirthDate: InputSetStateType;
  mother: InputStateType;
  setMother: InputSetStateType;
  father: InputStateType;
  setFather: InputSetStateType;
  sex: InputStateType;
  setSex: InputSetStateType;
  breed: InputStateType;
  setBreed: InputSetStateType;
  soldOut?: boolean;
  setSoldOut?: Dispatch<SetStateAction<boolean>>;
}

export default function ProductFrom({
  formSubmit,
  loading,
  breeds,
  setBreeds,
  parents,
  setParents,
  formTitle,
  birthDate,
  breed,
  code,
  father,
  image,
  mother,
  price,
  sex,
  title,
  video,
  setBirthDate,
  setBreed,
  setCode,
  setFather,
  setImage,
  setMother,
  setPrice,
  setSex,
  setTitle,
  setVideo,
  soldOut,
  setSoldOut,
}: ProductFromProps) {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      !!title.isValid &&
        !!image.isValid &&
        !!code.isValid &&
        !!price.isValid &&
        !!video.isValid &&
        !!birthDate.isValid &&
        !!mother.isValid &&
        !!father.isValid &&
        !!sex.isValid &&
        !!breed.isValid
    );
  }, [title, image, code, price, video, birthDate, mother, father, sex, breed]);

  useEffect(() => {
    getParents();
    getBreeds();
  }, []);

  const getParents = async () => {
    const res = await (
      await fetch((process?.env?.URL || "") + "/api/parent")
    ).json();
    if (res.ok) setParents(res.data);
  };

  const getBreeds = async () => {
    const res = await (
      await fetch((process?.env?.URL || "") + "/api/breed")
    ).json();
    if (res.ok) setBreeds(res.data);
  };

  return (
    <GlobalForm
      formSubmit={formSubmit}
      isFormValid={isFormValid}
      loading={loading}
      title={formTitle}
    >
      <TextBox
        state={title}
        setState={setTitle}
        placeholder="عنوان محصول"
        validationRules={[required(), minLength(4), maxLength(50)]}
      />
      <SelectBox
        defaultItemText="نژاد را انتخاب کنید ..."
        items={breeds}
        state={breed}
        setState={setBreed}
        optionPropName="title"
      />
      <TextBox
        state={code}
        setState={setCode}
        placeholder="کد"
        validationRules={[required(), minLength(4), maxLength(25)]}
      />
      <TextBox
        state={price}
        setState={setPrice}
        placeholder="قیمت"
        validationRules={[required(), mustNumber()]}
        inputDir="ltr"
      />
      <TextBox
        state={image}
        setState={setImage}
        placeholder="(test.jpg) نام تصویر + پسوند"
        inputDir="ltr"
        validationRules={[required(), isImage()]}
      />
      <TextBox
        state={video}
        setState={setVideo}
        placeholder="لینک ویدئو"
        inputDir="ltr"
        validationRules={[required()]}
      />
      <TextBox
        state={birthDate}
        setState={setBirthDate}
        placeholder="تاریخ تولد (1402/02/16)"
        inputDir="ltr"
        validationRules={[required(), isDate()]}
      />
      <SelectBox
        items={parents}
        defaultItemText="مادر توله را انتخاب کن ..."
        optionPropName="name"
        state={mother}
        setState={setMother}
      />
      <SelectBox
        items={parents}
        defaultItemText="پدر توله را انتخاب کن ..."
        optionPropName="name"
        state={father}
        setState={setFather}
      />
      <SelectBox
        items={[
          { _id: "male", name: "نر" },
          { _id: "female", name: "ماده" },
        ]}
        defaultItemText="جنسیت توله را انتخاب کن ..."
        optionPropName="name"
        state={sex}
        setState={setSex}
      />
      {
        soldOut !== undefined && setSoldOut && (
      <label className="flex items-center gap-x-1 text-white">
        فروخته شده{" "}
        <input
          type="checkbox"
          checked={soldOut}
          onChange={(e) => setSoldOut(e.target.checked)}
        />
      </label>
        )
      }
    </GlobalForm>
  );
}
