const util = require("util");

class Reboot {

    constructor(opt) {
        this.clients = opt.clients;
        this.config = opt.config;
        this.discord = opt.discord;
        this.global = opt.global;
    }

    getCommand() {
        return {
            Command: "reboot",
            // Aliases: ["doisuck", "plspp"],
            // Usage: "[<utilisateur>]",
            Description: "Redémarre la machine",
            Run: (args, message) => this.exec(args, message),
            ShowInHelp: true
        }
    }

    async exec(message) {
        if(!this.discord.members.checkPerm(message,"ADMIN")) {
                channel.send("> **Vous n'avez pas les permissions !**");
                return;
        }

	this.global.ssh.exec('reboot', {
            out: function(stdout) {
                console.log(stdout);
            }
        }).start();

        this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
            channel.send("> Redémarrage de la machine !");
        })
    }
}

module.exports = Reboot;
