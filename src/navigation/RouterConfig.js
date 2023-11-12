import React from "react";
import {Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import { NotFound } from "navigation/NotFound";
import {ROOT, DASHBOARD, PAGE1, AUTH_PAGE1, DAILY_GOAL, PROGRESS, LEADERBOARD} from "navigation/CONSTANTS";
import { Page1 } from "pages/Page1";
import Login from "./Auth/Login";
import { AuthorizedPage1 } from "pages/AuthorizedPage1";
import PrivateRoute from "./Auth/PrivateRoute";
import NavBar from "../components/SideBar/NavBar";
import DailyGoalContainer from "../pages/DailyGoal/DailyGoalContainer";
import LeaderboardContainer from "../pages/Leaderboard/LeaderboardContainer";
import ProgressContainer from "../pages/Progress/ProgressContainer";

export const RouterConfig = () => {
    return (
        <div>
            <NavBar>
            <div>
                <Switch>
                    {/* List all public routes here */}
                    <Route exact path={ROOT} component={Home} />
                    <Route exact path={DAILY_GOAL} component={DailyGoalContainer} />
                    <Route exact path={PROGRESS} component={ProgressContainer} />
                    <Route exact path={LEADERBOARD} component={LeaderboardContainer} />

                    <Route path="/login">
                        <Login />
                    </Route>

                    {/* List all private/auth routes here */}
                    {/*<PrivateRoute path={AUTH_PAGE1}>*/}
                    {/*    <AuthorizedPage1 />*/}
                    {/*</PrivateRoute>*/}
                    {/* Do not hesitate to play around by moving some routes from public to private and vice-versa */}
                    {/* <PrivateRoute path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute> */}

                    {/* List a generic 404-Not Found route here */}
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>

            </NavBar>

        </div>
    );
};