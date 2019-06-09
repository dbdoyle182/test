import React, { useState } from "react";
import { Form, Button, Divider } from "semantic-ui-react";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isAlphaNumeric,
  hasLengthBetween,
  isNumeric,
  matchesField
} from "revalidate";
import _ from "lodash";
import MessageSection from "./MessageSection";


const validate = combineValidators({
  name: isRequired("Full name"),
  phoneNumber: composeValidators(isRequired, isNumeric, hasLengthBetween(10, 10)({ message: "Phone number must be 10 characters long"}))("Phone Number"),
  username: isRequired("username"),
  password: composeValidators(isRequired, isAlphaNumeric, hasLengthGreaterThan(8))("Password"),
  password2: composeValidators(isRequired, matchesField('password', "Password"))("Confirm Password")
});

const styles = {
  formNavigation: {
      display: "inline-block",
      color: "blue",
      textDecoration: "underline",
      margin: "1vw"
  }
};

const SignUpForm = ({
  error,
  loading,
  success,
  formErrors,
  invalid,
  switchForm,
  signUp,
  onSubmit
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  return (
    <Form
      error={error || !_.isEmpty(formErrors)}
      success={success}
      loading={loading}
      onSubmit={(e, data) => {
        
        const signUpValues = {
          name,
          username,
          phoneNumber,
          password,
          password2
        }
        
        onSubmit(signUpValues, signUp, validate);
        
      }}
    >
      <MessageSection error={error} success={success} formErrors={formErrors} />
      <Form.Input
        required
        value={name}
        onChange={(e, data) => setName(data.value)}
        name="name"
        type="text"
        placeholder="ex. Jane Doe"
        label="Name"
      />
      <Form.Input
        required
        value={username}
        onChange={(e, data) => setUsername(data.value)}
        name="username"
        type="username"
        placeholder="robotman123"
        label="Username"
      />
      <Form.Input
        required
        value={phoneNumber}
        onChange={(e, data) => setPhoneNumber(data.value)}
        name="phoneNumber"
        type="tel"
        placeholder="##########"
        label="Phone Number"
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
      <Form.Input
        required
        value={password2}
        onChange={(e, data) => setPassword2(data.value)}
        name="password2"
        type="password"
        placeholder="****************"
        label="Confirm Password"
      />
      <p style={styles.formNavigation} onClick={() => switchForm("challenge")}>Confirm Account?</p>
      <Divider />
      <Button disabled={invalid} loading={loading} color="green" type="submit">
        Sign Up
      </Button>
      <Button color="red" loading={loading} type="reset" onClick={() => {
        console.log("reset")
      }}>
        Cancel
      </Button>
    </Form>
  );
}


export default SignUpForm;
