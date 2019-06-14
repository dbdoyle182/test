import React, { useState } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isAlphaNumeric
} from "revalidate";
import MessageSection from "./MessageSection";


const validate = combineValidators({
  authCode: isRequired("Confirmation Code"),
  password: composeValidators(isRequired, hasLengthGreaterThan(8), isAlphaNumeric)("Password")
});

const styles = {
    formNavigation: {
        display: "inline-block",
        color: "blue",
        textDecoration: "underline",
        margin: "1vw"
    }
}

const NewPasswordForm = ({
  error,
  formErrors,
  success,
  invalid,
  loading,
  switchForm,
  forgotPasswordSubmit,
  onSubmit
}) => {
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("")
  return (
    <Form
      onSubmit={(e, data) => {
        const newPassword = {
          password,
          authCode
        }
        onSubmit(newPassword, forgotPasswordSubmit, validate)
      }}
    >
      <MessageSection error={error} succes={success} formErrors={formErrors} />
      <Form.Input
        required
        value={authCode}
        onChange={(e, data) => setAuthCode(data.value)}
        name="authCode"
        type="number"
        placeholder="ex. 123456"
        label="Authorization Code"
      />
      <Form.Input
        required
        value={password}
        onChange={(e, data) => setPassword(data.value)}
        name="password"
        type="password"
        placeholder="****************"
        label="New Password"
      />
      <p style={styles.formNavigation} onClick={() => switchForm("signIn")}>Back to sign in</p>
      <Divider />
      <Button disabled={invalid} loading={loading} type="submit" color="green">
        Change Password
      </Button>
      <Button color="red" loading={loading} type="reset" onClick={() => {
          
          switchForm("signIn")
      }}>
        Cancel
      </Button> 
    </Form>
  );
  
}

export default NewPasswordForm;