import React from "react";
import { Modal, Button } from "semantic-ui-react";
import RobotStats from "../../features/robotsection/RobotStats";


const RobotStatsModal = ({ modalVisible, closeModal, modalInfo }) => {
    console.log(modalInfo)
    return (
        <Modal size={"small"} open={modalVisible} onClose={()=> console.log(modalVisible)}>
            <Modal.Content>
                <RobotStats data={modalInfo} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={closeModal} negative>Close</Button>
            </Modal.Actions>
        </Modal>
    )

}

export default RobotStatsModal;