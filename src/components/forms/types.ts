import { HTMLAttributes, HTMLInputTypeAttribute } from "react";

export interface FormFieldConfigBase {
  id: HTMLAttributes<HTMLElement>["id"];
  title?: HTMLAttributes<HTMLElement>["title"];
  configType: "collection" | "input";
}

/**
 * Represents a configuration for when users whant to use a form with just an
 * input and label
 */
export interface FormInputFieldConfig extends FormFieldConfigBase {
  /**
   * Label should be the translation string that will be used in the
   * useTranslation web hook
   */
  label: string;

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
}

export type FormFieldConfig = FormInputFieldConfig;

export function isInputConfig(
  config: FormFieldConfig,
): config is FormInputFieldConfig {
  return config.configType === "input";
}
