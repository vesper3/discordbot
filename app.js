'use strict';

const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');
const files = require('./filesystem.js');

const bot = new Discord.Client();

const token = settings.token;
const botOwner = settings.botOwnerID;

const prefix = settings.prefix;

bot.on('ready', () => {
    console.log('I am ready!');
    //bot.guilds.forEach(function (guild) {
    //    guild.defaultChannel.sendMessage('God is here.');
    //});
});

bot.on('guildCreate', guild => {
    console.log(`I have joined ${guild.name}`);
    guild.defaultChannel.sendMessage('God is here.');
});

bot.on('guildDelete', guild => {
    console.log(`I have left ${guild.name}`);
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.id === '142837284495032320') {
        var found = true;
        fs.readdir('./', function (err, items) {
            var i = 0;
            var size = items.length;

            while (i < items.length) {
                if (items[i].includes(prefix)) {
                    found = true;
                    break;
                }
                i++;
            }
        });

        if (!found) {
            newMember.guild.defaultChannel.sendMessage('Could not find file for Jake')
        } else {
            let voiceChannel = newMember.voiceChannel;
            if (!voiceChannel) {
                console.log('you have fucked up');
            } else

                if (voiceChannel.type !== 'voice') {

                } else {
                    voiceChannel.join().then(() => {
                        const dispatcher = voiceChannel.connection.playFile('./hotone.mp3');
                        dispatcher.once('end', () => {
                            voiceChannel.leave();
                        });
                    });
                }
        }
    }

});

bot.on('message', message => {
    let args = message.content.split(' ').slice(1);
    var result = args.join(' ');

    if (message.author.bot) { return; }
    else {
        switch (true) {
            case message.content.startsWith(prefix + 'alive'):
                message.channel.sendMessage('I am alive');
                break;
            case message.content.startsWith(prefix + 'local'):
                if (!result) {
                    message.channel.sendMessage('Usage: !local <filename>');
                } else {
                    var found = true;
                    fs.readdir('./', function (err, items) {
                        var i = 0;
                        var size = items.length;

                        while (i < items.length) {
                            if (items[i].includes(prefix)) {
                                found = true;
                                break;
                            }
                            i++;
                        }
                    });

                    if (found === false) { message.channel.sendMessage('File not found.') }
                    else {
                        let voiceChannel = message.member.voiceChannel;

                        if (!voiceChannel) {
                            message.channel.sendMessage('You are not in a voice channel!')
                                .catch(error => message.channel.sendMessage(error));
                        } else

                            if (voiceChannel.type !== 'voice') {
                                message.channel.sendMessage('Channel does not support voice!')
                                    .catch(error => message.channel.sendMessage(error));
                            } else

                                if (message.guild.voiceConnection) {
                                    message.channel.sendMessage('I\'m already in a voice channel');
                                } else {
                                    message.channel.sendMessage('Joining...').then(() => {
                                        voiceChannel.join().then(() => {
                                            message.channel.sendMessage('Joined successfully.').catch(error => message.channel.sendMessage(error));
                                            const dispatcher = voiceChannel.connection.playFile('./' + result);
                                            dispatcher.once('end', () => { voiceChannel.leave(); });


                                        }).catch(error => message.channel.sendMessage(error));
                                    }).catch(error => message.channel.sendMessage(error));


                                }
                    }
                }
                break;
            case message.content.startsWith(prefix + 'leave'):
                let voiceChannel = message.member.voiceChannel;
                if (!voiceChannel) {
                    message.channel.sendMessage('I am not in a voice channel');
                } else {
                    message.channel.sendMessage('Leaving...').then(() => {
                        voiceChannel.leave();
                    }).catch(error => message.channel.sendMessage(error));
                }
                break;
            case message.content.startsWith(prefix + 'listlocal'):
                fs.readdir('./', function (err, items) {

                    var i = 0;
                    var count = 1;
                    var size = items.length;

                    while (i < items.length) {
                        if (items[i].includes(".mp3")) {
                            message.channel.sendMessage(count + '. ' + items[i])
                            count++;
                        }
                        i++;
                    }
                    message.content.includes
                    if (count === 1) {
                        message.channel.sendMessage('No local sound file found!');
                    }

                });
            default:
                break;
        }
        //if (message.content.startsWith(prefix)) {
        //    if (message.content === prefix + 'alive') {
        //        message.channel.sendMessage('I am alive');
        //    } else
            
        //    if (message.content.startsWith(prefix + 'local')) {

        //    }

            //if (message.content === prefix + 'join') {
            //    let voiceChannel = message.member.voiceChannel;

            //    if (!voiceChannel) {
            //        message.channel.sendMessage('You are not in a voice channel!')
            //            .catch(error => message.channel.sendMessage(error));
            //    } else

            //    if (voiceChannel.type !== 'voice') {
            //        message.channel.sendMessage('Channel does not support voice!')
            //            .catch(error => message.channel.sendMessage(error));
            //    } else

            //    if (message.guild.voiceConnection) {
            //        message.channel.sendMessage('I\'m already in a voice channel');
            //    } else {
            //        message.channel.sendMessage('Joining...').then(() => {
            //            voiceChannel.join().then(() => {
            //                message.channel.sendMessage('Joined successfully.').catch(error => message.channel.sendMessage(error));
            //            }).catch(error => message.channel.sendMessage(error));
            //        }).catch(error => message.channel.sendMessage(error));
            //    }
            //} else

            //if (message.content === prefix + 'leave') {
            //    let voiceChannel = message.member.voiceChannel;
            //    if (!voiceChannel) {
            //        message.channel.sendMessage('I am not in a voice channel');
            //    } else {
            //        message.channel.sendMessage('Leaving...').then(() => {
            //            voiceChannel.leave();
            //        }).catch(error => message.channel.sendMessage(error));
            //    }
            //}
        //}
    }
});


bot.login(token);