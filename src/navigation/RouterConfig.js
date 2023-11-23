import React from "react";
import {Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import {ROOT, ASSIGNMENT, PROGRESS, LEADERBOARD, SIGNUP, LOGIN, CONFIRM_SIGNUP} from "navigation/CONSTANTS";
import LoginPageContainer from "../pages/Login/LoginPageContainer";
import DailyGoalContainer from "../pages/DailyGoal/DailyGoalContainer";
import LeaderboardContainer from "../pages/Leaderboard/LeaderboardContainer";
import ProgressContainer from "../pages/Progress/ProgressContainer";
import SignUp from "../pages/Login/SignUp";
import ConfirmSignUp from "../pages/Login/ConfirmSignUp";
import PrivateRoute from "./Auth/PrivateRoute";

export const RouterConfig = () => {
    return (
        <div>
            <div>
                <Switch>
                    {/* List all public routes here */}
                    <Route exact path={LOGIN} component={LoginPageContainer} />
                    {/*<Route exact path={SIGNUP} component={SignUp} />*/}
                    <Route exact path={ROOT} component={Home}/>

                    {/* List all private/auth routes here */}
                    <PrivateRoute exact path={ASSIGNMENT} component={DailyGoalContainer}/>
                    <PrivateRoute exact path={PROGRESS} component={ProgressContainer}/>
                    <PrivateRoute exact path={LEADERBOARD} component={LeaderboardContainer}/>
                    <PrivateRoute exact path={CONFIRM_SIGNUP} component={ConfirmSignUp}/>

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};