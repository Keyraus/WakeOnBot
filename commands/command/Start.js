const util = require("util");
const wol = require('node-wol');

class Start {

    constructor(opt) {
        this.clients = opt.clients;
        this.config = opt.config;
        this.discord = opt.discord;
    }

    getCommand() {
        return {
            Command: "start",
            // Aliases: ["boot", "launch", "play"],
            // Usage: "[<utilisateur>]",
            Description: "Démarre le serveur de Keyraus",
            Run: (args, message) => this.exec(args, message),
            ShowInHelp: true
        }
    }

    async exec(args, message) {
	this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
	    if(!this.discord.members.checkPerm(message,["ADMIN", "BOSS", "Admin", "Start", "Reboot", "Stop"])) {
                channel.send("> **Vous n'avez pas les permissions !**");
                return;
            }

	    wol.wake(this.config.server.mac, {
		address: this.config.server.host,
		port: 7
	    }, function (error) {
		if(error) {
		   console.log("Erreur lors du démarrage de la machine")
		   return;
		}
		console.log("start")
	    });

	    channel.send("> Démarrage de la machine !");
	})
    }
}

module.exports = Start;
