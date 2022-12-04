const quiz = document.getElementById("quiz")
const interface = document.getElementById("interface")
const section = document.getElementsByTagName("section")
const listH = document.getElementsByClassName('hcheckbox')
const listK = document.getElementsByClassName('kcheckbox')
const inputAns = document.getElementById("answer")
const inputAnswers = document.getElementsByClassName("answer")
const progressBar = document.getElementsByClassName("progressInside")
const display = document.getElementById("display")
const caption = document.getElementById("caption")
const triesTxt = document.getElementById("triesTxt").children[0]
const lwScreen = document.getElementById("lw-screen")
const popup = document.getElementById("error-popup")
let displayX = []
let displayY = []
let displayZ = []
let tries = 3
let elements = 3
let goal = 10
let hits = 0
let score = 0
let misses = 0
let displayFontSize = 96
let arrayKana = [
    [["あ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["や", "ー", "ゆ", "ー", "よ"],
    ["ら", "り", "る", "れ", "ろ"],
    ["わ", "ー", "ん", "ー", "を"]],
    [["ア", "イ", "ウ", "エ", "オ"],
    ["カ", "キ", "ク", "ケ", "コ"],
    ["サ", "シ", "ス", "セ", "ソ"],
    ["タ", "チ", "ツ", "テ", "ト"],
    ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    ["マ", "ミ", "ム", "メ", "モ"],
    ["ヤ", "ー", "ユ", "ー", "ヨ"],
    ["ラ", "リ", "ル", "レ", "ロ"],
    ["ワ", "ー", "ン", "ー", "ヲ"]]
]
let arrayRomanji = [
    ["a", "i", "u", "e", "o"],
    ["ka", "ki", "ku", "ke", "ko"],
    ["sa", "shi", "su", "se", "so"],
    ["ta", "chi", "tsu", "te", "to"],
    ["na", "ni", "nu", "ne", "no"],
    ["ha", "hi", "fu", "he", "ho"],
    ["ma", "mi", "mu", "me", "mo"],
    ["ya", "ー", "yu", "ー", "yo"],
    ["ra", "ri", "ru", "re", "ro"],
    ["wa", "ー", "n", "ー", "wo"]
]
let countH = []
let countK = []
let answersLength = []
function load(){
    countH = JSON.parse(window.localStorage.getItem('listH'))
    for (let i = 0; i < arrayRomanji.length; i++) {
        if (countH.indexOf(i) !== -1){
            listH[i].checked = true
        }
    }
    countK = JSON.parse(window.localStorage.getItem('listK'))
    for (let i = 0; i < arrayRomanji.length; i++) {
        if (countK.indexOf(i) !== -1){
            listK[i].checked = true
        }
    }
    tries = window.localStorage.getItem('tries')
    document.getElementById("tries").value = tries
    elements = window.localStorage.getItem('elements')
    document.getElementById("elements").value = elements
}
function start(){
    setlist()
    tries = document.getElementById("tries").value
    elements = document.getElementById("elements").value
    if (tries > 0 && elements > 0){
        if (countH.length !== 0 || countK.length !== 0){
            popup.classList.remove('active')
            interface.style.display = "none"
            lwScreen.style.display = 'none'
            quiz.style.display = "block"
            quiz.style.pointerEvents = "auto"
            quiz.style.opacity = 1
            hits = 0
            score = 0
            misses = 0
            setmisses()
            if (elements >= 5){
                displayFontSize = section[0].offsetWidth * 8/10 / elements
            }else{
                displayFontSize = 96
            }
            caption.children[0].innerHTML = "Insira em <em>romanji</em> o que está escrito em <em>nihongo</em>"
            caption.style.backgroundColor = "var(--main)"
            inputAns.style.width = displayFontSize*elements*(105/100) + "px"
            while (inputAns.hasChildNodes()) {
                inputAns.removeChild(inputAns.firstChild);
            }
            for (let i = 0; i < elements; i++){
                var inputElement = document.createElement('input')
                inputElement.setAttribute('type', 'text')
                inputElement.setAttribute('class', 'answer')
                inputElement.setAttribute('id', 'answer' + i)
                inputElement.style.width = (displayFontSize * 7/10) + "px"
                inputElement.addEventListener('keyup', function(e){
                    if (e.which == 13){
                        answersLength = []
                        for (let i = 0; i < inputAnswers.length; i++){
                            if (String(inputAnswers[i].value).toLocaleLowerCase() == arrayRomanji[displayY[i]][displayZ[i]]){
                                answersLength.push(i)
                            }else if (inputAnswers[i].value == ""){
                                answersLength.push("")
                            }
                        }
                        if (answersLength.indexOf("") == -1){
                            if (answersLength.length == elements){
                                caption.children[0].innerHTML = "<strong>Acertou! </strong>"
                                caption.style.backgroundColor = "var(--green)"
                                score ++
                                hits ++
                                if (score == goal){
                                    fadeout(quiz, "ganhou!", "green")
                                }
                                progressBar[0].style.width = (score/goal)*100 + "%"
                            }else{
                                caption.children[0].innerHTML = "<strong>Errou! </strong>"
                                caption.style.backgroundColor = "var(--red)"
                                score > 0? score -- : score = 0
                                misses ++
                                hits ++
                                setmisses()
                                if (tries == misses){
                                    fadeout(quiz, "perdeu...", "red")
                                }
                                progressBar[0].style.width = (score/goal)*100 + "%"
                            }
                            for (let i = 0; i < elements; i++) {
                                caption.children[0].innerHTML += arrayKana[displayX[i]][displayY[i]][displayZ[i]]
                            }
                            caption.children[0].innerHTML += " = "
                            for (let i = 0; i < elements; i++) {
                                caption.children[0].innerHTML += arrayRomanji[displayY[i]][displayZ[i]]
                            }
                            input(elements);
                        }
                    }
                })
                inputAns.appendChild(inputElement)
                if (i == 0){
                    inputElement.focus()
                }
            }
            input(elements)
        }else{
            popup.classList.toggle('active')
            popup.children[0].innerHTML = "Selecione pelo menos uma fileira de <em>kanas</em>!"  
        }
    }else{
        popup.classList.toggle('active')
        popup.children[0].innerHTML = "Preencha os campos com números válidos!"
    }
}
function back(){
    interface.style.display = "block"
    lwScreen.style.display = "none"
    quiz.style.display = "none"
}
function fadeout(element, lw, txtColor){
    quiz.style.pointerEvents = "none"
    var op = 1
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer)
            element.style.display = 'none'
            lwScreen.style.display = 'block'
            lwScreen.children[0].innerHTML = "Você " + lw
            lwScreen.children[0].style.color = "var(--" + txtColor + ")"
            lwScreen.children[1].children[0].innerHTML = "Tentativas: " + hits
            lwScreen.children[1].children[1].innerHTML = "Precisão: " + Math.round(((hits - misses)/hits) * 100) + "%"
        }
        element.style.opacity = op
        op -= op * 0.1
    }, 50);
}
function saveLocalStorage(key){
    window.localStorage.setItem(key, document.getElementById(key).value)
}
function setlist(){
    countH = []
    for (let i = 0; i < arrayRomanji.length; i++) {
        if (listH[i].checked == true){
            countH.push(i)
        }
    }
    window.localStorage.setItem('listH', JSON.stringify(countH))
    countK = []
    for (let i = 0; i < arrayRomanji.length; i++) {
        if (listK[i].checked == true){
            countK.push(i)
        }
    }
    window.localStorage.setItem('listK', JSON.stringify(countK))
}
function setmisses(){
    triesTxt.children[0].innerHTML = ""
    triesTxt.children[1].innerHTML = ""
    for (let i = 0; i < misses; i++) {
        triesTxt.children[0].innerHTML += '\uf00d'
    }
    for (let i = 0; i < tries - misses; i++) {
        triesTxt.children[1].innerHTML += '\uf00d'
    }
}
function allBoxes(list){
    var mark = document.getElementsByClassName(list + 'checkbox')
    for (let i = 0; i < arrayRomanji.length; i++) {
        mark[i].checked = true
    }
    setlist()
}
function noneBoxes(list){
    var mark = document.getElementsByClassName(list + 'checkbox')
    for (let i = 0; i < arrayRomanji.length; i++) {
        mark[i].checked = false
    }
    setlist()
}
function random(max){
    var random = Math.round(Math.random() * max)
    return random
}
function chance(){
    if (countH.length == 0){
        return 1
    }else if (countK.length == 0){
        return 0
    }else{
        var odd = countH.length/(countH.length + countK.length)
        if (odd > Math.random()){
            return 0
        }else{
            return 1
        }
    }
}
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
function input(nRepeat) {
    display.style.fontSize = displayFontSize + "px"
    display.innerHTML = ""
    displayX = []
    displayY = []
    displayZ = []
    for (let i = 0; i < inputAnswers.length; i++) {
        inputAnswers[i].value = ""
        if (i == 0){
            inputAnswers[i].focus()
        }
    }
    for (let i = 0; i < nRepeat; i++) {
        displayX[i] = chance()
        if (displayX[i] == 0){
            do{
                displayY[i] = random(arrayKana[0].length - 1)
            }while (countH.indexOf(displayY[i]) == -1)
            do{
                displayZ[i] = random(4)
            }while (arrayKana[displayX[i]][displayY[i]][displayZ[i]] == "ー")
        }else{
            do{
                displayY[i] = random(arrayKana[1].length - 1)
            }while (countK.indexOf(displayY[i]) == -1)
            do{
                displayZ[i] = random(4)
            }while (arrayKana[displayX[i]][displayY[i]][displayZ[i]] == "ー")
        }
        display.innerHTML += arrayKana[displayX[i]][displayY[i]][displayZ[i]]
    }
}