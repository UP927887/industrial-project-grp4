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

    function handleClick() {
        // const { spawn } = require('child_process');
        // const pyProg = spawn('python',    
        //                     ['./back-end/yolov7-main/detect.py', 
        //                     '--weights', './back-end/yolov7.pt', 
        //                     '--conf', '0.5', 
        //                     '--img-size', '640', 
        //                     '--source', './back-end/videos/america1.mp4', 
        //                     '--classes', '1', '2', '3', '5', '7']);
        // pyProg.stdout.on('data', function(data) {
        //     console.log(data.toString());
        // });
        fetch('http://localhost:4000/run-script')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return(
        <div>
            <div className='live-feed-box'>
                {/* <button class="kyle">SUBMIT</button> */}
                
                <video src={src} controls width="100%">
                    Sorry, your browser doesn't support embedded videos.
                </video>

                <input type="file" onChange={handleChange} />

                <button type='Sumbit' onClick={handleClick}>
                    Run Detection Program
                </button>
            </div>

            <div className='summary'>
                <table class = "summary-table-count">
                    <tbody>
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
                    </tbody>
                </table>
                <table className="summary-table-time">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
            <button className='more-data'>More Data</button>
        </div>
    )
}