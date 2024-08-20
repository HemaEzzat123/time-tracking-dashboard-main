import React, { useEffect, useState } from "react";
import axios from "axios";
import jermy from "../images/image-jeremy.png";
import work from "../images/icon-work.svg";
import play from "../images/icon-play.svg";
import study from "../images/icon-study.svg";
import social from "../images/icon-social.svg";
import self from "../images/icon-self-care.svg";
import exercise from "../images/icon-exercise.svg";

function CardList() {
  const [card, setCard] = useState([]);
  const [timeframe, setTimeframe] = useState("weekly");
  const [type, setType] = useState("week");
  const iconMapping = {
    Work: work,
    Play: play,
    Study: study,
    Social: social,
    "Self Care": self,
    Exercise: exercise,
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/data");
    setCard(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFetch = (cn, type) => {
    setTimeframe(cn);
    setType(type);
  };

  return (
    <div className="container">
      <div className="left">
        <div className="up">
          <img src={jermy} alt="Jeremy Robson" />
          <div>
            <h6>Report for</h6>
            <h1>Jeremy Robson</h1>
          </div>
        </div>
        <div className="text">
          <p
            className={`daily ${timeframe === "daily" ? "active" : ""}`}
            onClick={() => handleFetch("daily", "day")}
          >
            Daily
          </p>
          <p
            className={`weekly ${timeframe === "weekly" ? "active" : ""}`}
            onClick={() => handleFetch("weekly", "week")}
          >
            Weekly
          </p>
          <p
            className={`monthly ${timeframe === "monthly" ? "active" : ""}`}
            onClick={() => handleFetch("monthly", "month")}
          >
            Monthly
          </p>
        </div>
      </div>
      <div className="right">
        {card.map((item) => (
          <div
            className="card"
            style={{ backgroundColor: item.color }}
            key={item.title}
          >
            <div className="icon">
              <img src={iconMapping[item.title]} alt={`${item.title} Icon`} />
            </div>
            <div className="content">
              <p className="title">
                {item.title}
                <svg
                  width="21"
                  className="dots"
                  height="5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                    fill="#BBC0FF"
                    fillRule="evenodd"
                  />
                </svg>
              </p>
              <div className="time">
                <p className="current">
                  {item.timeframes[timeframe].current}hrs
                </p>
                <p className="previous">
                  Last {type} - {item.timeframes[timeframe].previous}hrs
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
