import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";

const styles = {
    editButton: {
        float: "right"
    }
}

const UserCard = ({ user, openModal, signOut }) => {
    const { name, username, description, robots } = user
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {name}
                    <Button onClick={signOut}>Sign Out</Button> 
                </Card.Header>
                <Card.Meta>
                    <span>{username}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>
                    <Icon name='user' />
                    {robots.length}
                </p>
                <Button style={styles.editButton} onClick={() => openModal("UserOptions", user)}>Edit</Button>
            </Card.Content>
        </Card>
    )
}

export default UserCard;