import React from "react";
import { Modal, Button, Grid } from "semantic-ui-react";
import { withAppContext } from "../withAppContext";
import RobotForm from "../forms/RobotForm";
import AuthContainer from "../../features/auth/AuthContainer";


const StartUp = ({ modalVisible, closeModal }) => {
    
    return (
        <Modal size={"large"} open={modalVisible}>
            <Modal.Header>Welcome to Bot-O-Mat!</Modal.Header>
            <Modal.Content>
                <Grid columns={2}>
                    <Grid.Column>
                        <AuthContainer />
                    </Grid.Column>
                    <Grid.Column>
                        <RobotForm />
                    </Grid.Column>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal} negative>Close</Button>
            </Modal.Actions>
        </Modal>
    )

}

export default withAppContext(StartUp);