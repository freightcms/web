import { HTMLInputTypeAttribute } from "react";

export interface FormFieldConfig {
  id: string;
  name: string;
  inputType: HTMLInputTypeAttribute;
  childElements: FormFieldConfig[];
}

export interface FormProps {

}

const Form = () => {
  return (<form>

  </form>);
};

export default Form;
