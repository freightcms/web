import { ChangeEvent, FormEvent,useState } from "react";
import { FormFieldConfig, isInputConfig } from "./types";
import FormInput from "./form-input.component";

export interface FormProps {
  /**
   * Translation key to be used when changing from the translation key to the
   * visual representation of the screen text to the user
   */
  label: string;
  configs: Array<FormFieldConfig>;

  onSubmit(formValue: Record<string, any>): void;
}

const Form = ({label, configs, onSubmit}: FormProps) => {

  const [formValue, setFormValue] = useState({});

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formValue);
    return false;
  };

  const handleInputChanged = ({currentTarget: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (<form noValidate onSubmit={submitHandler}>
    <fieldset>
      <legend>{label}</legend>
      <ul>
        {configs.map((config) => (<li key={config.id}>
          {isInputConfig(config) ? (<FormInput {...config} onChange={handleInputChanged} />) : null}
      </li>))}
    </ul>
    </fieldset>
    <div>
      <input type="button" value="Cancel" />
      <input type="button" value="Create" />
    </div>
  </form>);
};

export default Form;
