//if you are reading this you have access to Doctor Viris's public compile of the Discord ChatGPT or well a copy that isnt really ChatGPT this is made so you dont need to fucking do it yourself lol
//Viris Multimedia Bot V1
require('dotenv').config();

//IMPORTANT CODE 
//This is related to calling the Discord API from our discord lords

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

//IMPORTANT CODE
//This is related to connected to calling the OpenAI servers and its API
//Dont fucking touch unless you wanna remove this

const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OpenAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

//IMPORTANT
//The bot checks if there is a message sent in said server it is in
client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;

        const gptResponse = await openai.createCompletion({
            model: "davinci",
            prompt: `ChatGPT is a friendly chatbot.\n\
ChatGPT: Hello, Im the Prototype Viris how are you?\n\
${message.author.username}: ${message.content}\n\
ChatGPT:`,
            temperature:0.9,
            max_tokens: 500,
            stop: ["ChatGPT:", "Viris:"],
        })
        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    } catch(err){
        console.log(err)
    }
});
client.login(process.env.DISCORD_KEY)
console.log("Viris is now online")
