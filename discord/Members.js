class Members {
    checkPerm(message, role) {
        let member = message.guild.members.resolve(message.author.id)
	
	return member.roles.cache.some(r=>[role].includes(r.name));
    }
}

module.exports = Members;
