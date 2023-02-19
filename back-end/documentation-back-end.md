# Documentation for Back End
This section will be used to jot down understandable notes as well as resources that will be usefull for this project.
#### https://www.youtube.com/watch?v=zhFmaU9LBus -- YOLOv7 Explanation
#### https://github.com/WongKinYiu/yolov7 -- YOLOv7 Source Code

In order to run the basic detection use the line of code: (output is stored in back-end/yolov7/runs).   


    python detect.py --weights yolov7.pt --conf 0.25 --img-size 640 --source videos/america1.mp4 

 
This is not real time detection, a video is rendered and stored in the output listed above. Needs real time integration code.