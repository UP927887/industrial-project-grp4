// const express = require('express');
// const { spawn } = require('child_process');
// const app = express();
// let pyProg;

// app.get('/run-script', (req, res) => {
//     const pyProg = spawn('python',    
//                         ['./back-end/yolov7-main/detect.py', 
//                         '--weights', './back-end/yolov7.pt', 
//                         '--conf', '0.5', 
//                         '--img-size', '640', 
//                         '--source', './back-end/videos/america1.mp4', 
//                         '--classes', '1', '2', '3', '5', '7']);

//     pyProg.on('error', (err) => {
//         console.error(`Failed to start command: ${err}`);
//     });

//     pyProg.stdout.on('data', function(data) {
//         res.send(data.toString());
//     });
// });

// pyProg.stdout.on('data', (data) => {
//     console.log(data.toString());
// });
  
// pyProg.stderr.on('data', (data) => {
//     console.error(data.toString());
// });

// pyProg.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// });

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });

const express = require('express');
const { spawn } = require('child_process');

const app = express();
let pyProg;

app.get('/run-script', (req, res) => {
    pyProg = spawn('python', ['../../../back-end/yolov7-main/detect.py', 
                              '--weights', '../../back-end/yolov7.pt', 
                              '--conf', '0.5', 
                              '--img-size', '640', 
                              '--source', '../../../back-end/videos/america1.mp4', 
                              '--classes', '1', '2', '3', '5', '7']);

    pyProg.on('error', (err) => {
        console.error(`Failed to start command: ${err}`);
    });

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
    });

    pyProg.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    pyProg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.end();
    });
});

app.listen(4000, () => {
    console.log('Server started on port 4000');
});
