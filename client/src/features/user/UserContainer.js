import React from "react";
import { Segment, Card, Image, Icon } from "semantic-ui-react";
import _ from "lodash";
import { withAppContext } from "../../store/withAppContext";
import AuthContainer from "../auth/AuthContainer";
import UserCard from "./UserCard";

const styles = {
    userContainer: {
        maxHeight: "375px",
        overflowY: "scroll"
    }
}

const UserContainer = ({ context }) => {
    return (
        <Segment style={styles.userContainer}>
            {_.isEmpty(context.userData) ?
            <AuthContainer />
            :
            <UserCard user={context.userData} openModal={context.setModalVisible} />
            }
        </Segment>
    )    
}




export default withAppContext(UserContainer);