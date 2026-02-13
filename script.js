let stage = 0;
const reactionImg = document.getElementById('reaction-image');
const textDisplay = document.getElementById('text-display');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const safeCont = document.getElementById('safe-container');
const safeInput = document.getElementById('safe-input');
const unlockBtn = document.getElementById('unlock-btn');
const keyDisplay = document.getElementById('key-display');
const gameCont = document.getElementById('game-container');
const celeb = document.getElementById('celebration');

const CORRECT_CODE = "0828";

const content = [
    { img: "images/hearteyes.png", text: "Will you be my Valentine?" },        // Start
    { img: "images/bruh.png", text: "You can't be serious. Say yes." },      // No 1: Moves
    { img: "images/bleh.png", text: "How about now? Did your mind change yet?" },  // No 2: Shrinks
    { img: "images/smirking.png", text: "Come onnnn.. I know you wanna say yes" },   // No 3: Swap Text
    { img: "images/veryangry.png", text: "Are you really going through all this effort to reject me?" },    // No 4: Bouncing
    { img: "images/mweheheh.png", text: "Mwehehehe\n Now you have to say yes." },// No 5: Locked
    { img: "images/disgust.png", text: "huh?" }, // Click Key
    { img: "images/sad.png", text: "This will be the last time I'll ask you... will you be my Valentine?" }, //Second to last
    { img: "images/crashout.jpg", text: "Are you absolutely positively sure?" }, // last
    { img: "images/doom.jpeg", text: "Say yes." }, // last last
    { img: "images/mog.png", text: "I see how it is." },
    { img: "images/smirking.png", text: "or do you?" },
    { img: "images/hm.jpg", text: "Any time nowwww" },
    { img: "images/heartHands.png", text: "Oh no! The option disappeared!\n Oh nooo...\n\nWhatever should we do....\nWill you be my Valentine?" }    
];

function updateStage() {
    if (stage < content.length) {
        reactionImg.src = content[stage].img;
        textDisplay.innerText = content[stage].text;
    }
}

yesBtn.onclick = () => {
    if (stage === 3 && yesBtn.innerText === "No") {
        handleNoLogic();
    } else {
        gameCont.style.display = 'none';
        celeb.style.display = 'block';
    }
};

noBtn.onclick = () => {
    if (noBtn.classList.contains('locked')) return;
    if (stage === 3 && noBtn.innerText === "Yes") {
        gameCont.style.display = 'none';
        celeb.style.display = 'block';
    } else {
        handleNoLogic();
    }
};

function handleNoLogic() {
    stage++;
    noBtn.style.position = 'relative';
    noBtn.style.top = '0';
    noBtn.style.left = '0';

    if (stage === 1) {
        noBtn.style.position = 'absolute';
        noBtn.style.top = '-500px';
        noBtn.style.left = '500px';
    } else if (stage === 2) {
        noBtn.style.transform = 'scale(0.3)';
        noBtn.style.left = '50px';
        yesBtn.style.transform = 'scale(2.5)';
    } else if (stage === 3) {
        noBtn.style.transform = 'scale(1)';
        yesBtn.style.transform = 'scale(1)';
        noBtn.innerText = 'Yes';
        yesBtn.innerText = 'No';
    } else if (stage === 4) {
        noBtn.innerText = 'Yes';
        yesBtn.innerText = 'No';
        startBouncing();
    } else if (stage === 5) {
        stopBouncing();
        noBtn.innerText = 'No';
        yesBtn.innerText = 'Yes';

        noBtn.classList.add('locked');
        safeCont.style.display = 'block';
    } else if (stage === 7) {
        safeCont.style.display = 'none';

    }else if (stage === 8) {
        noBtn.innerText = 'Yes';
        yesBtn.innerText = 'No';

    }

    else if (stage === 9) {
        noBtn.innerText = 'No';
        yesBtn.innerText = 'Yes';

        noBtn.style.opacity = 0.8;
    }

    else if (stage === 10) {
        noBtn.style.opacity = 0.6;
    }
    else if (stage === 11) {
        noBtn.style.opacity = 0.4;
    }
    else if (stage === 12) {
        noBtn.style.opacity = 0.2;
    }
    else if (stage === 13) {
        noBtn.innerText = 'No';
        yesBtn.innerText = 'Yes!!';
        yesBtn.style.fontSize = "40px"
        yesBtn.style.padding = "30px 80px";


        noBtn.style.display = 'none';
    }
    updateStage();
}

unlockBtn.onclick = () => {
    if (safeInput.value === CORRECT_CODE) {
        document.getElementById('safe-ui').style.display = 'none';
        keyDisplay.style.display = 'block';
    } else {
        alert("Hint: You can definitely get this without a hint");
    }
};

keyDisplay.onclick = () => {
    noBtn.classList.remove('locked');
    keyDisplay.style.display = 'none';
    stage = 6;
    updateStage();
};

let bounceInterval;
function startBouncing() {
    noBtn.style.position = 'fixed';
    bounceInterval = setInterval(() => {
        const x = Math.random() * (window.innerWidth - 120);
        const y = Math.random() * (window.innerHeight - 60);
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    }, 800);
}

function stopBouncing() {
    clearInterval(bounceInterval);
}