import React, { useState } from "react";
import { Form, Message, Button, Header } from "semantic-ui-react";
import { withAppContext } from "../withAppContext";

const robotTypes = [ { key: 'Unipedal', value: 'Unipedal', text: 'Unipedal' },
{ key: 'Bipedal', value: 'Bipedal', text: 'Bipedal' },
{ key: 'Quadrupedal', value: 'Quadrupedal', text: 'Quadrupedal' },
{ key: 'Arachnid', value: 'Arachnid', text: 'Arachnid' },
{ key: 'Radial', value: 'Radial', text: 'Radial' },
{ key: 'Aeronautical',
  value: 'Aeronautical',
  text: 'Aeronautical' } ];

const styles = {
    robotFormContainer: {
        backgroundColor: "white",
        padding: "15px",
        marginTop: "5vh"
    }
}
    


const RobotForm = ({ context }) => {
    const [success, isSuccess] = useState(false);
    const [error, isError] = useState({
        error: false,
        message: "There was an error in the request."
    });
    const [loading, isLoading] = useState(false)
    const [name, setName] = useState("");
    const [type, setType] = useState("")

    const errorHandle = (err) => {
        isSuccess(false);
        isError({
            error: true,
            message: "There was an error in the request"
        });
        isLoading(false);
    }

    const successHandle = (data) => {
        isSuccess(true);
        isError({
            error: false,
            message: "There was an error in the request"
        });
        isLoading(false);
    }
    return (
        <Form 
            style={styles.robotFormContainer}
            onSubmit={() => {
            isLoading(true)
            if (name === "" || type === "") {
                isLoading(false)
                isError({
                    error: true,
                    message: "You must have a name and select a type"
                })
                return
            }
            context.addRobot(name, type, successHandle, errorHandle)
        }} success={success} error={error.error} loading={loading}>
            <Header>Create a Robot!</Header>
            <Form.Input value={name} label='Robot Name' placeholder='Wall-E' onChange={(e, data) => setName(data.value)} />
            <Form.Dropdown value={type} label='Robot Type' placeholder="Select the type..." options={robotTypes} onChange={(e, data) => setType(data.value)} />
            {success && <Message success header='Success' content="Your robot has been created!" />}
            {error.error && <Message error header='Error' content={error.message} />}
            <Button loading={loading}>Submit</Button>
        </Form>
    )
}

export default withAppContext(RobotForm);