import { Component, OnDestroy, OnInit} from '@angular/core';
import * as faceapi from '../../assets/face-api'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit,OnDestroy {

  webStream:HTMLVideoElement; //variable used to hold the video HTML Element

  function:any; //Timeout variable that wil be used to ClearInterval at ngOnDestroy()

  constructor() { }

  ngOnInit(): void {
    //Start the stream (initialize webcam streaming)
    this.startStreaming();
    //hold the video HTML Element (casting it to an HTMLVideoElement)
    this.webStream = <HTMLVideoElement>(document.getElementById("webcam-stream"));
    //As soon as the streaming button is clicked, automatically scroll into the video section, good UX practice, removes unecessary scrolls
    this.webStream.scrollIntoView();
    //Add event listener to the video/stream, so that when it is currently playing, then we can start drawing the face detections!
    this.webStream.addEventListener('play', ()=>{
      //Hold the canvas HTML Element, casting it to a HTMLCanavasElement
      const canvas = <HTMLCanvasElement>document.getElementById("my-canvas");
      //Use the videoDimensions functions to get the exact and real video size, getting video size with generic JS functions may lead to wrong/unperfect sizes
      const displaySize =this.videoDimensions(this.webStream);
      //face-api functionality that matches the canvas dimensiosn to the video/stream dimensions
      faceapi.matchDimensions(canvas, displaySize);
      //hold the interval inside the function variable, this will be usefull to clear the interval on ngOnDestroy function
      //If the interval isn't cleared on the component lifecycle, new interval will be created upon the previous ones on each component initializations
      //this will eventually lead to memory leaks and unefficient/laggy component
      this.function= setInterval(async () =>{
        //detect faces
        const detections = await faceapi.detectAllFaces(this.webStream,
          new faceapi.TinyFaceDetectorOptions());
        //recize detections having into account the detections and desplaySize
        const resizeDetections = faceapi.resizeResults(detections,displaySize);
        //Clear previous detection
        if(resizeDetections.length){
          canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
          //draw newest detection
          faceapi.draw.drawDetections(canvas,resizeDetections);
        }
      },100) //At each 0,1s repeat the async arrow function, which means detect and draw the face detections
    })
  }

  ngOnDestroy(): void{
    //On destroy pause the video to trigger the event listener on pause that clears/stops the stream
    this.webStream.pause();
    //Clear the interval of the face detections
    clearInterval(this.function);
  }

  //Function to get the exact and precise video/stream size
  videoDimensions(video) {
    // Ratio of the video's intrisic dimensions
    var videoRatio = video.videoWidth / video.videoHeight;
    // The width and height of the video element
    var width = video.offsetWidth, height = video.offsetHeight;
    // The ratio of the element's width to its height
    var elementRatio = width/height;
    // If the video element is short and wide
    if(elementRatio > videoRatio) width = height * videoRatio;
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
      width: width,
      height: height
    };
  }

  startStreaming(){
    //Get face api models that will be used to create the face detections
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('assets/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('assets/models')
    ]).then(()=>{ //since it is a promise, only after all models are loaded then create the video/webcam stream
      //get media devices then get media stream (stream src)
      navigator.mediaDevices.getUserMedia({video: true})
      .then(function(mediaStream) {
        //get video HTML Element, casting it into an actual video element
        const webStream = <HTMLVideoElement>(document.getElementById("webcam-stream"));
        //video source = media stream
        webStream.srcObject = mediaStream;
        //after everything is loaded then play the stream
        webStream.onloadedmetadata = function(e) {
          webStream.play();
          //if video/stream is paused (in this case using ngOnDestroy()) then stop the stream (close webcam use)
          webStream.addEventListener('pause', ()=>{
            //clear video source
            webStream.src = "";
            //stop the webcam/stream
            mediaStream.getTracks()[0].stop();
          })
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
    })

  }
}
