const quiz = document.getElementById("quiz")
const interface = document.getElementById("interface")
const listH = document.getElementsByClassName('hcheckbox')
const listK = document.getElementsByClassName('kcheckbox')
const inputAns = document.getElementsByClassName("answer")
const inputAns1 = document.getElementById("answer1")
const inputAns2 = document.getElementById("answer2")
const inputAns3 = document.getElementById("answer3")
const display = document.getElementById("display")
const caption = document.getElementById("caption")
let displayX = []
let displayY = []
let displayZ = []
let tries = 3
let arrayKana = [
    [["あ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["や", "ー", "ゆ", "ー", "よ"],
    ["わ", "ー", "ん", "ー", "を"]],
    [["ア", "イ", "ウ", "エ", "オ"],
    ["カ", "キ", "ク", "ケ", "コ"],
    ["サ", "シ", "ス", "セ", "ソ"],
    ["タ", "チ", "ツ", "テ", "ト"],
    ["ナ", "ニ", "ヌ", "ネ", "ノ"],
    ["ハ", "ヒ", "フ", "ヘ", "ホ"],
    ["マ", "ミ", "ム", "メ", "モ"],
    ["ヤ", "ー", "ユ", "ー", "ヨ"],
    ["ワ", "ー", "ン", "ー", "ヲ"]]
]
let arrayRomanji = [
    ["a", "i", "u", "e", "o"],
    ["ka", "ki", "ku", "ke", "ko"],
    ["sa", "shi", "su", "se", "so"],
    ["ta", "chi", "tsu", "te", "to"],
    ["na", "ni", "nu", "ne", "no"],
    ["ba", "hi", "fu", "he", "ho"],
    ["ma", "mi", "mu", "me", "mo"],
    ["ya", "ー", "yu", "ー", "so"],
    ["wa", "ー", "n", "ー", "wo"]
]
let countH = []
let countK = []
function load(){
    countH = JSON.parse(window.localStorage.getItem('listH'))
    for (let i = 0; i <= 8; i++) {
        if (countH.indexOf(i) !== -1){
            listH[i].checked = true
        }
    }
    countK = JSON.parse(window.localStorage.getItem('listK'))
    for (let i = 0; i <= 8; i++) {
        if (countK.indexOf(i) !== -1){
            listK[i].checked = true
        }
    }
}
function setlist(){
    countH = []
    for (let i = 0; i <= 8; i++) {
        if (listH[i].checked == true){
            countH.push(i)
        }
    }
    window.localStorage.setItem('listH', JSON.stringify(countH))
    countK = []
    for (let i = 0; i <= 8; i++) {
        if (listK[i].checked == true){
            countK.push(i)
        }
    }
    window.localStorage.setItem('listK', JSON.stringify(countK))
}
function start(){
    setlist()
    if (countH.length !== 0 || countK.length !== 0){
        interface.style.display = "none"
        quiz.style.display = "block"
        input()
    }
}
function keyup(e) {
    if (e == 13) {
        var answer1 = String(inputAns1.value).toLowerCase()
        var answer2 = String(inputAns2.value).toLowerCase()
        var answer3 = String(inputAns3.value).toLowerCase()
        if (answer1 == arrayRomanji[displayY[0]][displayZ[0]] && answer2 == arrayRomanji[displayY[1]][displayZ[1]] && answer3 == arrayRomanji[displayY[2]][displayZ[2]]){
            caption.children[0].innerHTML = `<strong>Correto!:</strong> ${arrayKana[displayX[0]][displayY[0]][displayZ[0]]}${arrayKana[displayX[1]][displayY[1]][displayZ[1]]}${arrayKana[displayX[2]][displayY[2]][displayZ[2]]} = ${arrayRomanji[displayY[0]][displayZ[0]]}${arrayRomanji[displayY[1]][displayZ[1]]}${arrayRomanji[displayY[2]][displayZ[2]]}`
            caption.style.backgroundColor = "green"
        }else{
            caption.children[0].innerHTML = `<strong>Errado!:</strong> ${arrayKana[displayX[0]][displayY[0]][displayZ[0]]}${arrayKana[displayX[1]][displayY[1]][displayZ[1]]}${arrayKana[displayX[2]][displayY[2]][displayZ[2]]} = ${arrayRomanji[displayY[0]][displayZ[0]]}${arrayRomanji[displayY[1]][displayZ[1]]}${arrayRomanji[displayY[2]][displayZ[2]]}`
            caption.style.backgroundColor = "red"
        }
        input();
    }
}
function allBoxes(list){
    var mark = document.getElementsByClassName(list + 'checkbox')
    for (let i = 0; i <= 8; i++) {
        mark[i].checked = true
    }
    setlist()
}
function noneBoxes(list){
    var mark = document.getElementsByClassName(list + 'checkbox')
    for (let i = 0; i <= 8; i++) {
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
function input(nRepeat = 3) {
    display.innerHTML = ""
    displayX = []
    displayY = []
    displayZ = []
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
    inputAns1.value = ""
    inputAns1.focus()
    inputAns2.value = ""
    inputAns3.value = ""
}