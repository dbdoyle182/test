import React, { Component } from "react";
import { Segment, Header, Button, Card } from "semantic-ui-react";
import RobotCard from "./RobotCard";
import { withAppContext } from "../../store/withAppContext";
import _ from "lodash";

const styles = {
    robotSectionHeader: {
        display: "flex", 
        flexDirection: "row",
        justifyContent: "center"
    },
    robotSectionText: {
        color: "#32213A"
    },
    robotAddBtn: {
        alignSelf: "flex-start",
        marginLeft: "3vw",
        color: "white",
        backgroundColor: "orange"
    },
    robotSectionCardGroup: {
        display: "flex",
        flexDirection: "row",
        overflowX: "scroll",
        height: "70vh",
        width: "100%"
    }
}

class RobotContainer extends Component {
    render () {
        const { userData, setModalVisible, robots, startTask, findRobotById, addTaskToQueue, deleteRobot, wildRobots, findAllRobots } = this.props.context;
        let robotPool = _.isEmpty(userData) ? wildRobots : robots
        return (
            <Segment>
                <header style={styles.robotSectionHeader}>
                    <h2 style={styles.robotSectionText}>{_.isEmpty(userData) ? "Wild" : "Your"} Robots </h2>
                    <Button style={styles.robotAddBtn} onClick={() => setModalVisible("RobotOptions")}>Add Robot</Button>
                </header>
                
                <section style={styles.robotSectionCardGroup} >
                    {robotPool && robotPool.map(robot => {
                        return <RobotCard robot={robot} userData={userData} key={robot.robotId} addTaskToQueue={addTaskToQueue} startTask={startTask} findRobotById={findRobotById} deleteRobot={deleteRobot} findAllRobots={findAllRobots} />
                    })}
                </section>
            </Segment>
        )
    }
}



export default withAppContext(RobotContainer);