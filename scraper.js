var Nightmare = require('nightmare');

function findHedgieImage(keyword) {
  var nightmare = Nightmare();

  return nightmare
    .goto('https://www.google.com')
    .insert('input[title="Search"]', `hedgehog ${keyword}`)
    .click('input[value="Google Search"]')
    .wait('a.q.qs')
    .click('a.q.qs')
    .wait('div#res.med')
    .evaluate(function() {
      var photoDivs = document.querySelectorAll('img.rg_ic');
      var list = [].slice.call(photoDivs);

      return list.map(function(div) {
        return div.src;
      });
    })
    .end()
    .then(function (result) {
      return result.slice(1, 5);
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

module.exports = findHedgieImage;
