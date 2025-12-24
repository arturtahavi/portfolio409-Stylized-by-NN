let possibleMoves = ['rock', 'paper', 'scissors']

let beats = {
    'rock': 'scissors',
    'paper': 'rock',
    'scissors': 'paper'
}

let totalPlays = 0
let wins = 0
let draws = 0
let losses = 0

function playerMove(choice){
    let player = choice
    let computer = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    
    // Обновляем лог игры
    document.getElementById('gameLog').innerHTML = 
        `<strong>Игрок:</strong> ${translateMove(player)}<br>
         <strong>Компьютер:</strong> ${translateMove(computer)}`
    
    totalPlays++
    document.getElementById('totalPlays').innerHTML = `Всего игр: ${totalPlays}`
    
    // Скрываем все изображения результатов
    document.getElementById("winImage").style.display = "none"
    document.getElementById("loseImage").style.display = "none"
    document.getElementById("drawImage").style.display = "none"
    
    // Определяем результат
    if (player == computer){
        document.getElementById('title').innerHTML = 'Ничья!'
        document.getElementById('title').style.color = '#f57c00'
        draws++
        document.getElementById("drawImage").style.display = "block"
    } else if (beats[player] == computer){
        document.getElementById('title').innerHTML = 'Вы победили! 🎉'
        document.getElementById('title').style.color = '#2e7d32'
        wins++
        document.getElementById("winImage").style.display = "block"
    } else {
        document.getElementById('title').innerHTML = 'Вы проиграли 😔'
        document.getElementById('title').style.color = '#d32f2f'
        losses++
        document.getElementById("loseImage").style.display = "block"
    }
    
    // Добавляем анимацию
    document.getElementById('title').classList.add('result-animation')
    setTimeout(() => {
        document.getElementById('title').classList.remove('result-animation')
    }, 500)
    
    // Обновляем статистику
    updateStats()
}

function updateStats() {
    document.getElementById('winsCell').innerHTML = wins
    document.getElementById('drawsCell').innerHTML = draws
    document.getElementById('lossesCell').innerHTML = losses
    
    let winsPercent = totalPlays > 0 ? (wins / totalPlays * 100).toFixed(1) : 0
    let drawsPercent = totalPlays > 0 ? (draws / totalPlays * 100).toFixed(1) : 0
    let lossesPercent = totalPlays > 0 ? (losses / totalPlays * 100).toFixed(1) : 0
    
    document.getElementById('winsPercentCell').innerHTML = winsPercent + '%'
    document.getElementById('drawsPercentCell').innerHTML = drawsPercent + '%'
    document.getElementById('lossesPercentCell').innerHTML = lossesPercent + '%'
}

function translateMove(move) {
    const translations = {
        'rock': 'Камень',
        'paper': 'Бумага', 
        'scissors': 'Ножницы'
    }
    return translations[move] || move
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    updateStats()
    
    // Добавляем обработчик нажатия клавиш
    document.addEventListener('keydown', function(event) {
        if (event.key === '1' || event.key === 'r') {
            playerMove('rock')
        } else if (event.key === '2' || event.key === 'p') {
            playerMove('paper')
        } else if (event.key === '3' || event.key === 's') {
            playerMove('scissors')
        }
    })
    
    console.log('Игра "Камень-Ножницы-Бумага" загружена!')
})