import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import "./Livefeed.css";

export const VideoLiveFeed = () => {
    // window.location.href = '../videofeed';

    // https://www.upbeatcode.com/react/how-to-play-video-in-react/
    const [src, setSrc] = useState("");

    const handleChange = (event) => {
        try {
            // Get the uploaded file
            const file = event.target.files[0];
            // const file = "back-end/videos/america1.mp4";

            // Transform file into blob URL
            setSrc(URL.createObjectURL(file));
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <div class='live-feed-box'>
                {/* <button class="kyle">SUBMIT</button> */}
                
                <video src={src} controls width="100%">
                    Sorry, your browser doesn't support embedded videos.
                </video>

                <input type="file" onChange={handleChange} />

                <button type='Sumbit'>
                    Run Detection Program
                </button>
            </div>

            <div class='summary'>
                <table class = "summary-table-count">
                    <tr id = 'rows'>
                        <th id='car'>Category</th>
                        <th class='count'>Count</th>
                    </tr>
                    <tr>
                        <td>Truck</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Car</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Bike</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Motorbike</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>Bus</td>
                        <td>8</td>
                    </tr>
                </table>
                <table class="summary-table-time">
                    {/* <div class = 'lol'> */}
                    <tr id = 'rows'>
                        <th id='car'>Car Type</th>
                        <th class='timestamp'>Video Stamp</th>
                    </tr>
                    <tr id = 'rows'>
                        <td>Truck</td>
                        <td>9th Janury 2022 12:09:11</td>
                    </tr>
                    <tr id = 'rows'>
                        <td>Car</td>
                        <td>8th Janury 2022 12:09:11</td>
                    </tr>
                    <tr id = 'rows'>
                        <td>Bike</td>
                        <td>9th Janury 2022 12:09:11</td>
                    </tr>
                    <tr id = 'rows'>
                        <td>Truck</td>
                        <td>9th Janury 2022 12:09:11</td>
                    </tr>
                    {/* </div> */}
                </table>
            </div>
            <button class='more-data'>More Data</button>
        </div>
    )
}