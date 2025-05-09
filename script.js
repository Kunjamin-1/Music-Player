let forestLullabyAudio = document.querySelector(".forest-lullaby")
let lostInCityLightsAudio = document.querySelector(".lost-in-city-lights")
let previousBtb = document.querySelector(".previous");
let nextBtb = document.querySelector(".next");
let playBtn = document.querySelector(".play");
let pauseBtn = document.querySelector(".pause");
let coverImg = document.querySelector(".cover-1")
let songName = document.querySelector(".song-name")
let artistName = document.querySelector(".artist-name")
let currentSongCover = document.querySelector(".cover-1").src
let obj = {
    "http://127.0.0.1:3000/music-player-master/resources/cover-1.jpg": {
        objAudioName: lostInCityLightsAudio,
        objsongName: "Lost in the City Lights",
        objartistName: "cosmo sheldrake",
        totalDuration: "01:12"
    },
    "http://127.0.0.1:3000/music-player-master/resources/cover-2.jpg": {
        objAudioName: forestLullabyAudio,
        objsongName: "Forest Lullaby",
        objartistName: "Lesfm",
        totalDuration: "02:18"
     }
}
let objArr = Object.entries(obj)
let audioTotalDuration = document.querySelector(".total"); 
let audioLiveDuration = document.querySelector(".live")
let progessTimeLine = document.querySelector(".time-line") 
window.addEventListener("DOMContentLoaded",()=>{
   audioTotalDuration.innerText = obj[currentSongCover]["totalDuration"]
})

playBtn.addEventListener("click", () => {
    if (obj.hasOwnProperty(currentSongCover)) {
        obj[currentSongCover]["objAudioName"].play()
    }
    playPauseDisplayToggle()
    timeupdate()
})
pauseBtn.addEventListener("click", () => {
    if (obj.hasOwnProperty(currentSongCover)) {
        obj[currentSongCover]["objAudioName"].pause()
    }
    playPauseDisplayToggle()
})

nextBtb.addEventListener("click", () => {
    obj[currentSongCover]["objAudioName"].pause()
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i][0] === currentSongCover) {
            let songChange = objArr[i + 1][0]
            currentSongCover = songChange
            break
        }
        if (objArr[i].indexOf() === -1) {
            currentSongCover = objArr[0][0]
            break
        }
    }
    playBtn.classList.remove("display-none")
    pauseBtn.classList.add("display-none")
    songDetail()
    formatTime(0)
    timeupdate()
    timeLine(0)
})
previousBtb.addEventListener("click", () => {
    obj[currentSongCover]["objAudioName"].pause()
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i][0] === currentSongCover) {
            let songChange = objArr[i - 1][0]
            currentSongCover = songChange
            break
        }
    }
    playBtn.classList.remove("display-none")
    pauseBtn.classList.add("display-none")
    songDetail()
    formatTime(0)
    timeupdate()
    timeLine(0)

})
function playPauseDisplayToggle(){
    playBtn.classList.toggle("display-none")
    pauseBtn.classList.toggle("display-none")
}
function songDetail(){
    coverImg.src = currentSongCover
    songName.innerText = obj[currentSongCover]["objsongName"]
    artistName.innerText = obj[currentSongCover]["objartistName"]
    audioTotalDuration.innerText = obj[currentSongCover]["totalDuration"]
}
function timeupdate(){
    obj[currentSongCover]["objAudioName"].addEventListener("timeupdate",()=>{
        let liveDuration = Math.round(obj[currentSongCover]["objAudioName"].currentTime)
        formatTime(liveDuration)
        timeLine(liveDuration)
    })
}
function formatTime(time){
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    audioLiveDuration.innerText = `${formattedMinutes}:${formattedSeconds}`
}
function timeLine(time){
    let widthFormula = Math.round(((time/obj[currentSongCover]["objAudioName"].duration)*100))
    progessTimeLine.style.width = `${widthFormula}%`
}
