import React from "react";
import Amplify from "aws-amplify";
import { Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import aws_exports from "../../aws-exports";
import AppProvider from "../../store/appProvider";
import RobotContainer from "../../features/robotsection/RobotContainer";
import Gameplay from "../../features/gameplay/Gameplay";
import "./App.css";
import UserContainer from "../../features/user/UserContainer";
import Leaderboard from "../../features/leaderboard/Leaderboard";



Amplify.configure(aws_exports);


const styles = {
  rowStyle: {
    marginTop: "2vh"
  }
}


const App = () => {
    return (
      <AppProvider >
          <Grid className="app-grid" container stackable>
            <Grid.Column width={11}>
              <Grid.Row style={styles.rowStyle}>
                <RobotContainer />
              </Grid.Row>
              {/* <Grid.Row style={styles.rowStyle}>
                    <Gameplay />
                  </Grid.Row> */}
            </Grid.Column>
            <Grid.Column width={5}>
              <Grid.Row style={styles.rowStyle}>
                <UserContainer />
              </Grid.Row>
              <Grid.Row style={styles.rowStyle}>
                <Leaderboard />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        
      </AppProvider>   
    );
}

export default App;