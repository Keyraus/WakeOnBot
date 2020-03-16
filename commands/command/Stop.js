const util = require("util");

class Stop {

    constructor(opt) {
        this.clients = opt.clients;
        this.config = opt.config;
        this.discord = opt.discord;
        this.global = opt.global;
    }

    getCommand() {
        return {
            Command: "stop",
            // Aliases: ["doisuck", "plspp"],
            // Usage: "[<utilisateur>]",
            Description: "Éteint la machine",
            Run: (args, message) => this.exec(args, message),
            ShowInHelp: true
        }
    }

    async exec(message) {
        if(!this.discord.members.checkPerm(message,"ADMIN")) {
                channel.send("> **Vous n'avez pas les permissions !**");
                return;
        }

	try {
            this.global.ssh.exec('shutdown now').start();
        }
	catch (error) {
            console.log(error)
            return;
        }

        this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
            channel.send("> Arrêt de la machine !");
        })
    }
}

module.exports = Stop;
