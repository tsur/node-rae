import 'site/styles.css';
import raeLogo from 'site/rae.png';
import fetch from 'isomorphic-fetch';
import Clipboard from 'clipboard';

const ENTER_KEY = 13;

function getParameterByName(paramName, url = window.location.href) {
  const regex = new RegExp(`[?&]${paramName.replace(/[[\]]/g, '\\$&')}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function getContent(word, action) {
  const loaderElement = document.querySelector('.loader');
  const matchesElement = document.querySelector('.matches');
  const matchesContentElement = document.querySelector('.definitions');
  const urlElement = document.querySelector('.url');
  try {
    matchesContentElement.remove();
    loaderElement.classList.remove('hidden');
    matchesElement.classList.add('hidden');
    urlElement.classList.add('hidden');
    urlElement.textContent = `http://zuri.rocks/rae?${action === 'search'
      ? 'buscar'
      : 'id'}=${encodeURI(word)}`;
    const serverResponse = await fetch(`${URL}${action}/${encodeURI(word)}`, {
      method: 'GET',
    });
    const matches = await serverResponse.json();
    const matchesContent = document.createElement('div');
    matchesContent.classList.add('definitions');
    if (!matches.multipleMatches) {
      matches.items.pop();
      matches.items.forEach((item) => {
        const p = document.createElement('p');
        p.textContent = item.match;
        matchesContent.appendChild(p);
      });
    } else {
      matches.items.forEach((item) => {
        const p = document.createElement('p');
        p.dataset.id = item.id;
        p.classList.add('fetch');
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
  const matchesElement = document.querySelector('.matches');
  const urlElement = document.querySelector('.url');
  const shareElement = document.querySelector('.share');

  // Set image src
  logoElement.src = raeLogo;
  // Set input handler
  searchInputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === ENTER_KEY && searchInputElement.value !== '') {
      getContent(searchInputElement.value, 'search');
    }
  });
  matchesElement.addEventListener('click', (event) => {
    const { target } = event;
    if (target && target.classList.contains('fetch')) {
      getContent(target.dataset.id, 'fetch');
    }
  });
  document.body.classList.remove('hidden');
  searchInputElement.focus();
  const clipboard = new Clipboard('.copy');
  clipboard.on('success', () => {
    setTimeout(() => searchInputElement.focus(), 1000);
  });
  shareElement.addEventListener('click', () => {
    urlElement.classList.remove('hidden');
  });
  if (getParameterByName('buscar')) {
    searchInputElement.value = getParameterByName('buscar');
    setTimeout(() => getContent(searchInputElement.value, 'search'), 500);
  } else if (getParameterByName('id')) {
    setTimeout(() => getContent(getParameterByName('id'), 'fetch'), 500);
  }
}

window.onload = init;
