import {
    faCar,
    faPlane,
    faTaxi,
    faLocationDot,
    faCalendarDays,
    faPerson,
    faBed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]:
                    operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        dispatch({
            type: "NEW_SEARCH",
            payload: { destination, dates, options },
        });
        navigate("/hotels", { state: { destination, dates, options } });
    };

    const handleSignInRegister = () => {
        navigate("/login");
    };

    const openWebsiteInNewTab = (url) => {
        window.open(url, "_blank");
    };
    const openHome = () => {
        navigate("/");
    };

    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList" onClick={openHome}>
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} beat />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem" onClick={() => openWebsiteInNewTab("https://www.makemytrip.com/flights/?cmp=SEM|D|DF|G|Generic|DF_Generic_Exact|Tickets_Exact|ETA|Regular|274019538949&s_kwcid=AL!1631!3!274019538949!e!!g!!flight%20booking%20website&ef_id=Cj0KCQjw7PCjBhDwARIsANo7CglrcNOB_kmF0Dp8uMght2xoDGIfdDTMNNmL1XR3jb7xs3a5lAo_7noaAgXSEALw_wcB:G:s&gclid=Cj0KCQjw7PCjBhDwARIsANo7CglrcNOB_kmF0Dp8uMght2xoDGIfdDTMNNmL1XR3jb7xs3a5lAo_7noaAgXSEALw_wcB")}>
                        <FontAwesomeIcon icon={faPlane} beat />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem" onClick={() => openWebsiteInNewTab("https://www.rentalcars.com/?affiliateCode=google&preflang=us&label=generic-0p5_*MsH2uv7wNjejHd_KwS515748793609&ws=&ppc_placement=&ppc_target=&ppc_param1=&ppc_param2=&aceid=&adposition=&ppc_network=g&feeditemid=&ppc_targetid=kwd-2479466101&loc_physical_ms=9061848&loc_interest_ms=&ppc_device=c&ppc_devicemodel=&gad=1&gclid=Cj0KCQjw7PCjBhDwARIsANo7CgmnBffymi4HE5DDy3A6KLu7Vw1H_AQJScnqoGDonWfc3JOX3Ui1uDQaAgEyEALw_wcB")}>
                        <FontAwesomeIcon icon={faCar} beat />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem" onClick={() => openWebsiteInNewTab("https://www.getyourguide.com/?selectedTab=0a050aa1-8582-1114-8185-8234a49c0003")}>
                        <FontAwesomeIcon icon={faLocationDot} beat />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem" onClick={() => openWebsiteInNewTab("https://www.makemytrip.com/cabs/")}>
                        <FontAwesomeIcon icon={faTaxi} beat />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" && (
                    <>
                        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                        <p className="headerDesc">
                            Get rewarded for your travels – unlock instant savings of 10% or more with a free Lamabooking account
                        </p>
                        {!user && (
                            <button className="headerBtn" onClick={handleSignInRegister}>
                                Sign in / Register
                            </button>
                        )}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                <input
                                    type="text"
                                    placeholder="Where are you going?"
                                    className="headerSearchInput"
                                    onChange={(e) => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                <span
                                    onClick={() => setOpenDate(!openDate)}
                                    className="headerSearchText"
                                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                                    dates[0].endDate,
                                    "MM/dd/yyyy"
                                )}`}</span>
                                {openDate && (
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={(item) => setDates([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dates}
                                        className="date"
                                        minDate={new Date()}
                                    />
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                <span
                                    onClick={() => setOpenOptions(!openOptions)}
                                    className="headerSearchText"
                                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                                {openOptions && (
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.adult <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.adult}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("adult", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.children <= 0}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.children}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("children", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button
                                                    disabled={options.room <= 1}
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "d")}
                                                >
                                                    -
                                                </button>
                                                <span className="optionCounterNumber">
                                                    {options.room}
                                                </span>
                                                <button
                                                    className="optionCounterButton"
                                                    onClick={() => handleOption("room", "i")}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
