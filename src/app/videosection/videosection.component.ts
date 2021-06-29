import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-videosection',
  templateUrl: './videosection.component.html',
  styleUrls: ['./videosection.component.css']
})
export class VideosectionComponent implements OnInit {

  isStreaming:boolean; //Simple boolean used to check if the button is active or not

  streamsupport:boolean; //Boolean used to hold the straming compatibility check

  buttonDiv:HTMLElement;  //Used to hold the button div HTML Element

  buttonIcon:HTMLElement; //Used to hold the button Icon HTML Element

  constructor() {}

  ngOnInit(): void {
    this.isStreaming = false; //Initialize variables basically and assign the HTML Elements to the respective variables
    this.streamsupport = true; //Stream support is initialized as true, to make sure the compatibility banner doesn't come up
    this.buttonDiv = document.getElementById("button-div");
    this.buttonIcon = document.getElementById("Icon");
  }

  StartStream(){
    if (navigator.getUserMedia){  //Check if user media device supports streaming
      this.streamsupport = true;
    }else{  //If device doesn't support it, video component will be hidden and a banner will be shown on it's place warning about incompatibility
      this.streamsupport = false;
    }

    this.isStreaming = !this.isStreaming; //Change the button state (active/unactive)

    if(this.isStreaming == true){ //The streaming variable will be used not only to enable the video component but also to style the button when active/unactive
      this.buttonIcon.className="fas fa-pause"; //Change the button icon to pause icon
      this.buttonIcon.setAttribute("style", "color: red") //Change icon color to red
      this.buttonDiv.setAttribute("style", "box-shadow: inset 30px 30px 60px #323232,inset -30px -30px 60px #5c5c5c;")  //change button box-shadow to simulate a pressed button
    }else{
      this.buttonIcon.className="fas fa-video"; //Change the button icon to camera icon once again and change the color to original blue
      this.buttonIcon.setAttribute("style", "color: rgb(40, 138, 230)")
      this.buttonDiv.setAttribute("style", "box-shadow: 12px 12px 23px #3c3c3c, -12px -12px 23px #525252;") //change button box-shadow to simulate an unpressed button
    }
  }

}
