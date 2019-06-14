import React, { useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie, VictoryLabel } from "victory";
import { Button, Header } from "semantic-ui-react";

const BarChart = ({ stat, chartData }) => (
    <VictoryChart
        domainPadding={15}    
    >
        <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            tickFormat={["Dishes", "Sweep", "Laundry", "Recycle", "Sammich", "Lawn", "Rake", "Dog Bath", "Bake", "Wash Car"]}
            style={{
                tickLabels: {
                    angle: 45,
                    fontSize: 10,
                    marginTop: 5
                },
                ticks: {
                    padding: 5
                },
                axisLabel: {
                    marginTop: 20
                }
            }}
        />
        {stat === "Total" ? 
        <VictoryAxis dependentAxis
            label="Number of times completed"
            tickFormat={(y) => y}
            style={{
                tickLabels: {
                    fontSize: 10
                }
            }}
        />
        :
        <VictoryAxis dependentAxis
            label="Time Spent (in seconds)"
            tickFormat={(y) => y / 1000}
        />
        }
        <VictoryBar 
            data={chartData}
            x="description"
            y={stat === "Total" ? "times" : "timespent"}
        /> 
    </VictoryChart>
)

const PieChart = ({ stat, chartData }) => {
    let revisedData; 
    if (stat === "Total") {
        revisedData = chartData.filter(data => data.times !== 0);
    } else {
        revisedData = chartData.filter(data => data.timespent !== 0);
    }
    return (
        <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy", "purple", "yellow", "lime", "pink", "lavender" ]}
            innerRadius={90}
            height={250}
            labels={["Dishes", "Sweep", "Laundry", "Recycle", "Sammich", "Lawn", "Rake", "Dog Bath", "Bake", "Wash Car"]}
            data={revisedData}
            x="description"
            y={stat === "Total" ? "times" : "timespent"}
        />
    )
}



const RobotStats = ({ data }) => {
    const [chart, setChart] = useState("Bar");
    const [stat, setStat] = useState("Total");

    return (
        <React.Fragment>
            <Header>
                <Button onClick={() => {
                        if (chart === "Bar") {
                            setChart("Pie")
                        } else {
                            setChart("Bar")
                        }
                    }}>
                    Chart Type: {chart}
                </Button>
                <Button onClick={() => {
                        if (stat === "Total") {
                            setStat("Time Spent")
                        } else {
                            setStat("Total")
                        }
                    }}>
                    Stat: {stat}
                </Button>
            </Header>
            {
                chart === "Bar" ?
                    <BarChart stat={stat} chartData={data} />
                    :
                    <PieChart stat={stat} chartData={data} />
            }
        </React.Fragment>
    )
}

export default RobotStats;