'use strict';



// Import the discord.js module
const axios = require('axios')

const { Client, MessageEmbed } = require('discord.js');
require('dotenv').config();
// Create an instance of a Discord client
const client = new Client();






client.on('ready', () => {
  console.log('I am ready!');
  fetchFunction()
});

let mainMessage;
let readyMessage;

const setMessage = message =>{


    //it the message exists...
    if (message.content.length > 1) {
        mainMessage = message
        readyMessage = message.content.split(" " || "-" )
        return readyMessage;
    }
    return;
}

const showWeather =(weather, mainMessage, city)=>{
    const weatherEmber = new MessageEmbed()
        .setTitle(`the weather in ${city} is in ${weather.main.temp}°c`)
        .setFooter('Weather discord bot')
        .setColor('#F3E955')
    if (mainMessage) {
        mainMessage.channel.send(weatherEmber)
    }
}

const fetchFunction =(city)=>{
    if (city) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da0a6329e4d4905acb79f318e815ef02&lang=sp&units=metric`)
        .then(res => showWeather(res.data, mainMessage, city))
        .catch(err => console.log(err))
    }
}

//le llega el mensaje
client.on('message', message => {
    //prepara el mensaje separandolo
    let msg = setMessage(message)
    //revisa si el mensaje tiene el formato correcto
    if (msg && msg[0] === "!weather") {
        let city = msg.splice(1, 3).join(" ")
        fetchFunction(city)
    }
    if (msg && msg === "!weather") {
        message.reply("The format is: !weather <city>")
    }

  });

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.DISCORD_TOKEN);
