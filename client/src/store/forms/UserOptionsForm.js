import React, { useState } from "react";
import { Form, Message, Button, Header } from "semantic-ui-react";
import { withAppContext } from "../withAppContext";

const styles = {
    userFormContainer: {
        backgroundColor: "white",
        padding: "15px",
        marginTop: "5vh"
    }
}
    


const UserOptionsForm = ({ name, description, username, robots, updateUser }) => {
    const [success, isSuccess] = useState(false);
    const [error, isError] = useState({
        error: false,
        message: "There was an error in the request."
    });
    const [loading, isLoading] = useState(false)
    const [newName, setName] = useState(name);
    const [newDescription, setDescription] = useState(description)

    const errorHandle = (err) => {
        isSuccess(false);
        isError({
            error: true,
            message: "There was an error in the request"
        });
        isLoading(false);
    };

    return (
        <Form 
            style={styles.userFormContainer}
            onSubmit={() => {
                isLoading(true)
                if (name === "") {
                    isLoading(false)
                    isError({
                        error: true,
                        message: "You must have a name"
                    })
                    return
                }
                updateUser({
                    name: newName,
                    description: newDescription
                }, errorHandle)
            }} 
            success={success} 
            error={error.error} 
            loading={loading}>
            <Header>Edit User</Header>
            <Form.Input value={newName} label='Name' onChange={(e, data) => setName(data.value)} />
            <Form.TextArea value={newDescription} label="Description" onChange={(e, data) => setDescription(data.value)} />
            {success && <Message success header='Success' content="Your robot has been created!" />}
            {error.error && <Message error header='Error' content={error.message} />}
            <Button loading={loading}>Submit</Button>
        </Form>
    )
}

export default withAppContext(UserOptionsForm);