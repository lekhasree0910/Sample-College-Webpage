const songs = [
  { id: 1, title: "Believer", artist: "Imagine Dragons", album: "Evolve", year: 2017, category: "Rock", cover: "images/cover1.jpg", src: "music/song1.mp3", lyrics: "lyrics/song1.txt", duration: "1:00", color: "#fce4ec" },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", year: 2020, category: "Pop", cover: "images/cover2.jpg", src: "music/song2.mp3", lyrics: "lyrics/song2.txt", duration: "1:00", color: "#f3e5f5" },
  { id: 3, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", year: 1975, category: "Rock", cover: "images/cover3.jpg", src: "music/song3.mp3", lyrics: "lyrics/song3.txt", duration: "1:00", color: "#e8eaf6" },
  { id: 4, title: "Sunflower", artist: "Post Malone & Swae Lee", album: "Hollywood's Bleeding", year: 2019, category: "Hip-Hop", cover: "images/cover4.jpg", src: "music/song4.mp3", lyrics: "lyrics/song4.txt", duration: "5:00", color: "#e0f2f1" },
  { id: 5, title: "Clair de Lune", artist: "Claude Debussy", album: "Suite Bergamasque", year: 1905, category: "Classical", cover: "images/cover5.jpg", src: "music/song5.mp3", lyrics: "lyrics/song5.txt", duration: "10:00", color: "#fff3e0" },
  { id: 6, title: "Lofi Study Beats", artist: "Lofi Girl", album: "Chill Study", year: 2022, category: "Lo-Fi", cover: "images/cover6.jpg", src: "music/song6.mp3", lyrics: "lyrics/song6.txt", duration: "0:45", color: "#f1f8e9" },
  { id: 7, title: "Take Five", artist: "Dave Brubeck", album: "Time Out", year: 1959, category: "Jazz", cover: "images/cover7.jpg", src: "music/song7.mp3", lyrics: "lyrics/song7.txt", duration: "0:40", color: "#fce4ec" },
  { id: 8, title: "Levels", artist: "Avicii", album: "True", year: 2011, category: "EDM", cover: "images/cover8.jpg", src: "music/song8.mp3", lyrics: "lyrics/song8.txt", duration: "0:26", color: "#e8f5e9" },
  { id: 9, title: "Shape of You", artist: "Ed Sheeran", album: "Divide", year: 2017, category: "Pop", cover: "images/cover9.jpg", src: "music/song9.mp3", lyrics: "lyrics/song9.txt", duration: "1:00", color: "#fce4ec" },
  { id: 10, title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", year: 1971, category: "Rock", cover: "images/cover10.jpg", src: "music/song10.mp3", lyrics: "lyrics/song10.txt", duration: "1:00", color: "#e8eaf6" },
  { id: 11, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", year: 2019, category: "Pop", cover: "images/cover11.jpg", src: "music/song11.mp3", lyrics: "lyrics/song11.txt", duration: "5:00", color: "#f3e5f5" },
  { id: 12, title: "Moonlight Sonata", artist: "Ludwig van Beethoven", album: "Piano Sonata No. 14", year: 1801, category: "Classical", cover: "images/cover12.jpg", src: "music/song12.mp3", lyrics: "lyrics/song12.txt", duration: "10:00", color: "#fff3e0" },
  { id: 13, title: "God's Plan", artist: "Drake", album: "Scorpion", year: 2018, category: "Hip-Hop", cover: "images/cover13.jpg", src: "music/song13.mp3", lyrics: "lyrics/song13.txt", duration: "0:45", color: "#e0f2f1" },
  { id: 14, title: "Fly Me to the Moon", artist: "Frank Sinatra", album: "It Might as Well Be Swing", year: 1964, category: "Jazz", cover: "images/cover14.jpg", src: "music/song14.mp3", lyrics: "lyrics/song14.txt", duration: "0:40", color: "#fce4ec" },
  { id: 15, title: "In the End", artist: "Linkin Park", album: "Hybrid Theory", year: 2000, category: "Rock", cover: "images/cover15.jpg", src: "music/song15.mp3", lyrics: "lyrics/song15.txt", duration: "0:26", color: "#e8eaf6" },
];

const categories = [
  { name: "Pop", icon: "fa-music", color: "#f3e5f5", desc: "Catchy and upbeat" },
  { name: "Rock", icon: "fa-guitar", color: "#fce4ec", desc: "Electric and bold" },
  { name: "Hip-Hop", icon: "fa-microphone", color: "#e0f2f1", desc: "Rhythm and flow" },
  { name: "Classical", icon: "fa-piano", color: "#fff3e0", desc: "Timeless elegance" },
  { name: "Lo-Fi", icon: "fa-headphones", color: "#f1f8e9", desc: "Chill and relaxed" },
  { name: "Jazz", icon: "fa-saxophone", color: "#fce4ec", desc: "Smooth and soulful" },
  { name: "EDM", icon: "fa-bolt", color: "#e8f5e9", desc: "Electronic energy" },
];

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let repeatMode = "none"; // none, one, all
let isMuted = false;
let volume = 1;
let searchQuery = "";
let currentSection = "home";
let recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let filteredSongs = [...songs];
let activeCategory = null;

const placeholderImages = [
  "https://placehold.co/200/ffd1dc/ff9eb5?text=Music",
  "https://placehold.co/200/e8d1ff/c9a0e8?text=Music",
  "https://placehold.co/200/d1ecff/a0c9e8?text=Music",
  "https://placehold.co/200/d1ffd1/a0e8a0?text=Music",
  "https://placehold.co/200/fff5d1/e8d4a0?text=Music",
  "https://placehold.co/200/ffd1ec/e89ec8?text=Music",
  "https://placehold.co/200/d1f5ff/a0dce8?text=Music",
  "https://placehold.co/200/f5ffd1/dce8a0?text=Music",
];

const placeholderLyrics = {
  1: ["Believer - Imagine Dragons", "", "First things first", "I'ma say all the words inside my head", "I'm fired up and tired of the way that things have been", "The way that things have been", "", "Second things second", "Don't you tell me what you think that I can be", "I'm the one at the sail, I'm the master of my sea", "The master of my sea", "", "I was broken from a young age", "Taking my sulking to the masses", "Write my poems for the few", "That look at me, took to me, shook at me, feeling me", "Singing from heartache from the pain", "Taking my message from the veins", "Speaking my lesson from the brain", "Seeing the beauty through the...", "", "Pain! You made me a, you made me a believer, believer", "Pain! You break me down, you build me up, believer, believer"],
  2: ["Blinding Lights - The Weeknd", "", "I've been tryna call", "I've been on my own for long enough", "Maybe you can show me how to love", "Maybe I'm going through withdrawals", "", "You don't even have to do too much", "You can turn me on with just a touch", "I'm wrapped around your finger", "Do I have the strength to pull away?", "", "I feel it coming down on me", "The night is young and so are we", "The city is alive, the lights are bright", "You're the only one I see tonight"],
  3: ["Bohemian Rhapsody - Queen", "", "Is this the real life? Is this just fantasy?", "Caught in a landslide, no escape from reality", "Open your eyes, look up to the skies and see", "I'm just a poor boy, I need no sympathy", "Because I'm easy come, easy go, little high, little low", "", "Mama, just killed a man", "Put a gun against his head, pulled my trigger, now he's dead", "Mama, life had just begun", "But now I've gone and thrown it all away"],
  4: ["Sunflower - Post Malone & Swae Lee", "", "Needless to say, I keep her in check", "She was a bad-bad, nevertheless", "Callin' it quits now, baby, I'm a wreck", "Crash at my place, baby, you're a wreck", "", "Thinkin' in cursive, I was the off-spring", "Everything down to a tee", "You're a dose of what the universe brings", "You're my sunflower, I need you like mine"],
  5: ["Clair de Lune - Claude Debussy", "", "(Instrumental)", "", "No lyrics available. This is a classical piano piece."],
  6: ["Lofi Study Beats - Lofi Girl", "", "(Instrumental Lo-Fi Beat)", "", "Just relax and focus...", "Let the rhythm guide your thoughts."],
  7: ["Take Five - Dave Brubeck", "", "(Instrumental Jazz)", "", "Time signature: 5/4", "A timeless jazz classic."],
  8: ["Levels - Avicii", "", "Oh, sometimes I get a good feeling, yeah", "Get a feeling that I never, never, never, never had before", "No, no, no, I get a good feeling, yeah"],
  9: ["Shape of You - Ed Sheeran", "", "The club isn't the best place to find a lover", "So the bar is where I go", "Me and my friends at the table doing shots", "Drinking fast and then we talk slow"],
  10: ["Stairway to Heaven - Led Zeppelin", "", "There's a lady who's sure all that glitters is gold", "And she's buying a stairway to heaven", "When she gets there she knows, if the stores are all closed", "With a word she can get what she came for"],
  11: ["Watermelon Sugar - Harry Styles", "", "Tastes like strawberries on a summer evening", "And it sounds just like a song", "I want more berries and that summer feeling", "It's so wonderful and warm"],
  12: ["Moonlight Sonata - Beethoven", "", "(Instrumental)", "", "Adagio sostenuto", "A timeless masterpiece of classical music."],
  13: ["God's Plan - Drake", "", "Yeah, they wishing and wishin' and wishin' and wishin'", "They wishin' on me, yeah", "I feel good, I feel great, I'm amazing"],
  14: ["Fly Me to the Moon - Frank Sinatra", "", "Fly me to the moon", "Let me play among the stars", "Let me see what spring is like", "On a-Jupiter and Mars"],
  15: ["In the End - Linkin Park", "", "It starts with one", "One thing I don't know why", "It doesn't even matter how hard you try", "Keep that in mind, I designed this rhyme"],
};

const fallbackDurations = {
  1: 60, 2: 60, 3: 60, 4: 300, 5: 600, 6: 45, 7: 40, 8: 26, 9: 60, 10: 60, 11: 300, 12: 600, 13: 45, 14: 40, 15: 26,
};

const Dom = {
  playBtn: document.getElementById("playBtn"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  shuffleBtn: document.getElementById("shuffleBtn"),
  repeatBtn: document.getElementById("repeatBtn"),
  muteBtn: document.getElementById("muteBtn"),
  progressBar: document.getElementById("progressBar"),
  progressFill: document.getElementById("progressFill"),
  progressThumb: document.getElementById("progressThumb"),
  currentTime: document.getElementById("currentTime"),
  totalDuration: document.getElementById("totalDuration"),
  currentCover: document.getElementById("currentCover"),
  currentTitle: document.getElementById("currentTitle"),
  currentArtist: document.getElementById("currentArtist"),
  favBtn: document.getElementById("favBtn"),
  volumeSlider: document.querySelector(".volume-slider"),
  volumeFill: document.getElementById("volumeFill"),
  volumeThumb: document.getElementById("volumeThumb"),
  volumePercent: document.getElementById("volumePercent"),
  themeToggle: document.getElementById("themeToggle"),
  searchInput: document.getElementById("searchInput"),
  toastContainer: document.getElementById("toastContainer"),
  loadingOverlay: document.getElementById("loadingOverlay"),
  equalizerBar: document.getElementById("equalizerBar"),
  equalizerToggle: document.getElementById("equalizerToggle"),
  playlistContainer: document.getElementById("playlistContainer"),
  albumGrid: document.getElementById("albumGrid"),
  categoryGrid: document.getElementById("categoryGrid"),
  favoritesContainer: document.getElementById("favoritesContainer"),
  recentlyPlayedContainer: document.getElementById("recentlyPlayedContainer"),
  lyricsContainer: document.getElementById("lyricsContainer"),
  lyricsCover: document.getElementById("lyricsCover"),
  lyricsSongTitle: document.getElementById("lyricsSongTitle"),
  lyricsArtistName: document.getElementById("lyricsArtistName"),
  lyricsBody: document.getElementById("lyricsBody"),
  toggleLyricsBtn: document.getElementById("toggleLyricsBtn"),
  searchResults: document.getElementById("searchResults"),
  sectionTitle: document.getElementById("sectionTitle"),
  navItems: document.querySelectorAll(".nav-item"),
  sections: document.querySelectorAll(".section"),
};

const formatTime = (t) => {
  if (isNaN(t) || t === Infinity) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const randId = () => Math.random().toString(36).substring(2, 9);

const getCover = (song) => song.cover;
const getFallbackCover = (i) => placeholderImages[(i || 0) % placeholderImages.length];

const showLoading = (show) => {
  Dom.loadingOverlay.classList.toggle("active", show);
};

const toast = (msg, icon = "info-circle") => {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<i class="fas fa-${icon}"></i> ${msg}`;
  Dom.toastContainer.appendChild(t);
  setTimeout(() => t.remove(), 3000);
};

const getFilteredSongs = () => {
  let list = [...songs];
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.artist.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
    );
  }
  if (activeCategory) {
    list = list.filter(s => s.category === activeCategory);
  }
  return list;
};

const getCurrentSong = () => songs[currentSongIndex];

const saveState = () => {
  const s = getCurrentSong();
  const data = {
    songId: s.id,
    currentTime: audio.currentTime || 0,
    volume,
    isMuted,
    isShuffled,
    repeatMode,
  };
  localStorage.setItem("playerState", JSON.stringify(data));
};

const loadState = () => {
  try {
    const raw = localStorage.getItem("playerState");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.volume !== undefined) {
      volume = data.volume;
      audio.volume = volume;
      if (data.isMuted) {
        isMuted = true;
        audio.muted = true;
        Dom.muteBtn.querySelector("i").className = "fas fa-volume-mute";
      }
    }
    if (data.isShuffled !== undefined) isShuffled = data.isShuffled;
    if (data.repeatMode) repeatMode = data.repeatMode;
    if (data.songId) {
      const idx = songs.findIndex(s => s.id === data.songId);
      if (idx !== -1) {
        currentSongIndex = idx;
        if (data.currentTime) {
          audio.currentTime = data.currentTime;
        }
      }
    }
  } catch (e) {}
};

const updateVolumeUI = () => {
  const pct = isMuted ? 0 : Math.round(volume * 100);
  Dom.volumeFill.style.width = `${pct}%`;
  Dom.volumeThumb.style.left = `${pct}%`;
  Dom.volumePercent.textContent = `${pct}%`;
  const icon = isMuted ? "fa-volume-mute" : volume > 0.5 ? "fa-volume-up" : volume > 0 ? "fa-volume-down" : "fa-volume-off";
  Dom.muteBtn.querySelector("i").className = `fas ${icon}`;
};

const updateRepeatUI = () => {
  Dom.repeatBtn.classList.toggle("active", repeatMode !== "none");
  Dom.repeatBtn.querySelector("i").className = "fas fa-repeat";
  if (repeatMode === "one") {
    Dom.repeatBtn.innerHTML = '<i class="fas fa-repeat"></i><sup style="font-size:9px;color:var(--primary-dark)">1</sup>';
  } else {
    Dom.repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
  }
  Dom.repeatBtn.title = repeatMode === "none" ? "No Repeat" : repeatMode === "one" ? "Repeat One" : "Repeat All";
};

const updateShuffleUI = () => {
  Dom.shuffleBtn.classList.toggle("active", isShuffled);
};

const loadSong = (index, autoplay = true) => {
  const song = songs[index];
  if (!song) return;
  currentSongIndex = index;
  audio.src = song.src;
  audio.volume = isMuted ? 0 : volume;

  Dom.currentCover.src = getCover(song);
  Dom.currentCover.alt = song.title;
  Dom.currentCover.onerror = function () { this.src = getFallbackCover(song.id); };
  Dom.currentTitle.textContent = song.title;
  Dom.currentArtist.textContent = song.artist;
  Dom.lyricsCover.src = getCover(song);
  Dom.lyricsCover.onerror = function () { this.src = getFallbackCover(song.id); };
  Dom.lyricsSongTitle.textContent = song.title;
  Dom.lyricsArtistName.textContent = song.artist;

  updateFavBtn();
  updateBgGradient(song.color);
  saveState();

  if (autoplay) {
    showLoading(true);
    audio.play().then(() => {
      showLoading(false);
      isPlaying = true;
      updatePlayBtn();
      Dom.equalizerBar.classList.remove("paused");
    }).catch(() => {
      showLoading(false);
      isPlaying = false;
      updatePlayBtn();
      Dom.equalizerBar.classList.add("paused");
    });
  } else {
    isPlaying = false;
    updatePlayBtn();
    Dom.equalizerBar.classList.add("paused");
  }

  Dom.totalDuration.textContent = song.duration;
  renderPlaylist();
  renderAlbums();
  renderRecentlyPlayed();
  loadLyrics(song);
};

const updateBgGradient = (color) => {
  const player = document.querySelector(".player-bar");
  if (color) player.style.background = `linear-gradient(to right, ${color}, ${color}88, white)`;
  else player.style.background = "";
};

const updatePlayBtn = () => {
  const icon = Dom.playBtn.querySelector("i");
  icon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
};

const updateFavBtn = () => {
  const s = getCurrentSong();
  const isFav = favorites.some(f => f.id === s.id);
  Dom.favBtn.classList.toggle("active", isFav);
  Dom.favBtn.querySelector("i").className = isFav ? "fas fa-heart" : "far fa-heart";
};

const playSong = (index) => {
  if (index === currentSongIndex && audio.src) {
    togglePlay();
    return;
  }
  loadSong(index, true);
  addToRecentlyPlayed(songs[index]);
};

const togglePlay = () => {
  if (!audio.src) {
    loadSong(currentSongIndex, true);
    return;
  }
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    Dom.equalizerBar.classList.add("paused");
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
    Dom.equalizerBar.classList.remove("paused");
  }
  updatePlayBtn();
};

const nextSong = () => {
  let nextIdx;
  if (isShuffled) {
    let rand;
    do { rand = Math.floor(Math.random() * songs.length); } while (rand === currentSongIndex && songs.length > 1);
    nextIdx = rand;
  } else {
    nextIdx = (currentSongIndex + 1) % songs.length;
  }
  loadSong(nextIdx, true);
  addToRecentlyPlayed(songs[nextIdx]);
  toast(`Now Playing: ${songs[nextIdx].title}`, "music");
};

const prevSong = () => {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  let prevIdx;
  if (isShuffled) {
    let rand;
    do { rand = Math.floor(Math.random() * songs.length); } while (rand === currentSongIndex && songs.length > 1);
    prevIdx = rand;
  } else {
    prevIdx = (currentSongIndex - 1 + songs.length) % songs.length;
  }
  loadSong(prevIdx, true);
  addToRecentlyPlayed(songs[prevIdx]);
  toast(`Now Playing: ${songs[prevIdx].title}`, "music");
};

const addToRecentlyPlayed = (song) => {
  recentlyPlayed = recentlyPlayed.filter(s => s.id !== song.id);
  recentlyPlayed.unshift({ ...song, playedAt: Date.now() });
  if (recentlyPlayed.length > 20) recentlyPlayed.pop();
  localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  renderRecentlyPlayed();
};

const loadLyrics = (song) => {
  const fallback = placeholderLyrics[song.id];
  if (fallback) {
    Dom.lyricsBody.innerHTML = fallback.map(line => `<p>${line || "&nbsp;"}</p>`).join("");
    return;
  }
  Dom.lyricsBody.innerHTML = `<p class="hint">Loading lyrics...</p>`;
  fetch(song.lyrics).then(r => r.text()).then(text => {
    Dom.lyricsBody.innerHTML = text.split("\n").map(line => `<p>${line || "&nbsp;"}</p>`).join("");
  }).catch(() => {
    Dom.lyricsBody.innerHTML = `<p class="hint">No lyrics available for this song.</p>`;
  });
};

const renderPlaylist = (songsToRender) => {
  const list = songsToRender || getFilteredSongs();
  if (list.length === 0) {
    Dom.playlistContainer.innerHTML = `<p class="empty-state"><i class="fas fa-search"></i> No songs found</p>`;
    return;
  }
  Dom.playlistContainer.innerHTML = list.map((s, i) => {
    const isFav = favorites.some(f => f.id === s.id);
    const isActive = s.id === getCurrentSong().id;
    return `
      <div class="song-item ${isActive ? "active" : ""}" data-index="${songs.indexOf(s)}" onclick="playSong(${songs.indexOf(s)})">
        <span class="num">${i + 1}</span>
        <img src="${getCover(s)}" alt="${s.title}" onerror="this.src='${getFallbackCover(s.id)}'">
        <div>
          <div class="title">${isActive ? '<i class="fas fa-volume-up" style="margin-right:4px;color:var(--primary-dark)"></i>' : ""}${highlightMatch(s.title)}</div>
          <div class="artist">${highlightMatch(s.artist)}</div>
        </div>
        <span class="artist">${highlightMatch(s.album)}</span>
        <span class="cat-badge">${s.category}</span>
        <span class="duration">${s.duration}</span>
        <button class="fav-btn-sm ${isFav ? "active" : ""}" onclick="event.stopPropagation(); toggleFav(${s.id})"><i class="${isFav ? "fas" : "far"} fa-heart"></i></button>
      </div>
    `;
  }).join("");
};

const highlightMatch = (text) => {
  if (!searchQuery) return text;
  const q = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${q})`, "gi");
  return text.replace(regex, '<span style="background:var(--primary);color:white;border-radius:3px;padding:0 4px">$1</span>');
};

const renderAlbums = () => {
  const unique = {};
  songs.forEach(s => {
    if (!unique[s.album]) unique[s.album] = { name: s.album, artist: s.artist, year: s.year, cover: s.cover, id: s.id };
  });
  const albums = Object.values(unique);
  Dom.albumGrid.innerHTML = albums.map(a => `
    <div class="album-card" onclick="searchQuery='${a.name.replace(/'/g, "\\'")}'; doSearch(); switchSection('search')">
      <img src="${a.cover}" alt="${a.name}" onerror="this.src='${getFallbackCover(a.id)}'">
      <h4>${a.name}</h4>
      <p>${a.artist} - ${a.year}</p>
    </div>
  `).join("");
};

const renderCategories = () => {
  const icons = ["fa-music", "fa-guitar", "fa-microphone", "fa-piano", "fa-headphones", "fa-saxophone", "fa-bolt"];
  Dom.categoryGrid.innerHTML = categories.map((c, i) => `
    <div class="category-card ${activeCategory === c.name ? "active" : ""}" onclick="filterByCategory('${c.name}')" style="background:${c.color}">
      <i class="fas ${icons[i]}"></i>
      <h4>${c.name}</h4>
      <p>${c.desc}</p>
    </div>
  `).join("");
};

const filterByCategory = (category) => {
  if (activeCategory === category) {
    activeCategory = null;
    toast("Showing all songs", "music");
  } else {
    activeCategory = category;
    toast(`Filtered: ${category}`, "filter");
  }
  searchQuery = "";
  Dom.searchInput.value = "";
  filteredSongs = getFilteredSongs();
  renderPlaylist();
  switchSection("playlist");
};

const renderFavorites = () => {
  if (favorites.length === 0) {
    Dom.favoritesContainer.innerHTML = `<p class="empty-state"><i class="fas fa-heart"></i> No favorites yet. Click the heart icon to add songs!</p>`;
    return;
  }
  Dom.favoritesContainer.innerHTML = favorites.map(s => {
    const idx = songs.findIndex(sg => sg.id === s.id);
    return `
      <div class="song-item" onclick="playSong(${idx})">
        <span class="num"><i class="fas fa-heart" style="color:var(--danger)"></i></span>
        <img src="${s.cover}" alt="${s.title}" onerror="this.src='${getFallbackCover(s.id)}'">
        <div>
          <div class="title">${s.title}</div>
          <div class="artist">${s.artist}</div>
        </div>
        <span class="artist">${s.album}</span>
        <span class="cat-badge">${s.category}</span>
        <span class="duration">${s.duration}</span>
        <button class="fav-btn-sm active" onclick="event.stopPropagation(); toggleFav(${s.id})"><i class="fas fa-heart"></i></button>
      </div>
    `;
  }).join("");
};

const renderRecentlyPlayed = () => {
  if (recentlyPlayed.length === 0) {
    Dom.recentlyPlayedContainer.innerHTML = `<p class="empty-state"><i class="fas fa-clock"></i> No recently played songs.</p>`;
    return;
  }
  Dom.recentlyPlayedContainer.innerHTML = recentlyPlayed.slice(0, 10).map(s => {
    const idx = songs.findIndex(sg => sg.id === s.id);
    const ago = Date.now() - s.playedAt;
    const minAgo = Math.floor(ago / 60000);
    const timeStr = minAgo < 1 ? "Just now" : minAgo < 60 ? `${minAgo}m ago` : `${Math.floor(minAgo / 60)}h ago`;
    return `
      <div class="recent-item">
        <img src="${s.cover}" alt="${s.title}" onerror="this.src='${getFallbackCover(s.id)}'">
        <div class="info">
          <h4>${s.title}</h4>
          <p>${s.artist}</p>
        </div>
        <span class="time">${timeStr}</span>
        <button class="continue-btn" onclick="playSong(${idx})">Play</button>
      </div>
    `;
  }).join("");
};

const toggleFav = (songId) => {
  const s = songs.find(sg => sg.id === songId);
  if (!s) return;
  const idx = favorites.findIndex(f => f.id === songId);
  if (idx !== -1) {
    favorites.splice(idx, 1);
    toast(`Removed from Favorites`, "heart-broken");
  } else {
    favorites.push(s);
    toast(`Added to Favorites`, "heart");
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavBtn();
  renderPlaylist();
  renderFavorites();
};

const doSearch = () => {
  searchQuery = Dom.searchInput.value.trim();
  filteredSongs = getFilteredSongs();
  if (currentSection === "search") {
    if (!searchQuery) {
      Dom.searchResults.innerHTML = `<p class="hint"><i class="fas fa-search"></i> Type to search songs, artists, or albums...</p>`;
    } else {
      Dom.searchResults.innerHTML = `<h3 style="margin-bottom:12px;color:var(--text2)">Results for "${searchQuery}"</h3><div class="playlist-container">${renderPlaylistToString(filteredSongs)}</div>`;
    }
  } else {
    renderPlaylist();
  }
};

const renderPlaylistToString = (list) => {
  if (list.length === 0) return `<p class="empty-state"><i class="fas fa-search"></i> No results found</p>`;
  return list.map((s, i) => {
    const isFav = favorites.some(f => f.id === s.id);
    const idx = songs.indexOf(s);
    return `
      <div class="song-item" data-index="${idx}" onclick="playSong(${idx})">
        <span class="num">${i + 1}</span>
        <img src="${getCover(s)}" alt="${s.title}" onerror="this.src='${getFallbackCover(s.id)}'">
        <div>
          <div class="title">${highlightMatch(s.title)}</div>
          <div class="artist">${highlightMatch(s.artist)}</div>
        </div>
        <span class="artist">${highlightMatch(s.album)}</span>
        <span class="cat-badge">${s.category}</span>
        <span class="duration">${s.duration}</span>
        <button class="fav-btn-sm ${isFav ? "active" : ""}" onclick="event.stopPropagation(); toggleFav(${s.id})"><i class="${isFav ? "fas" : "far"} fa-heart"></i></button>
      </div>
    `;
  }).join("");
};

const switchSection = (section) => {
  currentSection = section;
  Dom.navItems.forEach(n => n.classList.toggle("active", n.dataset.section === section));
  const sectionMap = { "home": "homeSection", "search": "searchSection", "playlist": "playlistSection", "favorites": "favoritesSection", "categories": "categoriesSection", "recently-played": "recentlyPlayedSection", "lyrics": "lyricsSection" };
  Dom.sections.forEach(s => s.classList.toggle("active", s.id === sectionMap[section]));
  const titles = { home: "Home", search: "Search", playlist: "Playlist", favorites: "Favorites", categories: "Categories", "recently-played": "Recently Played", lyrics: "Lyrics" };
  Dom.sectionTitle.textContent = titles[section] || "Home";

  if (section === "playlist") renderPlaylist();
  if (section === "favorites") renderFavorites();
  if (section === "recently-played") renderRecentlyPlayed();
  if (section === "search") doSearch();
};

const toggleTheme = () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  if (isDark) {
    document.documentElement.removeAttribute("data-theme");
    Dom.themeToggle.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    Dom.themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    localStorage.setItem("theme", "dark");
  }
};

const updateProgress = () => {
  if (!audio.duration || !isFinite(audio.duration)) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  Dom.progressFill.style.width = `${pct}%`;
  Dom.progressThumb.style.left = `${pct}%`;
  Dom.currentTime.textContent = formatTime(audio.currentTime);
};

const setProgress = (e) => {
  const rect = Dom.progressBar.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (audio.duration) {
    audio.currentTime = pct * audio.duration;
    updateProgress();
  }
};

const setVolume = (e) => {
  const rect = Dom.volumeSlider.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  volume = pct;
  audio.volume = pct;
  if (isMuted) {
    isMuted = false;
    audio.muted = false;
  }
  updateVolumeUI();
  toast(`Volume: ${Math.round(pct * 100)}%`, "volume-up");
  saveState();
};

const init = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    Dom.themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
  }

  loadState();
  updateVolumeUI();
  updateRepeatUI();
  updateShuffleUI();

  loadSong(currentSongIndex, false);

  renderAlbums();
  renderCategories();
  renderFavorites();
  renderRecentlyPlayed();
  renderPlaylist();
  updateFavBtn();

  Dom.playBtn.addEventListener("click", togglePlay);
  Dom.prevBtn.addEventListener("click", prevSong);
  Dom.nextBtn.addEventListener("click", nextSong);

  Dom.progressBar.addEventListener("click", setProgress);
  Dom.volumeSlider.addEventListener("click", setVolume);

  Dom.themeToggle.addEventListener("click", toggleTheme);

  Dom.searchInput.addEventListener("input", () => {
    if (currentSection === "search") doSearch();
    else {
      searchQuery = Dom.searchInput.value.trim();
      renderPlaylist();
    }
  });

  Dom.muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    updateVolumeUI();
    toast(isMuted ? "Muted" : "Unmuted", isMuted ? "volume-mute" : "volume-up");
    saveState();
  });

  Dom.repeatBtn.addEventListener("click", () => {
    const modes = ["none", "all", "one"];
    const idx = modes.indexOf(repeatMode);
    repeatMode = modes[(idx + 1) % modes.length];
    updateRepeatUI();
    const msgs = { none: "No Repeat", one: "Repeat One", all: "Repeat All" };
    toast(msgs[repeatMode], "repeat");
    saveState();
  });

  Dom.shuffleBtn.addEventListener("click", () => {
    isShuffled = !isShuffled;
    updateShuffleUI();
    toast(isShuffled ? "Shuffle On" : "Shuffle Off", "random");
    saveState();
  });

  Dom.favBtn.addEventListener("click", () => {
    const s = getCurrentSong();
    toggleFav(s.id);
  });

  Dom.equalizerToggle.addEventListener("click", () => {
    Dom.equalizerBar.classList.toggle("active");
    Dom.equalizerToggle.classList.toggle("active");
  });

  Dom.navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      switchSection(item.dataset.section);
    });
  });

  Dom.toggleLyricsBtn.addEventListener("click", () => {
    const body = Dom.lyricsBody;
    const hidden = body.style.display === "none";
    body.style.display = hidden ? "" : "none";
    Dom.toggleLyricsBtn.innerHTML = hidden ? '<i class="fas fa-eye-slash"></i> Hide' : '<i class="fas fa-eye"></i> Show';
  });

  audio.addEventListener("timeupdate", updateProgress);

  audio.addEventListener("loadedmetadata", () => {
    if (isFinite(audio.duration)) {
      Dom.totalDuration.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener("ended", () => {
    if (repeatMode === "one") {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else if (repeatMode === "all" || currentSongIndex < songs.length - 1) {
      nextSong();
    } else {
      isPlaying = false;
      updatePlayBtn();
      Dom.equalizerBar.classList.add("paused");
    }
  });

  audio.addEventListener("play", () => {
    isPlaying = true;
    updatePlayBtn();
    Dom.equalizerBar.classList.remove("paused");
  });

  audio.addEventListener("pause", () => {
    isPlaying = false;
    updatePlayBtn();
    Dom.equalizerBar.classList.add("paused");
  });

  audio.addEventListener("waiting", () => showLoading(true));
  audio.addEventListener("canplay", () => showLoading(false));
  audio.addEventListener("error", () => {
    showLoading(false);
    toast("Error loading audio. Using simulated playback.", "exclamation-triangle");
  });

  audio.addEventListener("durationchange", () => {
    if (isFinite(audio.duration) && audio.duration > 0) {
      Dom.totalDuration.textContent = formatTime(audio.duration);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    switch (e.code) {
      case "Space": e.preventDefault(); togglePlay(); break;
      case "ArrowLeft": e.preventDefault(); prevSong(); break;
      case "ArrowRight": e.preventDefault(); nextSong(); break;
      case "KeyM": e.preventDefault(); Dom.muteBtn.click(); break;
    }
  });

  window.addEventListener("beforeunload", saveState);

  setInterval(saveState, 5000);
};

document.addEventListener("DOMContentLoaded", init);
