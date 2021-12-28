var Canvas = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports = {
  name: "r",
  description:
    "This is the command to show only the rectangle for showing datas!",
  async execute(message, args) {
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
    ctx.fillText("High", spaceForField * 2 - marginLR, marginTop);
    ctx.fillText("Low", spaceForField * 3 - 4 * marginLR, marginTop);
    ctx.fillText("Traded", spaceForField * 4 - 7 * marginLR, marginTop);
    ctx.fillText("LTP", spaceForField * 5 - 7 * marginLR, marginTop);
    ctx.fillText("Change (%)", spaceForField * 6 - 10 * marginLR, marginTop);
    ctx.fillText("Change Pt.", spaceForField * 7 - 4 * marginLR, marginTop);

    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "data-image.jpg"
    );

    message.reply({ files: [attachment] });
  },
};
