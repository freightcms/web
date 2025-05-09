import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { Form } from "../../components/forms";
import { useForm } from "../../hooks";

const CREATE_CARRIER_QL = gql`
  mutation CreateCarrier($name: String!, $dba: String!) {
    createCarrier(name: $name, dba: $dba) {
      id
    }
  }
`;

const CreateCarrierPage = () => {
  const [formValue, setFormValue] = useState({
    name: undefined,
    dba: undefined,
    isActive: false,
  });

  const {} = useMutation(CREATE_CARRIER_QL, {
    variables: {
      name: formValue.name,
      dba: formValue.dba,
      isActive: formValue.isActive,
    },
  });

  const {loading, error, data} = useForm("Carriers.Create");

  console.debug("data", data);

  return <Form label="forms.carriers.new.title" configs={[]} onSubmit={(value) => {
    console.debug(value);
  }}/>
};

export { CreateCarrierPage };
