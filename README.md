# Client-side Real Time Face Recognition Using Angular11 and face-api.js

<p align="center">
    <h3 align="center">Project Overview</h3>
</p>

After searching for some cool Javascript face recognition libraries, I found out the<a href="https://justadudewhohacks.github.io/face-api.js/docs/index.html"> face-api.js</a>. Although it looked like an interesting and fully featured face recognition library, I also got to the conclusion that almost anyone tried to use it in conjunction with Angular, and those who did seemed to have some difficulties setting it up and making it functional overall, and for that reason I took the challenge.

Regarding the webcam stream I didn't use any Angular specific modules, I used simple and native Javascript functionalities to get the user media device to stream a real time video, and overlay that with the face detections results from face-api.js

You can see the results at this<a href="https://pedrosousa97.github.io/Angular-FaceRecognition/"> demo</a> page. Regarding the UI/UX I didn't invest much time on it, just used some elegant Neumorphism Custom divs, and that was basically it. I also made it responsive, so the Web App is accessible and functional in any device!


### Installation

Now let's move on to the description of the installation. If you want to clone the project, do the following steps:

1. Clone this repository:
   ```sh
   git clone https://github.com/PedroSousa97/Angular-FaceRecognition.git
   ```
2. cd to the project folder;
3. And then install the packages and dependencies:
   ```sh
   npm install
   ```


### Testing the Web App

* CD to the project directory, start Angular's Development Server now:
   ```sh
   ng serve 
   ```
* You can finally access the Web App at: http://localhost:4200/;

## Contact

If you encounter any difficulties, please contact via: henriquesantos293@gmail.com
