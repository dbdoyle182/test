import React from "react";
import _ from "lodash";
import { Message } from "semantic-ui-react";

const MessageSection = ({ error, success, formErrors}) => {
    return (
        <React.Fragment>
            {success && <Message success header='Success' content="You have successfully signed up!" />}
            {error && <Message error header='Error' content={error} />}
            {!_.isEmpty(formErrors) && (
            <Message error>
                <Message.Header>Form Errors</Message.Header>
                <Message.List>
                {_.map(formErrors, (error) => <Message.Item key={error}>{error}</Message.Item>)}
                </Message.List>
            </Message>)
            }
        </React.Fragment>
    )
}

export default MessageSection;