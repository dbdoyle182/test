import React from "react";
import StartUp from "./StartUp";
import UserOptions from "./UserOptions";
import RobotOptions from "./RobotOptions";
import { withAppContext } from "../withAppContext";

const modalLookup = {
  StartUp: StartUp,
  UserOptions: UserOptions,
  RobotOptions: RobotOptions
};


const ModalManager = (props) => {
  let renderedModal;

  if (props.modalType) {
    
    const ModalComponent = modalLookup[props.modalType];

    renderedModal = <ModalComponent {...props} />;
  }
  return <span>{renderedModal}</span>;
};

export default withAppContext(ModalManager);
