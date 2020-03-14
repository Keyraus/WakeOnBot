const Discord = require("discord.js");

class Embed {
    embed() {
        return new Discord.MessageEmbed()
            .setColor('#000000')
            .setFooter('Omedan RP Bot ' + require("../package.json").version, 'https://cdn.discordapp.com/avatars/556447098015318030/a4567613f1a46e9c165ba84b6d341eeb.png?size=256');
    }
}

module.exports = Embed;