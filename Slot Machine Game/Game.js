let balance = 1000;  // Starting balance
let spinButton = document.getElementById('spinBtn');
let betAmountInput = document.getElementById('betAmount');
let balanceDisplay = document.getElementById('balance');
let messageDisplay = document.getElementById('message');

let reel1 = document.getElementById('reel1');
let reel2 = document.getElementById('reel2');
let reel3 = document.getElementById('reel3');

// Transaction buttons and input
let depositButton = document.getElementById('depositBtn');
let withdrawButton = document.getElementById('withdrawBtn');
let transactionAmountInput = document.getElementById('transactionAmount');

// Possible symbols on the reels
const symbols = ['🍒', '🍊', '🍇', '🍉', '⭐', '🍀', '💎', '🍓', '🍋'];

// Function to generate a random symbol
function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Function to spin the reels
function spinReels() {
    // Get the bet amount
    let betAmount = parseInt(betAmountInput.value);

    // Check if the player has enough balance
    if (betAmount > balance) {
        messageDisplay.textContent = "Insufficient balance!";
        messageDisplay.style.color = "red";
        return;
    }

    // Deduct the bet amount from balance
    balance -= betAmount;
    balanceDisplay.textContent = `Balance: $${balance}`;

    // Apply spinning animation
    reel1.classList.add('spinning');
    reel2.classList.add('spinning');
    reel3.classList.add('spinning');

    // Display spinning animation
    setTimeout(() => {
        // Remove spinning animation
        reel1.classList.remove('spinning');
        reel2.classList.remove('spinning');
        reel3.classList.remove('spinning');

        // Get random results for each reel
        let result1 = getRandomSymbol();
        let result2 = getRandomSymbol();
        let result3 = getRandomSymbol();

        // Update reel content
        reel1.textContent = result1;
        reel2.textContent = result2;
        reel3.textContent = result3;

        // Check for winning combination
        checkWin(result1, result2, result3, betAmount);
    }, 1500);
}

// Function to check if the player won
function checkWin(symbol1, symbol2, symbol3, betAmount) {
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        let winnings = betAmount * 50; // 50x multiplier for matching symbols
        balance += winnings;
        balanceDisplay.textContent = `Balance: $${balance}`;
        messageDisplay.textContent = `You Win! $${winnings} Payout!`;
        messageDisplay.style.color = "green";
    } else {
        messageDisplay.textContent = "Try Again!";
        messageDisplay.style.color = "red";
    }
}

// Event listener for the spin button
spinButton.addEventListener('click', spinReels);

// Deposit function
depositButton.addEventListener('click', function() {
    let amount = parseInt(transactionAmountInput.value);
    if (amount > 0) {
        balance += amount;
        balanceDisplay.textContent = `Balance: $${balance}`;
        messageDisplay.textContent = `Deposited $${amount}`;
        messageDisplay.style.color = "green";
    } else {
        messageDisplay.textContent = "Please enter a valid deposit amount!";
        messageDisplay.style.color = "red";
    }
});

// Withdraw function
withdrawButton.addEventListener