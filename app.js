const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    })
});

let balance = 1000;
let bet = 10;
let probabolity = {
    '🎵' : 50,
    '🗿' : 30,
    '📀' : 20
};

const symbols = ['🎵','🗿','📀'];

function spinReels(){
    if(balance < bet){
        alert('Nemas money');
        return;
    }

    balance -= bet;
    updateBalance();

    const reelElements = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')]
    const interval = setInterval(() => {
        reelElements.forEach(reel => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)]; 
        })
    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        const reels = [];
        for(let i = 0; i < 3; i++){
            reels.push(getRandomSymbol());
        }

        reelElements.forEach((reel, index) => {
            reel.textContent = reels[index];
        });

        if(reels[0] === reels[1] && reels[1] === reels[2]){
            const winAmount = 5 * bet;
            balance += winAmount;
            updateBalance();
            document.getElementById('result').textContent = `Vyhral jsi ${winAmount}`;
        } else{
            document.getElementById('result').textContent = 'Zatoc si znovu';
        }
    }, 3000);
}

function getRandomSymbol(){
    const total = Object.values(probabolity).reduce((a, b) => a + b , 0);
    let rand = Math.random() * total;
    for(const symbol of symbols){
        if(rand < probabolity[symbol]){
            return symbol;
        }
        rand -= probabolity[symbol];
    }
}

function updateBalance(){
    document.getElementById('balance').textContent = balance; 
}

function setBet(){
    const newBet = parseInt(document.getElementById('bet').value);
    if(newBet > 0 && newBet <= balance){
        bet = newBet;
        document.getElementById('current-bet').textContent = bet;
    } else{
        alert("Neplatna sazka");
    }
}

function setting(){
    const cherryProb = parseInt(document.getElementById('cherry-prob').value) || 0;
    const lemonProb = parseInt(document.getElementById('lemon-prob').value) || 0;
    const watermelonProb = parseInt(document.getElementById('watermeloun-prob').value) || 0;

    const total = cherryProb + lemonProb + watermelonProb;
    if (total !== 100) {
        alert('Součet pravděpodobností musí být 100%!');
        return;
    }

    probabolity['🎵'] = cherryProb;
    probabolity['🗿'] = lemonProb;
    probabolity['📀'] = watermelonProb;

    alert('Nastavení uloženo.');
}

//evetn listenery
document.getElementById('spin-button').addEventListener('click', spinReels);
document.getElementById('set-bet').addEventListener('click', setBet);
document.getElementById('save-setting').addEventListener('click', setting);