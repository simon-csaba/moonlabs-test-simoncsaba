import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Nav } from "./Nav";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { Profile } from "./Profile";
import { Surveys } from "./Surveys";
import { NewSurvey } from "./NewSurvey";

export const AppRouter = () => {
    return (
        <Router>
                <div className="flex flex-row w-full main-wrapper">
                    <div className="w-1/5 mr-4">
                        <Nav />
                    </div>
                    <div className="w-4/5">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/surveys" element={<Surveys />} />
                            <Route path="/surveys/new" element={<NewSurvey />} />
                            <Route path="*" element={<div className="text-center mt-10 text-xl"><h1 className="display-1">404 : Az oldal amit keres nem létezik.</h1></div>} />
                        </Routes>
                    </div>
                </div>
        </Router>
    );
};