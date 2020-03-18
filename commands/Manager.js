const Filesystem = require("fs");

class Manager {

    constructor(opt) {
        this.config = opt.config;
        this.clients = opt.clients;
        this.discord = opt.discord;
	this.global = opt.global;

        this.commands = {};
    }

    init() {
        Filesystem.readdirSync("./commands/command/").forEach(file => {
            let cmd = new (require("./command/" + file))(this);
            this.registerCommand(cmd.getCommand())
        });

        this.registerEvent()
    }

    registerCommand(command) {
        this.commands[command.Command] = command
    }

    registerEvent() {

        this.clients.discord.getClient().on("message", message => {
	    // Vérifie que c'est bien dans le bon channel + bon préfix
	    if(message.channel.id !== this.config.discord.channel.general || message.content.charAt(0) !== this.config.discord.prefix)
               return;    

            let args = message.content.split(" ");
            args[0] = args[0].replace(this.config.discord.prefix, "");
console.log(this.commands[args[0]])

            if(this.commands[args[0]]) {
                let command = this.commands[args[0]];
                command.Run(args.slice(1), message);
            }
        });
    }

}

module.exports = Manager;
