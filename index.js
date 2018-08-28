const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
let coins = require("./coins.json");




bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity("envy is best");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if (message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }

    let coinAmt = Math.floor(Math.random() * 15) +1;
    let baseAmt = Math.floor(Math.random() * 15) +1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt){
      coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmt
      };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#7700ff")
    .addField(":money_with_wings:", `${coinAmt} coins added!`);

    message.channel.send(coinEmbed);
    }

    // commands start here lul

    if(cmd === `${prefix}hello`){
        return message.reply("hi you faggot");
    }

    if(cmd === `${prefix}kick`){

        //!kick @daeshan askin for it
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("sorry, can't do that");
        if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("that person can't be kicked");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#7700ff")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);
    
        let kickChannel = message.guild.channels.find(`name`, "logs");
        if(!kickChannel) return message.channel.send("can't find logs channel");
    
        message.delete().catch(O_o=>{});
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
      }

      if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("can't find user");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("sorry, can't do that");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("that person can't be banned");
    
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#7700ff")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    
        let incidentchannel = message.guild.channels.find(`name`, "logs");
        if(!incidentchannel) return message.channel.send("can't find logs channel");
    
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
    
    
        return;
      }

      if(cmd === `${prefix}report`){
    
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("couldn't find user");
        let rreason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#7700ff")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("couldn't find reports channel");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
        return;
      }
    
      if(cmd === `${prefix}ping`){
          return message.channel.send("Pong!");
      }
    
      if(cmd === `${prefix}say`){
        let text = messageArray.slice(1).join(" "); 
        
        message.delete();
        return message.channel.send(text);
      }

      if(cmd === `${prefix}nigga`){
          message.delete();
          return message.channel.send("lol nigga")
      }

      if(cmd === `${prefix}stop`){
          return message.channel.send("being racist you faggot")
      }

      if(cmd === `${prefix}roll`){
          var roll = Math.floor(Math.random() * 6) +1;
          message.delete();
          message.reply("you rolled a " + roll)
      }

    if(cmd === `${prefix}serverinfo`){

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#7700ff")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);
    
        return message.channel.send(serverembed);
      }

      if(cmd === `${prefix}userinfo`){

        let bicon = message.author.avatarURL;
        let userembed = new Discord.RichEmbed()
        .setDescription("User Info")
        .setColor("#7700ff")
        .setThumbnail(bicon)
        .addField("User Name", message.author.username)
        .addField("Created At", message.author.createdAt)

        return message.channel.send(userembed);
      }


    if(cmd === `${prefix}botinfo`){

        let bicon = bot.user.displayAvatarURL;
        let botembed =  new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor("#7700ff")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created By", "envy#5600")
        .addField("Created On", bot.user.createdAt);

        return message.channel.send(botembed);
    }

})

bot.login(process.env.BOT_TOKEN);
