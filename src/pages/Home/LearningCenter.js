import {Grid} from "@mui/material";
import {fetchQuestion, getCallTesting, submitQuestion} from "src/services/questionService"
import {AppLayout} from "src/components/AppLayout/AppLayout";
import {LearningCenterData} from "src/pages/Home/LearningCenterData";
import LearningCard from "src/components/Cards/LearningCard";
import Footer from "src/components/AppLayout/Footer";
import "./Learning.css"
import "../Assignment/DailyGoal.css"

function LearningCenterContainer() {

    return (
    <AppLayout
        showSubHeader={true}
        subHeaderLabel={"Back to Previous Page"}
        isPracticing={true}
    >
        {/*TODO: find a better background, the tiny square is not dense enough for some pages*/}
        <div className={"cool-bg"}>
            <Grid container className="assignment-container cool-bg">
                <div className="assignment-section">
                    <h1>Learning Center</h1>
                    <div className="p1">
                        Let's practice English together!
                    </div>
                </div>
            </Grid>
            <div className={"learn-container theme-text"}>
                <Grid
                    container
                    spacing={{ xs: 2, sm: 8, md: 8 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {LearningCenterData.map((item, index) => {
                        return (
                            <Grid
                                key = {index}
                                item
                                xs={4} sm={8} md={6}>
                                <LearningCard
                                    label={item.title}
                                    to={item.path}
                                    isActive={item.isActive}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </div>
        <Footer/>

    </AppLayout>)
}

export default LearningCenterContainer;
