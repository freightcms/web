import { gql, useMutation } from "@apollo/client";
import { FormEvent, FormEventHandler, useState } from "react";

const CREATE_CARRIER_QL = gql`mutation CreateCarrier($name: String!, $dba: String!) {
  createCarrier(name: $name, dba: $dba) {
    id
  }
}`;

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
    }
  });

  const handleFormChanged = (fieldName: string, value: number|boolean|string|undefined) => {
    setFormValue((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.debug("submitting form");

    return false;
  }

  return (<form onSubmit={handleSubmit}>
    <div className="input-group-inline">
      <label htmlFor="name">Name</label>
      <input name="name"
        type="text"
        value={formValue.name}
        maxLength={300}
        minLength={1}
        required
        onChange={(event) => handleFormChanged('name', event.currentTarget.value)} />
    </div>
    <div className="input-group-inline">
      <label title="doing business as" htmlFor="dba">DBA</label>
      <input name="dba"
        type="text"
        value={formValue.dba}
        maxLength={300}
        minLength={1}
        required
        onChange={(event) => handleFormChanged('dba', event.currentTarget.value)} />
    </div>
    <div className="input-group-inine">
      <label htmlFor="isActive">Set as Active</label>
      <input name="isACtive"
        type="checkbox"
        checked={formValue.isActive}
        onChange={(event) => handleFormChanged('isActive', event.currentTarget.checked)} />
    </div>
    <div>
      <input type="button" value="Cancel" />
      <input type="submit" value="Create" />
    </div>
  </form>);
};

export {CreateCarrierPage}
