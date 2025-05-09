import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { FormInputFieldConfig } from "./types";

const FormInput = (config: FormInputFieldConfig & {onChange: HTMLAttributes<HTMLInputElement>["onChange"]}) => {
  const [translation, i18, ready] = useTranslation();

  return (<>
      <label htmlFor={config.inputName} id={`${config.id}-label`}>{translation(config.label)}</label>
      <input id={config.id} name={config.inputName} value={config.initialValue} type={config.inputType} onChange={config.onChange} />
  </>)
};

export default FormInput;
