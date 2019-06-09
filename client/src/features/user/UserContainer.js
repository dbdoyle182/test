import React from "react";
import { Segment, Header } from "semantic-ui-react";
import { withAppContext } from "../../store/withAppContext";

const UserContainer = ({ context }) => {
    console.log(context.userData)
    return (
        <Segment>
            <Header>
                User Card
            </Header>
        </Segment>
    )    
}




export default withAppContext(UserContainer);