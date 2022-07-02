import React from "react";
import "./Hodls.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "../images/web3logo.png";
import hodlImg from "../images/hodlit.png";
import { ConnectButton, Icon, Button, useNotification, Illustration } from "web3uikit";

import { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import User from "../components/User";

const Hodls = () => {
    const { state: searchFilters } = useLocation();
    const [highLight, setHighLight] = useState();
    const { Moralis, account } = useMoralis();
    const [hodlsList, setHodlsList] = useState([
        {
            attributes: {
                city: "New York",
                unoDescription: "3 Guests . 2 Beds . 2 Rooms",
                dosDescription: "Wifi . Kitchen . Living Area",
                imgUrl: "https://ipfs.moalis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
                lat: "40.716862",
                long: "-72.999005",
                name: "Apartmenet in China Town",
                pricePerDay: "3"
            }
        },
        {

            attributes: {
                city: "Paris",
                unoDescription: "1 Guests . 1 Bed . 2 Rooms",
                dosDescription: "Wifi . Kitchen . Living Area",
                imgUrl: "https://ipfs.moalis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
                lat: "40.716862",
                long: "-72.999005",
                name: "Apartmenet in Passy",
                pricePerDay: "3"
            }
        }
    ]);
    const contractProcessor = useWeb3ExecuteFunction();
    const dispatch = useNotification();

    const handleSuccess = () => {
        dispatch({
            type: "success",
            message: `Nice! You are going to ${searchFilters.destination}!!`,
            title: "Booking Succesful",
            position: "topL",
        });
    };

    const handleError = (msg) => {
        dispatch({
            type: "error",
            message: `${msg}`,
            title: "Booking Failed",
            position: "topL",
        });
    };

    const handleNoAccount = () => {
        dispatch({
            type: "error",
            message: `You need to connect your wallet to book a rental`,
            title: "Not Connected",
            position: "topL",
        });
    };


    useEffect(() => {
        async function fetchRentalsList() {
            const Rentals = Moralis.Object.extend("Rentals");
            const query = new Moralis.Query(Rentals);
            query.equalTo("city", searchFilters.destination);
            query.greaterThanOrEqualTo("maxGuests_decimal", searchFilters.guests);

            const result = await query.find();

            let cords = [];
            result.forEach((e) => {
                cords.push({ lat: e.attributes.lat, lng: e.attributes.long });
            });
            setHodlsList(result);
        }

        fetchRentalsList();
    }, [searchFilters]);


    const bookRental = async function (start, end, id, dayPrice) {

        for (
            var arr = [], dt = new Date(start);
            dt <= end;
            dt.setDate(dt.getDate() + 1)
        ) {
            arr.push(new Date(dt).toISOString().slice(0, 10)); // yyyy-mm-dd
        }

        let options = {
            contractAddress: "0xa9110224Df672c266569931F4e03f009651149E6",
            functionName: "addDatesBooked",
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string[]",
                            "name": "newBookings",
                            "type": "string[]"
                        }
                    ],
                    "name": "addDatesBooked",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                }
            ],
            params: {
                id: id,
                newBookings: arr,
            },
            msgValue: Moralis.Units.ETH(dayPrice * arr.length),
        }
        //console.log(arr);
        alert(arr)

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                handleSuccess();
            },
            onError: (error) => {
                handleError(error.data.message)
            }
        });

    }


    return (
        <>
            <div className="topBanner">
                <div>
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo"></img>
                    </Link>
                </div>
                <div className="searchReminder">
                    <div className="filter">Etherium</div>
                    <div className="vl" />
                    <div className="filter">
                        {`
           ${searchFilters.hodlIn.toLocaleString("default", {
                            month: "short",
                        })} 
           ${searchFilters.hodlIn.toLocaleString("default", {
                            day: "2-digit",
                        })} 
           - 
           ${searchFilters.hodlOut.toLocaleString("default", {
                            month: "short",
                        })} 
           ${searchFilters.hodlOut.toLocaleString("default", {
                            day: "2-digit",
                        })}
          `}
                    </div>
                    <div className="vl" />
                    <div className="filter">{searchFilters.amount} ETH</div>
                    <div className="searchFiltersIcon">
                        <Icon fill="#ffffff" size={20} svg="search" />
                    </div>
                </div>
                <div className="lrContainers">
                    {account &&
                        <User account={account} />
                    }
                    <ConnectButton />
                </div>
            </div>

            <hr className="line" />
            <div className="hodlsContent">
                <div className="hodlsContentL">
                    Curent Eth HODLs ...
                    {hodlsList &&
                        hodlsList.map((e, i) => {

                            return (
                                <>
                                    <hr className="line2" />
                                    <div className={highLight == i ? "rentalDivH " : "rentalDiv"}>
                                        <img className="rentalImg" src={hodlImg}></img>

                                        <div className="rentalInfo">
                                            <div className="rentalTitle">{e.attributes.name}</div>
                                            <div className="rentalDesc">
                                                {e.attributes.unoDescription}
                                            </div>
                                            <div className="rentalDesc">
                                                {e.attributes.dosDescription}
                                            </div>
                                            <div className="bottomButton">
                                                <Button
                                                    onClick={() => {
                                                        if (account) {
                                                            bookRental(
                                                                searchFilters.checkIn,
                                                                searchFilters.checkOut,
                                                                e.attributes.uid_decimal.value.$numberDecimal,
                                                                Number(e.attributes.pricePerDay_decimal.value.$numberDecimal)
                                                            )
                                                        } else {
                                                            handleNoAccount()
                                                        }
                                                    }
                                                    }
                                                    text="Stay Here" />
                                                <div className="price">
                                                    <Icon fill="#808080" size={10} svg="matic" />{" "}
                                                    {e.attributes.pricePerDay} / Day
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        })
                    }

                </div>
                <div className="hodlsContentR">
                    <Illustration logo="token" />
                </div>
            </div>
        </>
    );
};

export default Hodls;