import React from "react";
import {Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import {ROOT, ASSIGNMENT, PROGRESS, LEADERBOARD, SIGNUP, LOGIN, HOME, CONFIRM_SIGNUP} from "navigation/CONSTANTS";
import LoginPageContainer from "../pages/Login/LoginPageContainer";
import DailyGoalContainer from "../pages/DailyGoal/DailyGoalContainer";
import LeaderboardContainer from "../pages/Leaderboard/LeaderboardContainer";
import ProgressContainer from "../pages/Progress/ProgressContainer";
import SignUp from "../pages/Login/SignUp";
import ConfirmSignUp from "../pages/Login/ConfirmSignUp";

export const RouterConfig = () => {
    return (
        <div>
            <div>
                <Switch>
                    {/* List all public routes here */}
                    <Route exact path={ROOT} component={Home} />
                    <Route exact path={ASSIGNMENT} component={DailyGoalContainer} />
                    <Route exact path={PROGRESS} component={ProgressContainer} />
                    <Route exact path={LEADERBOARD} component={LeaderboardContainer} />
                    <Route exact path={SIGNUP} component={SignUp} />
                    <Route exact path={LOGIN} component={LoginPageContainer} />
                    <Route exact path={CONFIRM_SIGNUP} component={ConfirmSignUp} />



                    {/*/!* List all private/auth routes here *!/*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    /!*<Route exact path={ROOT} component={Home} />*!/*/}
                    {/*</PrivateRoute>*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    <Route exact path={DAILY_GOAL} component={DailyGoalContainer} />*/}
                    {/*</PrivateRoute>*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    <Route exact path={PROGRESS} component={ProgressContainer} />*/}
                    {/*</PrivateRoute>*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    <Route exact path={LEADERBOARD} component={LeaderboardContainer} />*/}
                    {/*</PrivateRoute>*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    /!*<Route exact path={ROOT} component={Home} />*!/*/}
                    {/*</PrivateRoute>*/}
                    {/*<PrivateRoute path={ROOT}>*/}
                    {/*    /!*<Route exact path={ROOT} component={Home} />*!/*/}
                    {/*</PrivateRoute>*/}


                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};