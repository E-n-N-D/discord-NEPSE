var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

let d = 200.1924;
d.toFixed(2);

var datas = null;

module.exports = {
  name: "show",
  description: "This is the command to show info of certain symbol",
  async execute(message, args) {
    xhr.onload = async function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var temp = xhr.responseText;
        let data = await JSON.parse(temp);
        if (data.d[0]) {
          const info = data.d[0].v;
          console.log(info);
          const canvas = Canvas.createCanvas(900, 100);
          const ctx = canvas.getContext("2d");
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, 50);
          ctx.fillStyle = "#009879";
          ctx.fill();

          ctx.beginPath();
          ctx.rect(0, 50, canvas.width, 50);
          ctx.fillStyle = "#f3f3f3";
          ctx.fill();

          const marginLR = 10;
          const marginTop = 35;
          const spaceForField = canvas.width / 8; // 8 is the number of field to include

          ctx.font = "28px sans-serif";
          ctx.fillStyle = "#ffffff";
          ctx.fillText("Symbol", marginLR, marginTop);
          ctx.fillText("Open", spaceForField + marginLR, marginTop);
          ctx.fillText("High", spaceForField * 2 -marginLR, marginTop);
          ctx.fillText("Low", spaceForField * 3 - 4 * marginLR, marginTop);
          ctx.fillText("Traded", spaceForField * 4 - 7 * marginLR, marginTop);
          ctx.fillText("LTP", spaceForField * 5 - 7 * marginLR, marginTop);
          ctx.fillText("Change (%)", spaceForField * 6 - 10 * marginLR, marginTop);
          ctx.fillText("Change Pt.", spaceForField * 7 - 4 *marginLR, marginTop);

          const mTop = 80;

          ctx.font = "28px sans-serif";
          ctx.fillStyle = "#009879";
          ctx.fillText(info.description, marginLR, mTop);
          ctx.fillText(info.open_price, spaceForField + marginLR, mTop);
          ctx.fillText(info.high_price, spaceForField * 2 - marginLR, mTop);
          ctx.fillText(info.low_price, spaceForField * 3 - 4 * marginLR, mTop);
          ctx.fillText(info.volume, spaceForField * 4 - 7 * marginLR, mTop);
          ctx.fillText(info.lp, spaceForField * 5 - 7 * marginLR, mTop);
          ctx.fillText((info.chp - 0).toFixed(2), spaceForField * 6 - 7 * marginLR , mTop);
          ctx.fillText(info.ch.toFixed(2), spaceForField * 7 - marginLR, mTop);

          const attachment = new MessageAttachment(
            canvas.toBuffer(),
            "data-image.jpg"
          );

          message.reply({ files: [attachment] });

        } else {
          message.channel.send("Invalid symbol! Check and try again!");
        }
      } else {
        message.channel.send(
          "Command execution failed! We will look into it shortly."
        );
        console.log(xhr.responseText);
      }
    };

    xhr.open(
      "GET",
      `https://nepsealpha.com/trading/1/quotes?symbols=${args[0].toUpperCase()}&force=28420`
    );
    xhr.send();
  },
};
