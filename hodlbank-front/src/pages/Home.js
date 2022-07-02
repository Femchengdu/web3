import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import bg from "../images/frontpagebg.jpg";
import logo from "../images/airbnb.jpg";
import { ConnectButton, Icon, Select, DatePicker, Input, Button } from "web3uikit";
import { useState } from "react";


const Home = () => {
    const [hodlIn, setHodlIn] = useState(new Date());
    const [hodlOut, setHodlOut] = useState(new Date());
    const [crypto, setCrypto] = useState("Etherium");
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
                    <div className="selected">Places To Stay</div>
                    <div>Experiences</div>
                    <div>Online Experiences</div>
                </div>
                <div className="lrContainers">
                    <ConnectButton />
                </div>
            </div>
            <div className="tabContent">
                <div className="searchFields">
                    <div className="inputs">
                        Crypto
                        <Select
                            defaultOptionIndex={0}
                            onChange={(data) => setCrypto(data.label)}
                            options={[
                                {
                                    id: "eth",
                                    label: "Etherium",
                                },

                            ]}
                        />
                    </div>
                    <div className="vl" />
                    <div className="inputs">
                        HODL In
                        <DatePicker
                            id="CheckIn"
                            onChange={(event) => setHodlIn(event.date)}
                        />
                    </div>
                    <div className="vl" />
                    <div className="inputs">
                        HODL Out
                        <DatePicker
                            id="CheckOut"
                            onChange={(event) => setHodlOut(event.date)}
                        />
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
                        crypto: crypto,
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
                <div className="title">Feel Adventurous</div>
                <div className="text">
                    Let us decide and discover new places to stay, live, work or just
                    relax.
                </div>
                <Button
                    text="Explore A Location"
                    // onClick={() => console.log(hodlOut)}
                    onClick={() => alert(hodlOut)}
                />
            </div>
        </>
    );
};

export default Home;