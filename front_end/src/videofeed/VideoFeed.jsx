import React, {useState} from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import "./Livefeed.css";

export const VideoLiveFeed = () => {
    // window.location.href = '../videofeed';

    
    return(
        <div>
            <div class='live-feed-box'>
                <button class="kyle">SUBMIT</button>

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