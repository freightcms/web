import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { DisplayApolloError, LoadingSpinner, Form, FormFieldConfig } from "../../components";
import { useForm } from "../../hooks";

const CREATE_CARRIER_QL = gql`
  mutation CreateCarrier($name: String!, $dba: String!) {
    createCarrier(name: $name, dba: $dba) {
      id
    }
  }
`;

const configs: Array<FormFieldConfig> = [{
  label: "forms.carriers.new.name.label",
  id: "carrier-name",
  inputName: "name",
  configType: "input",
  inputType: "text",
  title: undefined,
}]

const CreateCarrierPage = () => {
  const {} = useMutation(CREATE_CARRIER_QL, {
    variables: {},
  });

 // const {loading, error, data} = useForm("Carriers.Create");

 // if (error) {
 //   return <DisplayApolloError {...error} />
 // }
 // if (loading) {
 //   return (<LoadingSpinner />);
 // }

  return <Form label="forms.carriers.new.title" configs={configs} onSubmit={(value) => {
    console.debug(value);
  }}/>
};

export { CreateCarrierPage };
