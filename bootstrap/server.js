const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const qrcode = require('qrcode');
const path = require('path');
const basicAuth = require('express-basic-auth');
const { Mutex } = require('async-mutex');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

app.get('/', (req, res) => {
  let url = `${req.protocol}://${req.get('host')}/player2`;
  let qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;

  res.send(`
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
      .responsive-text {
        font-size: calc(1vw + 1vh + .5vmin);
      }
      .responsive-text h2 {
        font-size: calc(1.5vw + 1.5vh + .75vmin);
        font-weight: bold;
        margin-bottom: 1em;
      }
      .responsive-text p {
        margin-bottom: 1em;
      }
      @media (max-width: 768px) {
        .responsive-text {
          font-size: calc(2vw + 2vh + 1vmin);
        }
        .responsive-text h2 {
          font-size: calc(3vw + 3vh + 1.5vmin);
        }
      }
      body {
  background-color: #001c31;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0,0 L40,40 M40,0 L0,40' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E");
}
    </style>
    </head>
    <body class="flex flex-col justify-between items-center h-screen p-4 text-2xl">
      <div class="order-first flex justify-center items-center w-full mb-4 mt-4 h-1/4">
        <img class="w-1/2 h-auto block mx-auto" src="/images/mainlogo.png" alt="Main Logo">
      </div>
      <div class="flex justify-between items-stretch max-w-9/10 mx-auto w-full box-border flex-grow h-1/2">
        <div class="flex flex-col justify-center items-center border-2 border-gray-300 p-5 rounded-lg shadow-2xl w-full box-border mr-2 flex-grow flex-shrink" style="background-color: #FADD0B;">
          <div class="box-border w-full h-full text-center text-base font-sans text-xl p-4 flex flex-col justify-center items-center responsive-text">
            <h2 class="font-bold text-2xl mb-4">How to Play</h2>
            <p>1. Scan the QR code to join the game.</p>
            <p>2. Choose rock, paper, or scissors.</p>
            <p>3. Wait for the other player to make their choice.</p>
            <p>4. The winner is revealed!</p>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center w-full box-border ml-2 flex-grow flex-shrink">
          <img src="${qrCodeUrl}" alt="QR Code" class="mx-auto w-1/2">
        </div>
      </div>
      <div class="order-last flex justify-center items-center w-full mt-4 mb-4 h-1/4">
        <img class="w-1/4 h-auto block mx-auto" src="/images/tenlogo.png" alt="Ten Logo">
        <img class="w-1/4 h-auto block mx-auto" src="/images/quote.png" alt="Quote">
        <img class="w-1/4 h-auto block mx-auto" src="/images/azurelogo.png" alt="Azure Logo">
      </div>
    </body>
  `);
});

app.get('/', (req, res) => {
  let url = `${req.protocol}://${req.get('host')}/player2`;
  let qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}`;

  res.send(`
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
      .responsive-text {
        font-size: calc(1vw + 1vh + .5vmin);
      }
      .responsive-text h2 {
        font-size: calc(1.5vw + 1.5vh + .75vmin);
        font-weight: bold;
        margin-bottom: 1em;
      }
      .responsive-text p {
        margin-bottom: 1em;
      }
      @media (max-width: 768px) {
        .responsive-text {
          font-size: calc(2vw + 2vh + 1vmin);
        }
        .responsive-text h2 {
          font-size: calc(3vw + 3vh + 1.5vmin);
        }
      }
      body {
        background: repeating-linear-gradient(
          45deg,
          #001c31,
          #001c31 10px,
          #003152 10px,
          #003152 20px
        );
      }
    </style>
    </head>
    <body style="background-color: #001c31;" class="flex flex-col justify-between items-center h-screen p-4 text-2xl overflow-hidden">
      <div class="order-first flex justify-center items-center w-full mb-10 mt-10">
        <img class="w-1/4 h-auto block mx-auto" src="/images/mainlogo.jpeg" alt="Main Logo">
      </div>
      <div class="flex justify-between items-stretch max-w-9/10 mx-auto w-full box-border flex-grow">
        <div class="flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 border-2 border-gray-300 p-5 rounded-lg shadow-2xl w-full box-border mr-2 flex-grow flex-shrink overflow-auto">
          <div class="box-border w-full h-full text-center text-base font-sans text-white text-xl p-4 flex flex-col justify-center items-center responsive-text">
            <h2 class="font-bold text-2xl mb-4">How to Play</h2>
            <p>1. Scan the QR code to join the game.</p>
            <p>2. Choose rock, paper, or scissors.</p>
            <p>3. Wait for the other player to make their choice.</p>
            <p>4. The winner is revealed!</p>
          </div>
        </div>
        <div class="flex flex-col justify-center items-center w-full box-border ml-2 flex-grow flex-shrink overflow-auto">
          <img src="${qrCodeUrl}" alt="QR Code" class="mx-auto w-1/2">
        </div>
      </div>
      <div class="order-last flex justify-center items-center w-full mt-10 mb-10">
        <img class="w-1/2 h-auto block mx-auto" src="/images/azurelogo.png" alt="Azure Made">
      </div>
    </body>
  `);
});

app.use(express.urlencoded({ extended: true }));

let votes = { rock: 0, paper: 0, scissors: 0 };
let player1Voted = false;

app.use('/player1', basicAuth({
  users: { 'admin': 'supersecret' }, // Replace with your username and password
  challenge: true,
  realm: 'Imb4T3st4pp',
}));

app.get('/player1', (req, res) => {
  res.send(`
    <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-2xl text-white uppercase" style="background-color: #111827; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);">
      <div class="absolute top-0 left-0 right-0 h-16 bg-black"></div>
      <h1 class="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-8">Player 1</h1>
      <h2 class="text-2xl font-bold text-white drop-shadow-lg mb-8">Player 2 has voted ${player2Votes} times.</h2>
      <form action="/vote1" method="post" class="flex items-center justify-center space-x-4">
        <button type="submit" name="vote" value="rock" class="flex flex-col items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
          <img src="./images/rock.png" alt="Rock" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Rock</span>
        </button>
        <button type="submit" name="vote" value="paper" class="flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700">
          <img src="./images/paper.png" alt="Paper" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Paper</span>
        </button>
        <button type="submit" name="vote" value="scissors" class="flex flex-col items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700">
          <img src="./images/scissors.png" alt="Scissors" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Scissors</span>
        </button>
      </form>
      <h2 class="text-3xl font-bold text-yellow-300 drop-shadow-lg mt-8">Make Your Choice</h2>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>
    </body>
  `);
});


app.get('/player2', (req, res) => {
  res.send(`
    <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-2xl text-white uppercase" style="background-color: #111827; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);">
      <div class="absolute top-0 left-0 right-0 h-16 bg-black"></div>
      <h1 class="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-8">Player 2</h1>
      <form action="/vote2" method="post" class="flex items-center justify-center space-x-4">
        <button type="submit" name="vote" value="rock" class="flex flex-col items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700">
          <img src="./images/rock.png" alt="Rock" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Rock</span>
        </button>
        <button type="submit" name="vote" value="paper" class="flex flex-col items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700">
          <img src="./images/paper.png" alt="Paper" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Paper</span>
        </button>
        <button type="submit" name="vote" value="scissors" class="flex flex-col items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700">
          <img src="./images/scissors.png" alt="Scissors" class="mb-2">
          <span class="text-2xl font-bold uppercase tracking-widest">Scissors</span>
        </button>
      </form>
      <h2 class="text-3xl font-bold text-yellow-300 drop-shadow-lg mt-8">Make Your Choice</h2>
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>
    </body>
  `);
});

app.post('/vote1', async (req, res) => {
  console.log('Player 1 voted for ' + req.body.vote);
  player1Voted = true;

  // Update the votes object
  if (!votes[req.body.vote]) {
    votes[req.body.vote] = { 'Player 1': 0, 'Player 2': 0 };
  }
  votes[req.body.vote]['Player 1']++;

  let maxVote = Object.keys(votes).reduce((a, b) => votes[a]['Player 2'] > votes[b]['Player 2'] ? a : b);

  // Determine the winner
  let winner;
  if (req.body.vote === maxVote) {
    winner = 'It\'s a tie!';
  } else if (
    (req.body.vote === 'rock' && maxVote === 'scissors') ||
    (req.body.vote === 'paper' && maxVote === 'rock') ||
    (req.body.vote === 'scissors' && maxVote === 'paper')
  ) {
    winner = 'Player 1 wins!';
  } else {
    winner = 'Player 2 wins!';
  }
  console.log(`Player 2 vote is ${maxVote}. Player 1 vote is ${req.body.vote}.\n\n${winner}`);



res.send(`
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-2xl text-white uppercase" style="background-color: #111827; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);">
    <div class="absolute top-0 left-0 right-0 h-16 bg-black"></div>
    <h1 class="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-8">${winner}</h1>
    <div class="flex justify-center space-x-4 w-3/4">
      <div class="p-8 rounded-lg shadow-md text-black w-full" style="background-color: #FADD0B;">
        <h2 class="text-2xl font-bold uppercase tracking-widest mb-4">Results</h2>
        <table class="w-full text-lg text-black">
          <tr>
            <th class="text-left py-2">Player</th>
            <th class="text-left py-2">Vote</th>
          </tr>
          <tr>
            <td class="py-2">Player 1</td>
            <td class="py-2">${req.body.vote}</td>
          </tr>
          <tr>
            <td class="py-2">Player 2</td>
            <td class="py-2">${maxVote}</td>
          </tr>
        </table>
      </div>
      <div class="p-8 rounded-lg shadow-md text-black w-full" style="background-color: #4BDBC5;">
        <h2 class="text-2xl font-bold uppercase tracking-widest mb-4">Vote Count</h2>
        <table class="w-full text-lg text-black">
          <tr>
            <th class="text-left py-2">Choice</th>
            <th class="text-left py-2">Count</th>
          </tr>
          <tr>
            <td class="py-2">Rock</td>
            <td class="py-2">${votes.rock && votes.rock['Player 2'] || 0}</td>
          </tr>
          <tr>
            <td class="py-2">Paper</td>
            <td class="py-2">${votes.paper && votes.paper['Player 2'] || 0}</td>
          </tr>
          <tr>
            <td class="py-2">Scissors</td>
            <td class="py-2">${votes.scissors && votes.scissors['Player 2'] || 0}</td>
          </tr>
        </table>
      </div>
    </div>
    <form action="/newgame" method="post">
      <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700">New Game</button>
    </form>
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-black"></div>
  </body>
`);
});

// Create a new Mutex instance
const voteMutex = new Mutex();

let player2Votes = 0;

app.post('/vote2', async (req, res) => {
  const vote = req.body.vote;

  // Validate the vote
  if (!['rock', 'paper', 'scissors'].includes(vote)) {
    return res.status(400).send('Invalid vote. Vote must be "rock", "paper", or "scissors".');
  }

  // Process the vote inside a mutex lock
  await voteMutex.runExclusive(async () => {
    console.log('Player 2 voted for ' + vote);

    // Update the votes object
    if (!votes[vote]) {
      votes[vote] = { 'Player 1': 0, 'Player 2': 0 };
    }
    votes[vote]['Player 2']++;
    player2Votes++;

    if (!player1Voted) {
      res.send(`
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-2xl text-white uppercase" style="background-color: #111827; background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px);">
          <div class="absolute top-0 left-0 right-0 h-16 bg-black"></div>
          <h1 class="text-4xl font-bold text-yellow-300 drop-shadow-lg mb-8">Thank you for your vote, Player 2!</h1>
        </body>
      `);
    } else {
      let maxVote = Object.keys(votes).reduce((a, b) => votes[a]['Player 2'] > votes[b]['Player 2'] ? a : b);

      res.send(`
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body class="flex flex-col items-center justify-center min-h-screen text-center p-4 text-2xl text-blue-900 uppercase" style="background-color: #007FFF;">
          <h1 class="text-4xl font-bold text-blue-500 drop-shadow-lg mb-8">Player 2's vote is ${maxVote}. Here's the vote count: ${JSON.stringify(votes)}</h1>
        </body>
      `);
    }
  });
});

app.post('/newgame', (req, res) => {
  // Reset the votes
  votes = { rock: { 'Player 1': 0, 'Player 2': 0 }, paper: { 'Player 1': 0, 'Player 2': 0 }, scissors: { 'Player 1': 0, 'Player 2': 0 } };
  player1Voted = false;
  player2Votes = 0;

  // Redirect to the Player 2 voting page
  res.redirect('/player2');
});

app.get('/stresstest', async (req, res) => {
  const options = ['rock', 'paper', 'scissors'];

  for (let i = 0; i < 100; i++) {
    const vote = options[Math.floor(Math.random() * options.length)];

    // Process the vote inside a mutex lock
    await voteMutex.runExclusive(async () => {
      // Update the votes object
      if (!votes[vote]) {
        votes[vote] = { 'Player 1': 0, 'Player 2': 0 };
      }
      votes[vote]['Player 2']++;
      player2Votes++;
    });
  }

  res.send('Stress test completed. Player 2 has voted 100 times.');
});