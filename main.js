img="";
status="";
objects=[];
function preload(){}
function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetecter=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}
function modelloaded(){
    console.log("modelloaded");
    status="true";
}
function getresult(error ,results){
    if(error){
        console.log("error");
    }
    else {
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        objectdetecter.detect(video,getresult);
        r=random(255);
        g=random(255);
        b=random(255);
        for(var i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: Object Detecter"
            document.getElementById("no_objects").innerHTML="Number of objects detected: "+objects.length
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        textSize(25);
        text(objects[i].label + " " + percent + "%", objects[i].x+10,objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
 
        }
    }
}