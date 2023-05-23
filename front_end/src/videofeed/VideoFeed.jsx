import React, {useState} from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import "./Livefeed.css";
import {MoreData} from '../moredata/data';

export const VideoLiveFeed = () => {
    // window.location.href = '../videofeed';
    // LOGIC TO ADD MORE ROWS WHEN IT DETECTS VEHICLES
    const [src, setSrc] = useState("");

    const [moreData, setMoreData] = useState(false);

    const disPlayVideo = (event) => {
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

    const goToMoreData = () => {
        setMoreData(true)
    }

    return(

            <div className='live-feed-box'>
                {/* <button class="kyle">SUBMIT</button> */}

                <div className="videos">
                    <video src={src} controls width="100%">
                        Sorry, your browser doesn't support embedded videos.
                    </video>

                    <video src={src} controls width="100%">
                        Sorry, your browser doesn't support embedded videos.
                    </video>

                    <video src={src} controls width="100%">
                        Sorry, your browser doesn't support embedded videos.
                    </video>

                    <video src={src} controls width="100%">
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </div>

                <div class="options-container">

                    <input class="" type="file" onChange={disPlayVideo} />
                    
                    <button className="btn-login" type='submit'>
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

                <div className='btn-wrapper'>
                        <button 
                        className='btn-moredata' 
                        type='more-data' 
                        onClick={goToMoreData}
                        >
                            {moreData ? <MoreData/> : "More Data"}
                        </button>
                </div>

            </div>
    )
}