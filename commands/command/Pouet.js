const util = require("util");

class Pouet {

    constructor(opt) {
        this.clients = opt.clients;
        this.config = opt.config;
        this.discord = opt.discord;
    }

    getCommand() {
        return {
            Command: "pouet",
            // Aliases: ["doisuck", "plspp"],
            // Usage: "[<utilisateur>]",
            Description: "Renvoie pouet",
            Run: (args, message) => this.exec(args, message),
            ShowInHelp: true
        }
    }

    async exec(args, message) {
        let member = message.guild.members.resolve(message.author.id);
        let isAdmin = member.roles.cache.some(r=>["admin", "Admin", "ADMIN"].includes(r.name));


        this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
            if(!isAdmin) {
                channel.send("> **Vous n'avez pas les permissions !**");
                return;
            }

            let embed = this.discord.embed.embed();
            embed.setTitle("Pouet")
                .addField("Big Pouet", "Small Pouet")
                .setColor('#FF0000');
            channel.send(embed);
        })
    }
}

module.exports = Pouet;