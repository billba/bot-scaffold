"use strict";
const botbuilder_1 = require('botbuilder');
const restify_1 = require('restify');
const dotenv_1 = require('dotenv');
dotenv_1.config();
const server = restify_1.createServer();
server.listen(process.env.port || process.env.PORT || 3978, '::', () => console.log('%s listening to %s', server.name, server.url));
const connector = new botbuilder_1.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());
var bot = new botbuilder_1.UniversalBot(connector);
bot.dialog('/', new botbuilder_1.IntentDialog()
    .onDefault((session, args, next) => {
    console.log("Message received:", session.message.text);
    session.send("I am a very simple bot indeed.");
}));
