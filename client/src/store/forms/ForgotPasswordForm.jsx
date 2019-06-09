import React, {useState} from "react";
import { Form, Button, Label, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired
} from "revalidate";
import { hasError } from "revalidate/assertions";


const validate = combineValidators({
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

const ForgotPasswordForm = ({
  error,
  invalid,
  loading,
  switchForm,
  forgotPassword
}) => {
  const [username, setUsername] = useState("");
  return (
    <Form
      onSubmit={(e, data) => {
        const forgotValues = {
          username
        }
        console.log(forgotValues)
        // forgotPassword(account.values)
      }}
    >
      <Form.Input
        required
        value={username}
        onChange={(e, data) => setUsername(data.value)}
        name="username"
        type="text"
        placeholder="robotman123"
        label="Username"
      />
      <p style={styles.formNavigation} onClick={() => switchForm("signIn")}>Back to sign in</p>
      <Divider />
         
      <Button disabled={invalid} loading={loading} type="submit" color="green">
        Submit 
      </Button>
      <Button color="red" loading={loading} type="reset" onClick={() => {
          switchForm("signIn")
      }}>
        Cancel
      </Button>
          
    </Form>
  );
}




export default ForgotPasswordForm;