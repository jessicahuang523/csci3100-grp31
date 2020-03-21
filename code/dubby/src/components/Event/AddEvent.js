import React from "react";
import { Layout } from "react-mdl";
import Navbar from "../Navbar/Navbar";

const AddEvent = () => {
    return(
        <div>
            <Navbar />
            <div className="main-container">
                <Layout><h1>Add new event</h1></Layout>
                
            </div>
        </div>
    );
}

export default AddEvent;