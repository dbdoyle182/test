import React, { useState } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired
} from "revalidate";
import MessageSection from "./MessageSection";



const validate = combineValidators({
  authCode: isRequired("Confirmation Code"),
  username: isRequired("Username")
});

const styles = {
    formNavigation: {
        display: "inline-block",
        color: "blue",
        textDecoration: "underline",
        margin: "1vw"
    }
}

const ChallengeForm = ({
  error,
  success,
  invalid,
  loading,
  formErrors,
  signIn,
  switchForm,
  resendCode,
  confirmSignUp,
  onSubmit,
  setUsernameGlobal
}) => {
  const [authCode, setAuthCode] = useState("");
  const [username, setUsername] = useState("");
  return (
    <Form
      onSubmit={(e, data) => {
        const challengeValues = {
          authCode
        }
        if (signIn) {
          // MFA options placeholder
        } else {
            onSubmit(challengeValues, confirmSignUp, validate)
        }
      }}
      error={error}
      success={success}
    >
      <MessageSection error={error} success={success} formErrors={formErrors} />
      <Form.Input
        required
        name="username"
        type="text"
        onChange={(e, data) => {
          setUsername(data.value)
          setUsernameGlobal(data.value)
        }}
        placeholder="ex. robotman123"
        label="Username"
        value={username}
      />
      <Form.Input
        required
        name="authCode"
        type="number"
        onChange={(e, data) => setAuthCode(data.value)}
        placeholder="ex. 123456"
        label="Authorization Code"
        value={authCode}
      />
      <span><p onClick={() => switchForm("signIn")} style={styles.formNavigation}>Back to sign in</p><p style={styles.formNavigation} onClick={resendCode}>Resend Code?</p></span>
      
      <Divider />
         
      <Button disabled={invalid} loading={loading} type="submit" color="green">
        Confirm
      </Button> 
    </Form>
  );
}



export default ChallengeForm;