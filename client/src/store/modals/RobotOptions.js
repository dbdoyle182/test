import React from "react";
import { Modal, Button } from "semantic-ui-react";
import RobotForm from "../forms/RobotForm";


const RobotOptions = ({ modalVisible, closeModal, modalInfo }) => {
    const { name } = modalInfo;
    return (
        <Modal size={"small"} open={modalVisible} >
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