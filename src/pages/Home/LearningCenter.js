import React, {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField} from "@mui/material";
import MainButton from "../../components/MainButton";
import {fetchQuestion, getCallTesting, submitQuestion} from "src/services/questionService"
import {AppLayout} from "src/components/AppLayout/AppLayout";
import {LearningCenterData} from "src/pages/Home/LearningCenterData";
import LearningCard from "src/components/LearningCard";
import Footer from "src/components/AppLayout/Footer";
import "./Learning.css"

function LearningCenterContainer() {

    return (
    <AppLayout
        showSubHeader={true}
        subHeaderLabel={"Back to Previous Page"}
        isPracticing={true}
    >
        <div>
            <Grid container className="assignment-container">
                <div className="assignment-section1">
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
