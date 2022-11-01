import React from "react";
import "./Chart.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, } from "recharts";


function Chart(props) {
    const getTimeFromDate = (dateString) => {
        let date = new Date(dateString);
        let timeString = date.toLocaleTimeString();
        return timeString.substring(0, timeString.length - 3);
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    const getDateString = (dateString)=>{
        const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
        let date = new Date(dateString)
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    const calculateAvg = (type) => {
        console.log()
        let sum = 0;
        let counter = 1;
        for (let sample of props.stats) {
            sum = sum + sample[type];
            counter++;
        }
        return Math.round(sum / counter);
    };
    let avgViewers = calculateAvg("currentViewers");
    let avgChatters = calculateAvg("currentChatters");

    const customTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p >{formatDate(label)}</p>
                    <p
                        style={{ color: "var(--purple-color)" }}
                        
                    >{`Liczba widzów : ${payload[0].value}`}</p>
                    <p
                        style={{ color: "var(--green-color" }}
                        
                    >{`Liczba chattersów : ${payload[1].value}`}</p>
                    <p >{`Różnica : ${Math.round(
                        ((payload[0].value - payload[1].value) / payload[0].value) * 100
                    )}%`}</p>
                </div>
            );
        }
        return null;
    };
    return (
        <div className="chart">
            <span className="chart__channel">
                <span className="channel__logo-name">
                        <span className="channel__logo" style={{ backgroundImage: `url(${props.avatar})` }}></span>
                        <div className="channel__additional-info">
                            <span className="channel__name">{props.name}</span>
                            <span className="chart__stream-date">
                                {getDateString(props.createdAt)}
                            </span>
                        </div>
                        
                </span>

                

                <span className="chart__stream-avg">
                    <span className="purple-text">
                        Średnia liczba widzów: {avgViewers}
                    </span>
                    <span className="green-text">
                        Średnia liczba chattersów: {avgChatters}
                    </span>
                    <span>
                        Różnica:{" "}
                        {avgViewers -
                            avgChatters +
                            " (" +
                            Math.round(((avgViewers - avgChatters) / avgViewers) * 100) +
                            "%)"}
                    </span>
                </span>
            </span>
            <div className="chart__graph">
                <ResponsiveContainer height={"85%"} minHeight={"320px"}>
                    <LineChart data={props.stats} margin={{ top: 5, right: 36.8, }}>
                        <XAxis dataKey="time" tickFormatter={getTimeFromDate} stroke={"var(--white-color)"}/>
                        <YAxis stroke={"var(--white-color)"} />
                        <Tooltip content={customTooltip} cursor={true} wrapperStyle={{outline: "none", borderRadius: "20px" }} />
                        <Legend
                            layout="horizontal"
                            alignmentBaseline="central"
                            align="center"
                        />
                        <Line
                            type="monotone"
                            dataKey="currentViewers"
                            legendType="circle"
                            strokeWidth={3}
                            name="Liczba widzów"
                            tickFormatter={formatDate}
                            stroke={"var(--purple-color)"}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="currentChatters"
                            legendType="circle"
                            strokeWidth={3}
                            name="Liczba chattersów"
                            stroke={"var(--green-color)"}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Chart;
