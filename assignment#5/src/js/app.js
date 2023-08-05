/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Ji Ho Nam
 *      Student ID: 139817217
 *      Date:       Aug 11, 2023
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// Function to create artist buttons and attach event listeners
function createArtistButtons() {
  const menu = document.getElementById("menu");

  artists.forEach((artist) => {
    const button = document.createElement("button");
    button.textContent = artist.name;
    button.addEventListener("click", () => {
      displayArtistInfoAndSongs(artist);
    });

    menu.appendChild(button);
  });
}

// Function to display the selected artist's information and songs
function displayArtistInfoAndSongs(artist) {
  const selectedArtistHeading = document.getElementById("selected-artist");
  const songsContainer = document.getElementById("songs");

  // Clear existing content
  selectedArtistHeading.innerHTML = "";
  songsContainer.innerHTML = "";

  // Display artist name and links
  selectedArtistHeading.textContent = artist.name;
  artist.links.forEach((link) => {
    const linkElement = document.createElement("a");
    linkElement.href = link.url;
    linkElement.textContent = link.name;
    selectedArtistHeading.appendChild(linkElement);
    selectedArtistHeading.appendChild(document.createTextNode(" "));
  });

  // Filter songs for the selected artist
  const artistSongs = songs.filter((song) => song.artistId === artist.id && !song.flagged);

  // Create cards for each song
  artistSongs.forEach((song) => {
    const songCard = createSongCard(song); // 여기서 createSongCard 함수를 사용
    songsContainer.appendChild(songCard);
  });
}

// Function to format duration in mm:ss format
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// app.js

// Function to create a song card
function createSongCard(song) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  card.classList.add("card");

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("card-image");

  // Create an anchor (<a>) element to wrap the image
  const anchor = document.createElement("a");
  anchor.appendChild(songImg);

  // Append the anchor to the card
  card.appendChild(anchor);

  // Create a <div> to hold the song title
  const titleDiv = document.createElement("div");
  titleDiv.textContent = song.title;

  // Append the titleDiv to the card
  card.appendChild(titleDiv);

  // Create a <div> to hold the song year and duration
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  // Create <span> elements for year and duration
  const yearSpan = document.createElement("span");
  yearSpan.classList.add("year");
  yearSpan.textContent = song.year;

  const durationSpan = document.createElement("span");
  durationSpan.classList.add("duration");
  durationSpan.textContent = formatDuration(song.duration);

  // Append year and duration to the infoDiv
  infoDiv.appendChild(yearSpan);
  infoDiv.appendChild(document.createElement("br")); // Add a line break to separate year and duration
  infoDiv.appendChild(durationSpan);

  // Append the infoDiv to the card
  card.appendChild(infoDiv);

  // Return the card's <div> element to the caller
  return card;
}
// Rest of the code remains the same

// Call the function to create artist buttons when the page is loaded
document.addEventListener("DOMContentLoaded", createArtistButtons);
