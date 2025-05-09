import { HTMLAttributes } from "react";
import { FormInputFieldConfig } from "./types";

const FormInput = (config: FormInputFieldConfig & {onChange: HTMLAttributes<HTMLInputElement>["onChange"]}) => (<>
    <label htmlFor={config.inputName} id={`${config.id}-label`}>{config.label}</label>
    <input id={config.id} name={config.inputName} value={config.initialValue} type={config.inputType} onChange={config.onChange} />
</>);

export default FormInput;
