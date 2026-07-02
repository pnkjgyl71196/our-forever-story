/****************************************************
 * CONFIGURATION
 ****************************************************/


/****************************************************
 * HEART REVEAL
 ****************************************************/

function reveal(el, text) {

    if (el.classList.contains("revealed"))
        return;

    el.classList.add("revealed");
    el.innerHTML = "<strong>" + text + "</strong>";

}

/****************************************************
 * HEART BURST
 ****************************************************/

function createHeartBurst(count = 25) {

    for (let i = 0; i < count; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML =
            ["❤️", "💖", "💕", "💗"][Math.floor(Math.random() * 4)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-20px";
        heart.style.fontSize = (16 + Math.random() * 24) + "px";
        heart.style.animationDuration = (4 + Math.random() * 3) + "s";

        document.getElementById("hearts").appendChild(heart);

        setTimeout(() => heart.remove(), 7000);
    }

}

/****************************************************
 * YES
 ****************************************************/

function acceptProposal() {

    console.log("❤️ YES clicked");

    createHeartBurst(60);

    document.getElementById("result").innerHTML =
        "YES ❤️ Forever Begins Today!";

}

/****************************************************
 * HUG
 ****************************************************/

function showHug() {

    console.log("🤗 HUG clicked");

    createHeartBurst(20);

    document.getElementById("result").innerHTML =
        "HUG ❤️ Give me the biggest hug first!";

}

/****************************************************
 * SAVE RESPONSE
 ****************************************************/

async function saveResponse() {

    console.clear();

    console.log("=======================================");
    console.log("SAVE RESPONSE STARTED");
    console.log("=======================================");

    const data = {

        name:
            document.getElementById("name").value || "My Love",

        message:
            document.getElementById("message").value,

        proposalResponse:
            document.getElementById("result").innerText,

        accepted:
            document
                .getElementById("result")
                .innerText
                .toUpperCase()
                .includes("YES"),

        date:
            new Date().toLocaleString(),

        browser:
            navigator.userAgent,

        page:
            window.location.href

    };

    console.log("Collected Data");

    console.table(data);

    /**************
     Local Backup
     **************/

    localStorage.setItem(
        "ourForeverStory",
        JSON.stringify(data)
    );

    console.log("✔ Saved locally.");

    if (
        SCRIPT_URL.includes(
            "PASTE_YOUR_SCRIPT_ID"
        )
    ) {

        console.error(
            "Apps Script URL missing."
        );

        document.getElementById(
            "saveStatus"
        ).innerHTML =
            "❌ Configure SCRIPT_URL first.";

        return;
    }

    document.getElementById(
        "saveStatus"
    ).innerHTML =
        "Sending your beautiful message ❤️";

    try {

        console.log(
            "Sending POST request..."
        );

        console.log(SCRIPT_URL);

        const response =
            await fetch(
                SCRIPT_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body:
                        JSON.stringify(data)

                }
            );

        console.log(
            "HTTP STATUS:",
            response.status
        );

        const text =
            await response.text();

        console.log(
            "SERVER RESPONSE:"
        );

        console.log(text);

        if (response.ok) {

            document.getElementById(
                "saveStatus"
            ).innerHTML =
                "❤️ Response delivered successfully to Bunny ❤️";

            console.log(
                "SUCCESS"
            );

        } else {

            document.getElementById(
                "saveStatus"
            ).innerHTML =
                "Server returned an error.";

            console.error(
                "Server Error"
            );

        }

    } catch (error) {

        console.error(
            "FETCH ERROR"
        );

        console.error(error);

        document.getElementById(
            "saveStatus"
        ).innerHTML =
            "❌ Failed to send response.";

    }

    console.log(
        "SAVE RESPONSE FINISHED"
    );

}

/****************************************************
 * DOWNLOAD
 ****************************************************/

function downloadResponse() {

    const saved =
        localStorage.getItem(
            "ourForeverStory"
        );

    if (!saved) {

        alert(
            "Please save a response first."
        );

        return;

    }

    const blob =
        new Blob(
            [saved],
            {
                type:
                    "application/json"
            }
        );

    const url =
        URL.createObjectURL(
            blob
        );

    const a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "our-forever-memory.json";

    a.click();

    URL.revokeObjectURL(
        url
    );

}

/****************************************************
 * AUTO LOAD
 ****************************************************/

window.onload = function () {

    console.log(
        "Website Loaded"
    );

    const saved =
        localStorage.getItem(
            "ourForeverStory"
        );

    if (saved) {

        console.log(
            "Loading previous response."
        );

        const data =
            JSON.parse(saved);

        document.getElementById(
            "name"
        ).value =
            data.name || "";

        document.getElementById(
            "message"
        ).value =
            data.message || "";

    }

    setInterval(
        () => createHeartBurst(3),
        3000
    );

};
