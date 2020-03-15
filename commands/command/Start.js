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
            Aliases: ["boot", "launch", "play"],
            // Usage: "[<utilisateur>]",
            Description: "Démarre le serveur de Keyraus",
            Run: (args, message) => this.exec(args, message),
            ShowInHelp: true
        }
    }

    async exec() {
	try {
              const { stdout, stderr } = await exec('wakeonlan -i '+this.config.server.host+' '+this.config.server.MAC);
              console.log('stdout:', stdout);
              console.log('stderr:', stderr);
        }catch (err){
              console.error(err);
        };

        this.clients.discord.getClient().channels.fetch(this.config.discord.channel.general).then(channel => {
            let embed = this.discord.embed.embed();
            embed.setTitle("Start")
                 .setColor('#00FF00');
            channel.send(embed);
        })
    }
}

module.exports = Start;
