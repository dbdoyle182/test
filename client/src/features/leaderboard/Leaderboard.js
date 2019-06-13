import React from "react";
import { Segment, Header, List } from "semantic-ui-react";
import { withAppContext } from "../../store/withAppContext";

const Leaderboard = ({ context }) => {
    console.log(context);
    return (
        <Segment>
            <Header>Leaderboard</Header>
            <List>
                {context.allRobots && context.allRobots.reverse().map((robot, index) => {
                    return <p>{index + 1}. {robot.name} {`Exp. ${robot.experience}`} {robot.owner === "wild" ? "A wild Robot" : `Created By ${robot.owner}`}</p>
                })}
            </List>
        </Segment>
    )
}

export default withAppContext(Leaderboard);