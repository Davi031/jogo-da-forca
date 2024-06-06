const inLetra = document.getElementById('inLetra')
const addLetra = document.getElementById('addLetra')
const traceOrLetters = document.getElementById('traceOrLetters')
const chancesDiv = document.getElementById('chances')
const playAgain = document.getElementById('playAgain')
const palavraNaForca = document.querySelector('#palavra')
const playGame = document.querySelector('#playGame')
const containsAllSecondBlock = document.querySelector('.containsAllSecondBlock')
const containsAllFirstBlock = document.querySelector('.containsAllFirstBlock')
const esconderPalavra = document.querySelector('#flexCheckDefault')

const partesDoCorpo = [
    document.querySelector('.cabeca'),
    document.querySelector('.corpo'),
    document.querySelector('.braco1'),
    document.querySelector('.braco2'),
    document.querySelector('.perna1'),
    document.querySelector('.perna2')
]

const gameData = {
    palavra: '',
    chances: 0,
    erros: [],
    letrasCorretas: []
}

playGame.addEventListener('click', () => {

    gameData.palavra = palavraNaForca.value.trim().toLowerCase()
    gameData.chances = gameData.palavra.length
    gameData.erros = []
    gameData.letrasCorretas = []

    if (gameData.palavra === '') {
        alert('Por favor, insira uma palavra para começar o jogo.')
        return
    }

    containsAllSecondBlock.style.display = "block"
    containsAllFirstBlock.style.display = "none"

    const listTrace = gameData.palavra.split('').map(letra => {
        if (letra === ' ') {
            return '-'
        } else {
            return '_'
        }
    }).join(' ')

    traceOrLetters.innerHTML = listTrace

    chancesDiv.textContent = `Chances: ${gameData.chances}`
})


addLetra.addEventListener('click', () => {
    verifyAnswer()
})

const verifyAnswer = () => {

    const wordOnInput = inLetra.value.trim().toLowerCase()
    inLetra.value = ''

    if (wordOnInput === '') {
        return
    }

    if (gameData.palavra.includes(wordOnInput)) {
        if (!gameData.letrasCorretas.includes(wordOnInput)) {
            gameData.letrasCorretas.push(wordOnInput)
        }
    } else {
        if (!gameData.erros.includes(wordOnInput)) {
            gameData.erros.push(wordOnInput)
            mostrarParteDoCorpo(gameData.erros.length)
        }
        chancesDiv.textContent = `Chances: ${gameData.chances - gameData.erros.length}`
    }

    traceOrLetters.innerHTML = atualizarPalavra()

    seRespostaErrada()
    seRespostaCorreta()

}

const seRespostaErrada = () => {
    if (gameData.erros.length >= gameData.chances) {
        const ultimaParte = partesDoCorpo[partesDoCorpo.length - 1]
        if (ultimaParte) {
            ultimaParte.style.display = 'block'
        }
        chancesDiv.textContent = 'Game Over: Você perdeu!'
        playAgain.style.display = 'block'
        addLetra.disabled = true
        return
    }
}

const seRespostaCorreta = () => {
    const letrasUnicas = gameData.palavra.replace(/\s/g, '')
        .split('')
        .filter((letra, index, arr) => arr.indexOf(letra) === index)

    if (gameData.letrasCorretas.length === letrasUnicas.length) {
        chancesDiv.textContent = 'Parabéns! Você adivinhou a palavra!'
        playAgain.style.display = 'block'
        addLetra.disabled = true
    }
}

const atualizarPalavra = () => {
    const novaPalavra = gameData.palavra.split('').map((letter) => {
        if (letter === ' ') {
            return '-'
        } else if (gameData.letrasCorretas.includes(letter)) {
            return letter
        } else {
            return '_'
        }
    })
    return novaPalavra.join(' ')
}


const mostrarParteDoCorpo = (numeroDeErros) => {
    if (numeroDeErros < partesDoCorpo.length) {
        const parte = partesDoCorpo[numeroDeErros - 1]
        if (parte) {
            parte.style.display = 'block'
        }
    }
}

esconderPalavra.addEventListener('click', () => {
    if (esconderPalavra.checked) {
        palavraNaForca.type = "password"
    } else {
        palavraNaForca.type = "text"
    }
})

playAgain.addEventListener('click', () => {
    window.location.reload()
})




