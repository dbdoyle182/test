import React, { useState } from "react";
import { Modal, Button, Grid } from "semantic-ui-react";
import RobotForm from "../forms/RobotForm";


const RobotOptions = ({ modalVisible, closeModal, modalInfo }) => {
    const { name } = modalInfo;
    return (
        <Modal size={"small"} open={modalVisible} onClose={()=> console.log(modalVisible)}>
            <Modal.Content>
                <RobotForm name={name} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal} negative>Close</Button>
            </Modal.Actions>
        </Modal>
    )

}

export default RobotOptions;