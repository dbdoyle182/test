import React from "react";
import StartUp from "./StartUp";
import { withAppContext } from "../withAppContext";

const modalLookup = {
  StartUp: StartUp
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
