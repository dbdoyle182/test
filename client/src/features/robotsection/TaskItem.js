import React, { Component } from "react";
import { Progress } from "semantic-ui-react"


class TaskItem extends Component {
    state = {
        time: this.props.time,
        startingTime: 0
    }
    componentDidMount() {
        let taskInterval = setInterval(() => {
            this.setState({
                startingTime: this.state.startingTime + 1000
            }, () => {
                if (this.state.startingTime > this.state.time) {
                    clearInterval(taskInterval);
                    this.props.removeTaskFromQueue(this.props.task)
                }
            })
        }, 1000)
    }

    render() {
        const { time, startingTime } = this.state;
        return (
            <Progress percent={startingTime/time * 100} indicating>{startingTime < time ? this.props.type : "Complete!"}</Progress>
        )
    }
}

export default TaskItem;