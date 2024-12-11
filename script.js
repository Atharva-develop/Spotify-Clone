console.log('Welcome to Spotify');

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('/Users/laddu/Documents/code/project/spotify clone/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');

// Correcting backward and forward button selectors
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');

let songs = [
    { songName: "Beat", filePath: '1.mp3',       coverPath: 'cover1.svg' },
    { songName: "Once Again", filePath: '2.mp3', coverPath: 'cover2.webp' },
    { songName: "Blast", filePath: '3.mp3',      coverPath: 'cover3.webp' },
    { songName: "Energizer", filePath: '4.mp3',  coverPath: 'cover4.webp' },
    { songName: "Living", filePath: '5.mp3',     coverPath: 'cover5.webp' },
    { songName: "Onion", filePath: '6.mp3',      coverPath: 'cover6.webp' },
    { songName: "Cloud", filePath: '7.mp3',      coverPath: 'cover7.webp' },
];

// Helper function to reset all song icons to "play"
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play-circle');
    });
};

// Helper function to update the bottom controls and icons
const updateBottomControls = () => {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
};

// Play/Pause event for the bottom masterPlay icon
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-circle-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        document.getElementsByClassName('songItemPlay')[songIndex].classList.remove('fa-circle-pause');
        document.getElementsByClassName('songItemPlay')[songIndex].classList.add('fa-play-circle');
    }
});

// Update progress bar as the song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change song current time when the progress bar is adjusted
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Play/Pause individual songs from the song list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            songIndex = index;
            updateBottomControls();
        }
    });
});

// Next song functionality (forward button)
forward.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Cycle to the next song
    updateBottomControls();
});

// Previous song functionality (backward button)
backward.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Cycle to the previous song
    updateBottomControls();
});

// Function to play the selected song
function playSong() {
    audioElement.src = songs[songIndex].filePath; // Update the audio source
    audioElement.play();
    gif.style.opacity = 1; // Show the gif
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
}
