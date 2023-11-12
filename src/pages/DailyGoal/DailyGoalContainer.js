import React from "react";
import ProgressContainer from "../Progress/ProgressContainer";
import {Button, Grid} from "@material-ui/core";
import {TextField} from "@mui/material";

function DailyGoalContainer() {
    return (
        <div className='main'>
            <Grid>
                <p>
                    The difficulty of the question will be based on your current rank.
                    You will have 3 attempts each day.
                </p>
                <p>
                    Each attempt's transcription will be recorded and you can choose the best one to submit
                    Click the bottom below to generate a random question!
                </p>
                <Grid
                    container
                    justifyContent="space-between">
                    <Button variant="outlined">Generate!</Button>
                    <span>word count: </span>
                </Grid>
                <Grid>
                    <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="Your Answer"
                        placeholder="Your Answer"
                        minRows={2}
                        multiline
                    />
                </Grid>
                <Grid
                    container
                    justifyContent="flex-end"
                >
                    <Button variant="outlined">Submit!</Button>
                </Grid>
            </Grid>


        </div>
    );
}

export default DailyGoalContainer;
