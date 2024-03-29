class WakeOnBot {

    constructor() {
        // Déclaration de la configuration

        this.config = require("./config.json");

	let SSH = require('simple-ssh');

        this.global = {
            ssh: new SSH({
                host: this.config.server.host,
                user: this.config.server.username,
                pass: this.config.server.password
            })
        }

        // Déclaration des clients

        let clients = {
            Discord: require("./clients/DiscordClient.js")
        };

        // Instanciation des clients

        this.clients = {
            discord: new clients.Discord(this)
        };

        this.discord = {
            embed: new (require("./discord/Embed.js")),
	    members: new (require("./discord/Members.js"))
        }

        // Instanciation et initialisation des Managers

        let managers = {
            Commands: require("./commands/Manager.js")
        };

        this.managers = {
            commands: new managers.Commands(this)
        };

        // Initialisation du bot

        this.init()
    }

    async init() {
	let prefix = this.config.discord.prefix
        this.clients.discord.loginClient();
        this.clients.discord.getClient().on("ready", async () => {
            // this.utils.Logger.log("Discord: Ready.");
            await this.clients.discord.getClient().user.setActivity(prefix + 'start ' + prefix + 'reboot ' + prefix +'stop', {
                type: "WATCHING"
            });
            this.managers.commands.init();
            // this.utils.Logger.log("CronJob: Ready.");
            // new CronJob('0 0 * * *', async () => {
            //     this.utils.Logger.log("CronJob: Refreshing.");
            //     await this.utils.ScoreSaber.refreshGuild("531101359471329291");
            // }, null, true, 'Europe/London');
        });
    }

}

let Index = new WakeOnBot();
