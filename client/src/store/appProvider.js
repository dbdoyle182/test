import React, { Component } from 'react';
import ModalManager from "./modals/ModalManager";
// AWS Resource imports
import API from '@aws-amplify/api';
import _ from "lodash";
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
      userData: {}
    };
  }

  // on page mount
  componentDidMount () {
    this.findAllRobots();
    this.findWildRobots();
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user)
      this.findUser(user.username)
    }).catch(err => {
      
      this.setModalVisible("StartUp")
    })
  }

  // Modal Manager, basically allows for consistent Modal management whether it be if it is showing or if needing to specify type
  setModalVisible = (modal, modalInfo = {}) => {
      this.setState({
        modalType: modal,
        modalVisible: true,
        modalInfo: modalInfo
      });
  };

  // Does what the name says, closes the modal
  closeModal = () => {
    this.setState({ modalVisible: false, modalInfo: {} }, () => {
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
    const { userData } = this.state;
    axios({
      method: "POST",
      url: "/api/robot",
      data: {
        name, 
        type,
        owner: userData.username
      }
    }).then(response => {
        successHandle(response)
        if (response.data.data) {
          console.log(response.data.data.Attributes)
          this.setState({
            userData: response.data.data.Attributes
          }, () => {
            this.findRobots();
          });
          
        } else {
          console.log(response)
          this.findWildRobots();
          this.findAllRobots();
        }
        
      
    }).catch(err => {
      errorHandle(err)
    })
  }

  // Find robots by username 
  findRobots = () => {
    const { userData } = this.state;
    axios({
      method: "GET",
      url: `/api/robot/user?owner=${userData.username}`
    }).then(response => {
      this.setState({
        robots: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  // Find robot by id
  findRobotById = (robotId, callback) => {
    axios({
      method: "GET",
      url: `/api/robot?robotId=${robotId}`
    }).then(response => {
      callback(response.data);
    }).catch(err => {
      console.log(err);
    })
  }

  // findAllRobots
  findAllRobots = () => {
    axios({
      method: "GET",
      url: `/api/robot/all`
    }).then(response => {
      console.log(response.data)
      this.setState({
        allRobots: response.data,
        sortedRobots: response.data.sort((a, b) => (a.experience > b.experience) ? 1 : -1)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  // Find wild robots

  findWildRobots = () => {
    axios({
      method: "GET",
      url: `/api/robot/user?owner=wild`
    }).then(response => {
      this.setState({
        wildRobots: response.data
      })
    }).catch(err => {
      console.log(err)
    })
  }

  // Delete a robot
  deleteRobot = (robot) => {
    axios({
      method: "DELETE",
      url: "/api/robot",
      data: {
        robot,
        user: this.state.userData
      }
    }).then(response => {
      this.findAllRobots();
      this.findUser(this.state.userData.username);
    }).catch(err => {
      console.log(err);
    })
  }

  // Find user by username
  findUser = (username) => {
    axios({
      method: "GET",
      url: `/api/users?username=${username}`
    }).then(response => {
      if (_.isEmpty(response.data)) {
        this.setModalVisible("StartUp");
        return
      } else {
        this.setState({
          userData: response.data.Item
        }, () => {
          this.findRobots();
          this.closeModal();
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  // Update user account
  updateUser = (values, callback) => {
    const { userData } = this.state;
    axios({
      method: "PUT",
      url: `/api/users`,
      data: {
        data: values,
        username: userData.username
      }
    }).then(response => {
      console.log(response)
      this.setState({
        userData: response.data.data.Attributes
      }, () => {
        this.closeModal();
      })
    }).catch(err => {
      callback(err)
    })
  }

  // Select a task to complete
  startTask = (task, robot, callback) => {
    
  };

  // Add task to queue
  addTaskToQueue = (task, robot, callback) => {
    axios({
      method: "PUT",
      url: "/api/tasks",
      data: {
        task,
        robot
      }
    }).then(response => {
      callback(response)
    }).catch(err => {
      console.log(err)
    })
  }

  // Remove task from robot queue
  removeTaskFromQueue = (task, robot, callback) => {
    axios({
      method: "DELETE",
      url: "/api/tasks",
      data: {
        task,
        robot
      }
    }).then(response => {
      callback(response)
    }).catch(err => {
      console.log(err)
    })
  }

  sortLeaderBoard = () => {

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
          findUser: this.findUser,
          updateUser: this.updateUser,
          findRobots: this.findRobots,
          findRobotById: this.findRobotById,
          findAllRobots: this.findAllRobots,
          findWildRobots: this.findWildRobots,
          deleteRobot: this.deleteRobot,
          startTask: this.startTask,
          addTaskToQueue: this.addTaskToQueue,
          removeTaskFromQueue: this.removeTaskFromQueue
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
