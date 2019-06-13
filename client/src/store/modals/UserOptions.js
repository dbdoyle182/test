import React, { useState } from "react";
import { Modal, Button, Grid } from "semantic-ui-react";
import { withAppContext } from "../withAppContext";
import UserOptionsForm from "../forms/UserOptionsForm";
import AuthContainer from "../../features/auth/AuthContainer";


const UserOptions = ({ modalVisible, closeModal, modalInfo, context }) => {
    const { updateUser } = context;
    const { name, description, robots, username } = modalInfo;
    return (
        <Modal size={"small"} open={modalVisible} onClose={()=> console.log(modalVisible)}>
            <Modal.Content>
                <UserOptionsForm name={name} description={description} robots={robots} username={username} updateUser={updateUser} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal} negative>Close</Button>
            </Modal.Actions>
        </Modal>
    )

}

export default withAppContext(UserOptions);