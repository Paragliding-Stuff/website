const request = require("request");
const cheerio = require("cheerio");
const readline = require("readline");
const {exec} = require("child_process");
const replace = require("replace-in-file");


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
    var productType = $("div.sprd-detail-info__subheading-title").first().html();
    productType = productType.replace(/&#xE4;/,'ä');
    productType = productType.replace(/&amp;/, 'und');
    var description = $("div.sprd-detail-product-type__sub-container").first().find("div").first().html();

    console.log(productType);
    console.log(text + " -> " + href);
    
    var lang = "en";
    if (shopURL.indexOf(".de/") > 0) {
      lang = "de";
    }
    var filename = `product/${text}-${productType}.md`;
    filename = filename.replace(/\s|_/g, '-');

    exec(`cd .. && hugo new ${filename} --config config.${lang}.toml`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      
      const options = {
        files: `../content/${lang}/${filename}`,
        from: [/-shopurl-/, /-imageurl-/, /-description-/],
        to: [shopURL, href, description]
      }
      replace.sync(options);
    });
  });

  rl.close();
});





