const util = require("util");
const exec = util.promisify(require('child_process').exec);

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

    async exec(message) {
	this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
	    if(!this.discord.members.checkPerm(message,"ADMIN")) {
                    channel.send("> **Vous n'avez pas les permissions !**");
                    return;
            }
	    channel.send("> Démarrage de la machine !");
	})
	try {
              const { stdout, stderr } = await exec('wakeonlan -i '+this.config.server.host+' '+this.config.server.mac);
              console.log('stdout:', stdout);
              console.log('stderr:', stderr);
        }catch (err){
              console.error(err);
        };
    }
}

module.exports = Start;
