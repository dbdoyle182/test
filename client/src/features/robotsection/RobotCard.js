import React, { Component } from "react";
import { Card, Button, Progress, Dropdown, List, Icon } from "semantic-ui-react";
import taskUtils from "../../store/utils/taskApi";
import TaskItem from "./TaskItem";
import _ from "lodash";
import uuid from "uuid/v1";

const levels = [
    {
        level: 1,
        expTo: 50
    },
    {
        level: 2,
        expTo: 150
    },
    {
        level: 3,
        expTo: 450
    },
    {
        level: 4,
        expTo: 1350
    },
    {
        level: 5,
        expTo: 4050
    }
];


const taskOptions = [ 
    {
        key: 'select a task',
        value: 'select a task',
        text: 'Select a task'
    },
    { 
        key: 'do the dishes',
        value: 'do the dishes',
        text: 'Do the dishes',
        time: 1000 
    },
    { 
        key: 'sweep the house',
        value: 'sweep the house',
        text: 'Sweep the house',
        time: 3000
    },
    { 
        key: 'do the laundry',
        value: 'do the laundry',
        text: 'Do the laundry',
        time: 10000 
    },
    { 
        key: 'take out the recycling',
        value: 'take out the recycling',
        text: 'Take out the recycling',
        time: 4000 
    },
    { 
        key: 'make a sammich',
        value: 'make a sammich',
        text: 'Make a sammich',
        time: 7000 
    },
    { 
        key: 'mow the lawn',
        value: 'mow the lawn',
        text: 'Mow the lawn',
        time: 20000 
    },
    { 
        key: 'rake the leaves',
        value: 'rake the leaves',
        text: 'Rake the leaves',
        time: 18000 
    },
    { 
        key: 'give the dog a bath',
        value: 'give the dog a bath',
        text: 'Give the dog a bath',
        time: 14500 
    },
    { 
        key: 'bake some cookies',
        value: 'bake some cookies',
        text: 'Bake some cookies',
        time: 8000 
    },
    { 
        key: 'wash the car',
        value: 'wash the car',
        text: 'Wash the car',
        time: 20000 
    } 
];

const styles = {
    robotLevel: {
        backgroundColor: "green",
        borderRadius: "25px",
        width: "2vw",
        textAlign: "center",
        color: "white",
        alignSelf: "flex-start",
        marginLeft: "3vw"
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    robotCard: {
        height: "60vh",
        minWidth: "250px",
        marginRight: "1vw",
        marginLeft: "1vw",
        marginTop: "1vh"
    },
    taskHeader: {
        textAlign: "center"
    },
    taskList: {
        overflowY: "scroll",
        maxHeight: "160px"
    }
}


class RobotCard extends Component {
    state = {
        currentRobot: this.props.robot,
        taskQueue: [],
        task: "select a task",
        error: {
            status: false,
            message: ""
        }
    }

    task = (task, time) => {
        return {
            id: uuid(),
            type: task,
            time,
            exp: (time / 1000) + Math.floor(Math.random() * 9)
        }
        
    }

    addTaskToQueue = (e, data) => {
        let currentTask = this.state.task
        if (this.state.taskQueue.length >= 1 + this.state.currentRobot.level) {
            this.setState({
                error: {
                    status: true,
                    message: "Level up to try more tasks!"
                }
            })
            return;
        }
        if (currentTask === "select a task") {
            this.setState({
                error: {
                    status: true,
                    message: "Select a task first!"
                }
            })
            return;
        }
        let time = taskOptions.filter(task => task.value === currentTask)[0].time;
        let newTask = this.task(currentTask, time)
        let taskQueue = [newTask, ...this.state.taskQueue]
        
        this.setState({
            taskQueue
        })
    }

    removeTaskFromQueue = (completedTask) => {
        let newQueue = this.state.taskQueue.filter(task => task.id !== completedTask.id);
        this.setState({
            taskQueue: newQueue
        }, () => {
            taskUtils.endTask(completedTask, this.state.currentRobot).then(response => {
                this.setState({
                    currentRobot: response.data.data.Attributes
                }, () => {
                    this.setState({
                        error: {
                            status: false,
                            message: ""
                        }
                    })
                    this.props.findAllRobots();
                })
                
            }).catch(err => {
                this.setState({
                    error: {
                        status: true,
                        message: "You couldn't complete the task, maybe try harder next time?"
                    }
                })
            })
        })
    }

    render() {
        const { taskQueue, currentRobot, task, error } = this.state;
        const { robot, deleteRobot, userData, setModalVisible } = this.props;
        let nextLevel = levels.filter(level => level.level === currentRobot.level + 1)[0];
        return (
            <Card style={styles.robotCard} key={robot.robotId}>
                <Card.Content>
                    <Card.Header style={styles.cardHeader}>
                        <h4>{currentRobot.name}</h4>
                        {!_.isEmpty(userData) && <Icon name="cancel" color="red" onClick={() => deleteRobot(robot, userData)} />}
                        <p style={styles.robotLevel}>{currentRobot.level}</p>
                        {currentRobot.experience !== 0 &&
                        <Icon name="database" color="blue" onClick={() => {
                            setModalVisible("RobotStatsModal", currentRobot.tasks)
                        }} />
                        }
                    </Card.Header>
                    <Card.Meta>{currentRobot.type}</Card.Meta>
                    <Card.Description>
                        <Progress size="tiny" percent={(currentRobot.experience / nextLevel.expTo) * 100} color="green">{currentRobot.experience}</Progress>
                        <List>
                            <List.Header style={styles.taskHeader}>Task Queue</List.Header>
                            <section style={styles.taskList}>
                                {taskQueue.length > 0 && taskQueue.map(task => <TaskItem type={task.type} removeTaskFromQueue={this.removeTaskFromQueue} task={task} time={task.time} key={task.id} exp={task.exp} />)}
                            </section>
                        </List>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        <Dropdown
                            upward
                            placeholder={"Select Task"}
                            options={taskOptions}
                            selection
                            fluid
                            value={task}
                            onChange={(e, data) => {
                                this.setState({
                                    task: data.value,
                                    error: {
                                        status: false,
                                        message: {}
                                    }
                                });  
                            }}
                        />
                        <Button 
                            disabled={error.status}
                            onClick={this.addTaskToQueue} 
                            basic 
                            fluid 
                            color={error.status ? 'red' : 'green'}
                        >
                            {error.status ? error.message : "Start Task"}
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
} 


export default RobotCard;