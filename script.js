/************************************************
 * Configuration
 ***********************************************/

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyPBiWQFc8JvNcl0XpfGtItyUptstMvc7loZ8Ge6uRkdZyC0DACNtJFzPK4iN0NVEOZNw/exec";

/************************************************
 * Reveal Hearts
 ***********************************************/

function reveal(el, text) {

    if (el.classList.contains("revealed"))
        return;

    el.classList.add("revealed");
    el.innerHTML = "<strong>" + text + "</strong>";

}

/************************************************
 * Floating Hearts
 ***********************************************/

function createHeartBurst(count = 25) {

    const holder = document.getElementById("hearts");

    for (let i = 0; i < count; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML =
            ["❤️","💕","💖","💗"][Math.floor(Math.random()*4)];

        heart.style.left = Math.random()*100 + "vw";
        heart.style.bottom = "-20px";
        heart.style.fontSize =
            (16 + Math.random()*24) + "px";

        heart.style.animationDuration =
            (4 + Math.random()*3) + "s";

        holder.appendChild(heart);

        setTimeout(()=>heart.remove(),7000);

    }

}

/************************************************
 * YES
 ***********************************************/

function acceptProposal(){

    console.log("YES Clicked");

    createHeartBurst(60);

    document.getElementById("result").innerHTML =
    "YES ❤️ Forever Begins Today!";

}

/************************************************
 * HUG
 ***********************************************/

function showHug(){

    console.log("HUG Clicked");

    createHeartBurst(20);

    document.getElementById("result").innerHTML =
    "HUG ❤️";

}

/************************************************
 * SAVE RESPONSE
 ***********************************************/

async function saveResponse(){

    console.clear();

    console.log("================================");
    console.log("SAVE RESPONSE");
    console.log("================================");

    const name =
        document.getElementById("name").value.trim();

    const message =
        document.getElementById("message").value.trim();

    const proposalResponse =
        document.getElementById("result").innerText || "";

    if(name===""){

        alert("Please enter your name ❤️");

        return;

    }

    if(message===""){

        alert("Please write a message ❤️");

        return;

    }

    const data={

        name:name,

        message:message,

        proposalResponse:proposalResponse,

        date:new Date().toLocaleString(),

        browser:navigator.userAgent,

        url:window.location.href

    };

    console.log("Collected Data");

    console.table(data);

    /*******************
     Save locally
    ********************/

    localStorage.setItem(
        "ourForeverStory",
        JSON.stringify(data)
    );

    document.getElementById("saveStatus").innerHTML =
    "Sending... ❤️";

    try{

        console.log("Sending request");

        await fetch(SCRIPT_URL,{

            method:"POST",

            mode:"no-cors",

            headers:{
                "Content-Type":"text/plain"
            },

            body:JSON.stringify(data)

        });

        console.log("Request Sent");

        document.getElementById("saveStatus").innerHTML =
        "❤️ Response submitted successfully! ❤️";

    }
    catch(err){

        console.error(err);

        document.getElementById("saveStatus").innerHTML =
        "❌ Unable to submit response.";

    }

}

/************************************************
 * DOWNLOAD
 ***********************************************/

function downloadResponse(){

    const saved =
        localStorage.getItem("ourForeverStory");

    if(!saved){

        alert("Please save your response first.");

        return;

    }

    const blob =
        new Blob([saved],{
            type:"application/json"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href=url;

    a.download="our-forever-memory.json";

    a.click();

    URL.revokeObjectURL(url);

}

/************************************************
 * LOAD
 ***********************************************/

window.onload=function(){

    console.log("Website Loaded");

    const saved =
        localStorage.getItem("ourForeverStory");

    if(saved){

        const data =
            JSON.parse(saved);

        document.getElementById("name").value =
            data.name || "";

        document.getElementById("message").value =
            data.message || "";

    }

    setInterval(function(){

        createHeartBurst(3);

    },3000);

};
