const fs = require('fs');
const request = require('request');
const userMedia = require('../lib/userRecentMedia.json').data;

const download = function (uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function () {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

(function () {
  const urls = userMedia.reduce((accum, post) => {
    const { thumbnail, low_resolution, standard_resolution } = post.images;
    const urls = [thumbnail, low_resolution, standard_resolution].map(version => version.url);
    return accum.concat(urls);
  }, []);

  urls.push('https://scontent.cdninstagram.com/vp/81d13e984af5e77a402f42fc511080e4/5C1EAE34/t51.2885-19/s150x150/13686980_1752391845037583_1672280724_a.jpg');

  for (const url of urls) {
    const path = url.split('https://scontent.cdninstagram.com/vp/')[1];

    const folders = path.split('/');
    const fileName = folders.pop();

    let relativePath = __dirname + '/../media';
    folders.forEach(folder => {
      relativePath += `/${folder}`;
      try {
        fs.mkdirSync(relativePath);
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    });


    download(url, `${relativePath}/${fileName}`)
      .then(() => {
        //eslint-disable-next-line
        console.log('Downloaded', url);
      })
      .catch((e) => {
        //eslint-disable-next-line
        console.error('Error while downloading: ', url);
        //eslint-disable-next-line
        console.error(e);
      });
  }
})();
