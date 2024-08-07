let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#new-btn");

let turnO = true; //player X, player O
let count = 0;
let winnerFound = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            //player O
            box.innerText = "O";
            turnO = false;
        } else {
            //player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; //so that we can't change text of box from O to X and vice versa
        count++;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                return; // Exit the function once a winner is found
            }
        }
    }
    if (!winnerFound && count === 9) {
        showDraw();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "Draw! Game has no Winner.";
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable boxes to prevent further moves
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

//----------clicking reset button / new game button-------

const resetGame = () => {
    turnO = true;
    count = 0;
    winnerFound = false; // Reset the winnerFound flag
    enableBoxes();
    msgContainer.classList.add("hide");
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
