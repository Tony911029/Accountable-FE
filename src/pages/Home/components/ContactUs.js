import {AppLayout} from "../../../components/AppLayout/AppLayout";
import React, {useState} from "react";
import "../Home.css"
import {TextField} from "@mui/material";
import MainButton from "../../../components/MainButton";

function ContactUs() {
    function handleSubmit() {
        return null;
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    return (
        <div className="contact-form-container">
            <h2>Contact Us!</h2>
            <form onSubmit={handleSubmit} className="form">
                <TextField
                    id="outlined-name-input"
                    label="Name"
                    type="name"
                />
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                />
                <TextField
                    id="outlined-question-input"
                    label="Message or Question"
                    type="text"
                    multiline
                    rows={4}
                />
                <MainButton type="submit" btnLabel={"Submit"}/>
            </form>
        </div>

    );
}

export default ContactUs;
