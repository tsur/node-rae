const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(path.join(__dirname, '..', '..', 'build'), (err) => {
  if (err) {
    return console.log('Error', err);
  }
  return console.log('Deployed to gh-pages');
});
