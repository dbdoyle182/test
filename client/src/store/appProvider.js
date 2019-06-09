import React, { Component } from 'react';
import ModalManager from "./modals/ModalManager";
// AWS Resource imports
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';
import Cache from "@aws-amplify/cache";
import axios from "axios";
import Amplify from "@aws-amplify/core";
import awsmobile from "../aws-exports";
Amplify.configure(awsmobile)
// Create a new context for the app
export const AppContext = React.createContext('app');

// Creates a provider/context component
class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalType: "",
      modalVisible: false,
      modalInfo: {},
      username: "dbdoyle"
    };
  }

  // on page mount
  componentDidMount () {
    if (!this.getlocalStorage("welcome")) {
      this.setModalVisible("StartUp");
    }
  }

  // Modal Manager, basically allows for consistent Modal management whether it be if it is showing or if needing to specify type
  setModalVisible = (modal, modalInfo) => {
      this.setState({
        modalType: modal,
        modalVisible: true,
        modalInfo: {}
      });
  };

  // Does what the name says, closes the modal
  closeModal = () => {
    this.setState({ modalVisible: false }, () => {
      console.log(this.state.modalVisible)
    });
  };

  // Sets item in sessionStorage
  setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value)
  }

  // Gets item from sessionStorage
  getSessionStorage = (key) => {
    return sessionStorage.getItem(key)
  }

  // Sets item in localStorage
  setlocalStorage = (key, value) => {
    localStorage.setItem(key, value)
  }

  // Gets item from localStorage
  getlocalStorage = (key) => {
    return localStorage.getItem(key)
  }

  // Set an item in global state
  setGlobalState = (key, value) => {
    this.setState({
      [key]:value
    })
  }

  // Submit add robot form 
  addRobot = (name, type, successHandle, errorHandle) => {
    const { username } = this.state;
    axios({
      method: "POST",
      url: "/api/robot",
      data: {
        name, 
        type,
        owner: username
      }
    }).then(response => {
      successHandle(response)
    }).catch(err => {
      errorHandle(err)
    })
  }

  // Find user by username
  findUser = (username) => {
    axios({
      method: "GET",
      url: `/api/users?username=${username}`
    }).then(response => {
      console.log(response)
      this.setState({
        userData: response.data.Item
      }, () => {
        this.closeModal();
      })
    }).catch(err => {
      console.log(err)
    })
  }
  

  render() {
    return (
      // Higher order component that wraps any components that need the above states and functions
      <AppContext.Provider
        value={{
          ...this.state,
          closeModal: this.closeModal,
          setModalVisible: this.setModalVisible,
          setSessionStorage: this.setSessionStorage,
          getSessionStorage: this.getSessionStorage,
          setLocalStorage: this.setLocalStorage,
          getLocalStorage: this.getLocalStorage,
          addRobot: this.addRobot,
          setGlobalState: this.setGlobalState,
          findUser: this.findUser
        }}
      >
        <ModalManager
          closeModal={this.closeModal}
          modalVisible={this.state.modalVisible}
          modalType={this.state.modalType}
          modalInfo={this.state.modalInfo}
          setModalVisible={this.setModalVisible}
        />
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
