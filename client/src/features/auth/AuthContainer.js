import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Auth from "@aws-amplify/auth";
import axios from "axios";
import _ from "lodash";
import { withAppContext } from "../../store/withAppContext";
import SignInForm from "../../store/forms/SignInForm";
import SignUpForm from "../../store/forms/SignUpForm";
import ForgotPasswordForm from "../../store/forms/ForgotPasswordForm";
import NewPasswordForm from "../../store/forms/NewPasswordForm";
import ChallengeForm from "../../store/forms/ChallengeForm";

const styles = {
    landingFormContainer: {
        backgroundColor: "white",
        padding: "15px",
        marginTop: "5vh"
    },
    tab: {
        textAlign: "center"
    },
    outerTab: {
        backgroundColor: "lightgrey"
    },
    formSection: {
        marginTop: "3vh"
    }
}


class AuthContainer extends Component {
    state = {
        method: "signIn",
        loading: false,
        username: ""
    }

    errorHandle = (err) => {
        console.log(err);
        if (!err.message) {
            this.setState({
                error: err,
                loading: false
            })
          } else {
            this.setState({
                error: err.message,
                loading: false
            })
          }
    }

    setUsername = (username) => {
      this.setState({
        username
      })
    }

    signUp = async (account) => {
        const { name, password, username, phoneNumber } = account;
        // rename variable to conform with Amplify Auth field phone attribute
        const phone_number = `+1${phoneNumber}`;
        if (process.env.NODE_ENV === "development") {
          axios({
            method: "POST",
            url: "/api/users",
            data: account
          }).then((response) => {
            this.setState({
              loading: false,
              method: "signIn"
            })
          })
          .catch(this.errorHandle)
        } else {
          await Auth.signUp({
            username,
            password,
            attributes: { phone_number, name }
          })
          .then((response) => {
            this.setState({
              loading: false,
              username,
              method: "challenge"
            })
          })
          .catch(this.errorHandle)
        }
      }
      
      // Confirm users and redirect them to the SignIn page
      confirmSignUp = async (account) => {
        const { authCode } = account;
        this.setState({
          loading: true
        })
        await Auth.confirmSignUp(this.state.username, authCode)
        .then(() => {
          
            this.setState({
                method: "signIn",
                loading: false
            })
        })
        .catch(this.errorHandle)
      }
      
      // Resend code if not received already
      resendSignUp = async () => {
        await Auth.resendSignUp(this.state.username)
        .then((response) => {  
        })
        .catch(this.errorHandle)
      }

    signIn = async (account) => {
      const { setGlobalState, findUser } = this.props.context;
      const { username, password } = account;

      if (process.env.NODE_ENV === "development") {
        findUser(username)
        this.setState({
          loading: false
        })
      } else {
        await Auth.signIn(username, password)
        .then(user => {
          if (user.challengeName === "SMS_MFA") {
            this.setState({ user, loading: false });
          } else {
            this.setState({ user, loading: false });
            setGlobalState("user", user);
            findUser(user.username);
          }
          
        })
        .catch(err => {
          this.errorHandle(err);
        })
      }
    }

    confirmChallenge = (user, code) => {
      
      Auth.confirmSignIn(user, code, "SMS_MFA").then(user => {
        
        this.setState({ user });
            
        
      }).catch(err => {
        if (!err.message) {
          console.log('Error when signing in: ', err)
         
        } else {
          console.log('Error when signing in: ', err.message)
          
        }
      })
    }
    forgotPassword = async (account) => {
        const { username } = account;
        await Auth.forgotPassword(username)
        .then(data => {
          console.log('New code sent', data)
        //   toastr.success('New code sent to:', data.CodeDeliveryDetails.Destination)
          this.setState({
              username,
              method: "newPw",
              loading: false
          })
        })
        .catch(err => {
          this.errorHandle(err)
        })
      }
      
      // Upon confirmation redirect the user to the Sign In page
      forgotPasswordSubmit = async (account) => {
        this.setState({
            loading: true
        })
        const { username } = this.state;
        const { authCode, password } = account;
        await Auth.forgotPasswordSubmit(username, authCode, password)
        .then(() => {
          console.log('The new password submitted successfully')
          this.setState({
              method: "signIn"
          })
        })
        .catch(err => {
          if (! err.message) {
            console.log('Error while confirming the new password: ', err)
            this.setState({
                loading: false
            })
          } else {
            console.log('Error while confirming the new password: ', err.message)
            this.setState({
                loading: false
            })
          }
        })
      }

    switchForm = (formType) => {
        this.setState({
            method: formType,
            error: null
        })
    }

    onSubmit = (values, submitFunc, validate) => {
      this.setState({
        loading: true
      })
      const formErrors = validate(values);
        if (_.isEmpty(formErrors)) {
          this.setState({
            formErrors
          })
          submitFunc(values);
        } else {
          this.setState({
            loading: false,
            formErrors
          })
        }
    }

    renderForm = () => {
        const { loading, error, success, formErrors } = this.state;
        switch (this.state.method) {
            case "signUp":
                return <SignUpForm loading={loading} error={error} success={success} formErrors={formErrors} signUp={this.signUp} switchForm={this.switchForm} onSubmit={this.onSubmit} />;
            case "forgotPw":
                return <ForgotPasswordForm loading={loading} error={error} success={success} formErrors={formErrors} forgotPassword={this.forgotPassword} switchForm={this.switchForm} onSubmit={this.onSubmit}/>;
            case "newPw":
                return <NewPasswordForm loading={loading} error={error} success={success} formErrors={formErrors} forgotPasswordSubmit={this.forgotPasswordSubmit} switchForm={this.switchForm} onSubmit={this.onSubmit}/>;
            case "challenge":
                return <ChallengeForm loading={loading} error={error} success={success} formErrors={formErrors} resendCode={this.resendSignUp} confirmSignUp={this.confirmSignUp} confirmChallenge={this.confirmChallenge} switchForm={this.switchForm} onSubmit={this.onSubmit} setUsernameGlobal={this.setUsername}/>;
            default: 
                return <SignInForm loading={loading} error={error} success={success} formErrors={formErrors} signIn={this.signIn} switchForm={this.switchForm} onSubmit={this.onSubmit} />;
                
        }
    }

    


    render () {
        const { method } = this.state;
        return (
            <Grid>
                <Grid.Column style={styles.landingFormContainer} width={16}>
                {(method === "signIn" || method === "signUp") && <Grid.Row>
                    <Grid columns={2}>
                        <Grid.Column style={method === "signIn" ? {} : styles.outerTab} onClick={() => this.setState({ method: "signIn"})}>
                            <p style={styles.tab}>Sign In</p>
                        </Grid.Column>
                        <Grid.Column style={method === "signUp" ? {} : styles.outerTab} onClick={() => this.setState({ method: "signUp"})}>
                            <p style={styles.tab}>Sign Up</p>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>}
                <section style={styles.formSection}>{this.renderForm()}</section>
                
                </Grid.Column>
            </Grid>
        )
    }
}

export default withAppContext(AuthContainer);