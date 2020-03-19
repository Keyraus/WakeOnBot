const Discord = require("discord.js");
const info = require("../package.json");

class Embed {
    embed() {
        return new Discord.MessageEmbed()
            .setColor('#000000')
            .setFooter(info.name + ' ' + info.version);
    }
}

module.exports = Embed;
