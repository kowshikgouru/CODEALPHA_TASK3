const songs = [

{
    title: "Believer",
    artist: "Imagine Dragons",
    src:"songs/Imagine Dragons - Believer (Audio).mp3",
    cover: "images/image.png"
},

{
    title: "Shape of You",
    artist: "Ed Sheeran",
    src: "songs/Shape of You - Ed Sheeran.mp3",
    cover: "images/image1.png"
},

{
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "songs/The Weeknd - Blinding Lights (Official Audio).mp3",
    cover: "images/image2.png"
},

{
    title: "Levitating",
    artist: "Dua Lipa",
    src: "songs/05 Levitating.mp3",
    cover: "images/image3.png"
},

{
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "songs/Perfect (Originally Performed by Ed Sheeran)(M4A_128K).mp3",
    cover: "images/image4.png"
}

];

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress =
document.getElementById("progress");

const progressContainer =
document.getElementById("progress-container");

const currentTime =
document.getElementById("current-time");

const duration =
document.getElementById("duration");

const volume =
document.getElementById("volume");

const playlist =
document.getElementById("playlist");

let songIndex = 0;

/* Load Song */

function loadSong(index){

    title.textContent =
    songs[index].title;

    artist.textContent =
    songs[index].artist;

    audio.src =
    songs[index].src;

    cover.src =
    songs[index].cover;

    updatePlaylist();
}

/* Play */

function playSong(){

    audio.play();

    playBtn.textContent = "⏸";
}

/* Pause */

function pauseSong(){

    audio.pause();

    playBtn.textContent = "▶";
}

/* Play / Pause */

playBtn.addEventListener("click",()=>{

    if(audio.paused){
        playSong();
    }
    else{
        pauseSong();
    }

});

/* Next Song */

function nextSong(){

    songIndex++;

    if(songIndex >= songs.length){
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}

/* Previous Song */

function prevSong(){

    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

nextBtn.addEventListener(
    "click",
    nextSong
);

prevBtn.addEventListener(
    "click",
    prevSong
);

/* Update Progress */

audio.addEventListener(
    "timeupdate",
    ()=>{

        const progressPercent =
        (audio.currentTime /
        audio.duration) * 100;

        progress.style.width =
        progressPercent + "%";

        currentTime.textContent =
        formatTime(audio.currentTime);

    }
);

/* Song Duration */

audio.addEventListener(
    "loadedmetadata",
    ()=>{

        duration.textContent =
        formatTime(audio.duration);

    }
);

/* Time Format */

function formatTime(time){

    const mins =
    Math.floor(time / 60);

    const secs =
    Math.floor(time % 60);

    return `${mins}:${
        secs < 10
        ? "0" + secs
        : secs
    }`;
}

/* Seek Song */

progressContainer.addEventListener(
    "click",
    (e)=>{

        const width =
        progressContainer.clientWidth;

        const clickX =
        e.offsetX;

        audio.currentTime =
        (clickX / width)
        * audio.duration;

    }
);

/* Volume */

volume.addEventListener(
    "input",
    ()=>{

        audio.volume =
        volume.value;

    }
);

/* Auto Play Next Song */

audio.addEventListener(
    "ended",
    nextSong
);

/* Playlist */

songs.forEach(
    (song,index)=>{

        const li =
        document.createElement("li");

        li.textContent =
        `${song.title} - ${song.artist}`;

        li.addEventListener(
            "click",
            ()=>{

                songIndex = index;

                loadSong(songIndex);

                playSong();
            }
        );

        playlist.appendChild(li);

    }
);

/* Highlight Active Song */

function updatePlaylist(){

    const items =
    document.querySelectorAll(
        "#playlist li"
    );

    items.forEach(item=>{

        item.classList.remove(
            "active-song"
        );

    });

    if(items[songIndex]){

        items[songIndex]
        .classList.add(
            "active-song"
        );

    }
}

/* Initialize */

loadSong(songIndex);