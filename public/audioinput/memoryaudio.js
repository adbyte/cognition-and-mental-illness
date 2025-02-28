const micbutton=document.querySelector(".fa-microphone");
const transcriptionelement=document.querySelector(".transcription");
const stopbutton=document.querySelector(".stoprec");
let isrecording=false;
let recognition;
if('webkitSpeechRecognition' in window){
    recognition=new webkitSpeechRecognition();
}
else if('SpeechRecognition' in window){
    recognition=new SpeechRecognition();

}
else{
    alert("bro !! not with this");
}
if(recognition){
    recognition.continuous=true;
    recognition.interimResults=false;
    recognition.lang='en-US';

    recognition.onstart=()=>{
        isrecording=true;
        stopbutton.style.display="block";
        stopbutton.textContent='🔴 Stop Recording';
        transcriptionelement.style.display="block";
    }

    recognition.onresult=(event)=>{
          const transcript=event.results[event.results.length-1][0].transcript.trim();
          transcriptionelement.textContent=`Transcription:${transcript}`;
          analyzetranscript(transcript);
    }
    recognition.onerror=(event)=>{
        console.error('speech ka error :',event);
        isrecording=false;
    }

    recognition.onend=()=>{
        isrecording=false;
        
    }
    micbutton.addEventListener('click',()=>{
        if(isrecording){
            recognition.stop();
        }
        else{
            recognition.start();
        }
    });
}
else{
    micbutton.disabled=true;
}
var scorecount=0;
function analyzetranscript(transcript){
    let group1 = ["moon", "trophy", "cow", "boy", "teacher", "train", "rail", "phone", "pig", "goat", "star", "sheep", "horse", "cock", "hen", "god", "krishna", "farmer", "man", "flower", "grapes", "road", "car", "banana"];
    let group2 = ["x-mas tree", "tree", "mouse", "hat", "bulb", "globe", "rainbow", "statue of liberty", "statue", "woman", "lady", "santa", "christmas", "clock", "table", "book", "phone", "school", "mobile", "watermelon", "cupboard", "almirah", "scissor", "bag", "mirror", "rat", "building", "lion", "mango", "pigeon", "chair", "vase", "light", "laptop"];
    for(let i=0;i<group1.length;i++){
        if(transcript.includes(group1[i])){
            scorecount++;
            console.log(group1[i]," is found");
        }
    }
    for(let i=0;i<group2.length;i++){
        if(transcript.includes(group2[i])){
            scorecount++;
            console.log(group2[i]," is found");
        }
    }
    let accuracy = (scorecount / (group1.length + group2.length)) * 100;
            let accuracyFormatted = accuracy.toFixed(2);
            let scoreValue = document.querySelector(".scoreValue");
            scoreValue.textContent = accuracyFormatted + "%";

            let conclusion = document.querySelector(".conclusion");
            if (accuracy <= 33.33) {
                conclusion.textContent = "Less Memorable";
            } else if (accuracy <= 67) {
                conclusion.textContent = "Average Memorable";
            } else {
                conclusion.textContent = "Highly Memorable";
            }

}
