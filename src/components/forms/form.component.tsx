import { ChangeEvent, FormEvent, HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { useTranslation } from "react-i18next";

export interface FormFieldLabelConfig {

}

export interface FormFieldConfig {
  id: HTMLAttributes<HTMLElement>["id"],
  title: HTMLAttributes<HTMLElement>["title"],
  configType: "collection"|"input"
}

/**
 * Represents a configuration for when users whant to use a form with just an
 * input and label
 */
export interface FormInputFieldConfig extends FormFieldConfig {
  /**
   * Sets the type to specifically be just a label and input as the key value
   * pair
   */
  configType: "input";

  /**
   * Recommended property to link for accessability and will be used as part of
   * the form to access
   */
  inputName: HTMLInputElement["name"];

  /**
   * Type to set on the HTML Input
   */
  inputType: HTMLInputTypeAttribute;

  /**
   * Initial value the form can always reset to when the user wants to clear out
   * their changes
   */
  initialValue?: HTMLInputElement["value"];

  /**
   * Label should be the translation string that will be used in the
   * useTranslation web hook
   */
  label: string;
}

export interface FormProps {
  /**
   * Translation key to be used when changing from the translation key to the
   * visual representation of the screen text to the user
   */
  label: string;
  configs: Array<FormFieldConfig>;

  onSubmit(formValue: Record<string, any>): void;
}

function isInputConfig(config: FormFieldConfig): config is FormInputFieldConfig {
  return config.configType === "input";
}

const FormInput = (config: FormInputFieldConfig & {onChange: HTMLAttributes<HTMLInputElement>["onChange"]}) => (<>
    <label htmlFor={config.inputName} id={`${config.id}-label`}>{config.label}</label>
    <input id={config.id} name={config.inputName} value={config.initialValue} type={config.inputType} onChange={config.onChange} />
</>);

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
