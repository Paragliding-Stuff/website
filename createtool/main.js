const request = require("request");
const cheerio = require("cheerio");
const readline = require("readline");
const {exec} = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var shopURL;

rl.question('Shop URL: ', (answer) => {
  shopURL = answer;
  console.log("Shop URL: " + shopURL);

  request({
    uri: shopURL,
  }, (error, response, body) => {
    var $ = cheerio.load(body);
    var img = $(".sprd-img-spinner__image").first();
    var text = img.attr("alt");
    var href = img.attr("src");

    console.log(text + " -> " + href);

    exec('cd .. && hugo new de/product/"' + text + '".md', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });

  rl.close();
});





