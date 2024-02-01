import React from "react";
import {Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import { NotFound } from "../navigation/NotFound";
import {
    ROOT,
    PROGRESS,
    LEADERBOARD,
    SIGNUP,
    LOGIN,
    CONFIRM_SIGNUP,
    PROFILE,
    LEARNING_CENTER, DAILY_SPEAKING
} from "../navigation/CONSTANTS";
import LoginPageContainer from "../pages/Login/LoginPageContainer";
import DailyGoalContainer from "../pages/Assignment/DailyGoalContainer";
import LeaderboardContainer from "../pages/Leaderboard/LeaderboardContainer";
import ProgressContainer from "../pages/Progress/ProgressContainer";
import SignUp from "../pages/Login/SignUp";
import ConfirmSignUp from "../pages/Login/ConfirmSignUp";
import PrivateRoute from "./Auth/PrivateRoute";
import {Profile} from "../pages/Login/Profile";
import LearningCenterContainer from "src/pages/Home/LearningCenter";
import DailySpeakingPage from "src/pages/Assignment/DailySpeakingPage";

export const RouterConfig = () => {
    return (
        <div>
            <div>
                <Switch>
                     List all public routes here
                    <Route exact path={LOGIN} component={LoginPageContainer} />
                    <Route exact path={ROOT} component={Home}/>
                    <Route exact path={SIGNUP} component={SignUp}/>

                    {/* List all private/auth routes here */}
                    <PrivateRoute exact path={LEARNING_CENTER} component={LearningCenterContainer}/>
                    <PrivateRoute exact path={DAILY_SPEAKING} component={DailySpeakingPage}/>


                    <PrivateRoute exact path={PROGRESS} component={ProgressContainer}/>
                    <PrivateRoute exact path={LEADERBOARD} component={LeaderboardContainer}/>
                    <PrivateRoute exact path={PROFILE} component={Profile}/>

                    <PrivateRoute exact path={CONFIRM_SIGNUP} component={ConfirmSignUp}/>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};