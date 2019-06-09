import React, { useState } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired
} from "revalidate";
import MessageSection from "./MessageSection";



const validate = combineValidators({
  authCode: isRequired("Confirmation Code")
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
  onSubmit
}) => {
  const [authCode, setAuthCode] = useState("");
  return (
    <Form
      onSubmit={(e, data) => {
        const challengeValues = {
          authCode
        }
        if (signIn) {
            console.log("MFA")
        } else {
            onSubmit(challengeValues, confirmSignUp, validate)
            console.log("Confirmation Code")
        }
      }}
    >
      <MessageSection error={error} success={success} formErrors={formErrors} />
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
      <Button color="red" loading={loading} type="reset" onClick={() => { 
        console.log("reset")
      }}>
        Cancel
      </Button>
          
    </Form>
  );
}



export default ChallengeForm;