import React, { useState } from "react";
import { Form, Button, Label, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isAlphaNumeric,
  createValidator
} from "revalidate";
import { hasError } from "revalidate/assertions";


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
  invalid,
  loading,
  switchForm,
  forgotPasswordSubmit
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
        console.log(newPassword)
        // forgotPasswordSubmit(account.values)
      }}
    >
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
        onChange={(e, data) => setPassword(password)}
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