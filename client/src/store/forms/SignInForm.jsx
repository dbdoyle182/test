import React, { useState } from "react";
import { Form, Button, Label, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired
} from "revalidate";
import MessageSection from "./MessageSection";

const validate = combineValidators({
  username: isRequired("Username"),
  password: isRequired("Password")
});

const styles = {
    formNavigation: {
        display: "inline-block",
        color: "blue",
        textDecoration: "underline",
        margin: "1vw"
    }
};

const SignInForm = ({
  error,
  success,
  formErrors,
  invalid,
  loading,
  switchForm,
  signIn,
  onSubmit
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form
      onSubmit={(e, data) => {
        const signInValues = {
          username,
          password
        }
        onSubmit(signInValues, signIn, validate)
      }}
    >
      <MessageSection error={error} formErrors={formErrors} success={success} />
      <Form.Input
        required
        value={username}
        onChange={(e, data) => setUsername(data.value)}
        name="username"
        type="text"
        placeholder="robotman123"
        label="Username"
      />
      <Form.Input
        required
        value={password}
        onChange={(e, data) => setPassword(data.value)}
        name="password"
        type="password"
        placeholder="****************"
        label="Password"
      />
      <p style={styles.formNavigation} onClick={() => switchForm("forgotPw")}>Forgot password?</p>
      <Divider />
      <Button style={{ float: "right"}} disabled={invalid} loading={loading} type="submit" color="green">
          Sign In
      </Button>
    </Form>
  );
}


export default SignInForm;