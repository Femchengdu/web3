import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.png";
import logo from "../images/airbnb.jpg";
import { ConnectButton, Icon, Typography, DatePicker, Input, Button } from "web3uikit";
import { useState } from "react";


const Home = () => {
    const [hodlIn, setHodlIn] = useState(new Date());
    const [hodlOut, setHodlOut] = useState(new Date());
    const [amount, setAmount] = useState(2);

    return (
        <>
            <div className="container" style={{ backgroundImage: `url(${bg})` }}>
                <div className="containerGradinet"></div>
            </div>
            <div className="topBanner">
                <div>
                    <img className="logo" src={logo} alt="logo"></img>
                </div>
                <div className="tabs">
                    <div className="selected">All HODLs</div>
                    <div>Active HODLs</div>
                </div>
                <div className="lrContainers">
                    <ConnectButton />
                </div>
            </div>
            <div className="tabContent">
                <div className="searchFields">
                    <div className="inputs">


                        <Typography
                            onCopy={function noRefCheck() { }}
                            variant="subtitle14"
                        >
                            Crypto:  Etherium
                        </Typography>
                    </div>
                    <div className="vl" />
                    <div className="inputs">
                        HODL In
                        <div className="date-container">
                            <DatePicker
                                id="CheckIn"
                                onChange={(event) => setHodlIn(event.date)}
                            />
                        </div>

                    </div>
                    <div className="vl" />
                    <div className="inputs">
                        HODL Out
                        <div className="date-container">

                            <DatePicker
                                id="CheckOut"
                                onChange={(event) => setHodlOut(event.date)}
                            />
                        </div>
                    </div>
                    <div className="vl" />
                    <div className="inputs">
                        HODL Amount


                        <Input
                            value={2}
                            name="AddGuests"
                            type="number"
                            onChange={(event) => setAmount(Number(event.target.value))}
                        />

                    </div>
                    <Link to={"/hodls"} state={{

                        hodlIn: hodlIn,
                        hodlOut: hodlOut,
                        amount: amount
                    }}>
                        <div className="searchButton">
                            <Icon fill="#ffffff" size={24} svg="search" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="randomLocation">
                <div className="title">Want all the data?</div>
                <div className="text">
                    Discover all past HODLs.
                </div>
                <Button
                    text="Get details"
                    // onClick={() => console.log(hodlOut)}
                    onClick={() => alert(hodlOut)}
                />
            </div>
        </>
    );
};

export default Home;