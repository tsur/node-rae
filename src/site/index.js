import 'site/styles.css';
import raeLogo from 'site/rae.png';
import fetch from 'isomorphic-fetch';

const ENTER_KEY = 13;
const SERVER_URL = 'http://localhost:3000/';

async function searchContent(word) {
  const loaderElement = document.querySelector('.loader');
  const matchesElement = document.querySelector('.matches');
  const matchesContentElement = document.querySelector('.matches div');
  try {
    matchesContentElement.remove();
    loaderElement.classList.remove('hidden');
    matchesElement.classList.add('hidden');
    const serverResponse = await fetch(`${SERVER_URL}${encodeURI(word)}`, { method: 'GET' });
    const matches = await serverResponse.json();
    const matchesContent = document.createElement('div');
    if (!matches.multipleMatches) {
      matches.items.pop();
      matches.items.forEach((item) => {
        const p = document.createElement('p');
        p.textContent = item.match;
        matchesContent.appendChild(p);
      });
    }
    matchesElement.appendChild(matchesContent);
    matchesElement.classList.remove('hidden');
  } catch (e) {
    console.error(e);
  } finally {
    loaderElement.classList.add('hidden');
  }
}

function init() {
  const logoElement = document.querySelector('.logo');
  const searchInputElement = document.querySelector('.search-bar');
  // Set image src
  logoElement.src = raeLogo;
  // Set input handler
  searchInputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === ENTER_KEY && searchInputElement.value !== '') {
      searchContent(searchInputElement.value);
    }
  });
  document.body.classList.remove('hidden');
  searchInputElement.focus();
}

window.onload = init;
