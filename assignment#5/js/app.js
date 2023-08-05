/**
 * WEB222 – Assignment 04
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
 *      Date:       July 21, 2023
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
  const songsTableBody = document.getElementById("songs");

  // Clear existing content
  selectedArtistHeading.innerHTML = "";
  songsTableBody.innerHTML = "";

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

  // Create table rows for each song
  artistSongs.forEach((song) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    const yearCell = document.createElement("td");
    const durationCell = document.createElement("td");

    titleCell.textContent = song.title;
    yearCell.textContent = song.year;
    durationCell.textContent = formatDuration(song.duration);

    row.appendChild(titleCell);
    row.appendChild(yearCell);
    row.appendChild(durationCell);

    songsTableBody.appendChild(row);
  });
}

// Function to format duration in mm:ss format
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Call the function to create artist buttons when the page is loaded
document.addEventListener("DOMContentLoaded", createArtistButtons);
