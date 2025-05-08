import "./pages.css";
import { ChangeEvent, FormEvent, useState } from "react";

const LoginPage = () => {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    console.debug(event);
  };

  const handleFormValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      [event.currentTarget.name]: event.currentTarget.value,
    }));
  };

  return (
    <form className="login-form" onSubmit={submitHandler} noValidate>
      <fieldset>
        <legend>Login</legend>
        <ul>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValue["email"]}
              onChange={handleFormValueChanged}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password-"
              name="password"
              value={formValue["password"]}
              onChange={handleFormValueChanged}
            />
          </li>
        </ul>
      </fieldset>
      <div>
        <button>Cancel</button>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default LoginPage;
