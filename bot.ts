import { UniversalBot, ChatConnector, Prompts, DialogAction, IntentDialog, Session } from 'botbuilder';
import { createServer } from 'restify';
import { config } from 'dotenv';

config();

const server = createServer();
server.listen(process.env.port || process.env.PORT || 3978, '::', () =>
   console.log('%s listening to %s', server.name, server.url)
);
const connector = new ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var bot = new UniversalBot(connector);

bot.dialog('/',
    new IntentDialog()
    .onDefault(
        (session, args, next) => {
            console.log("Message received:", session.message.text);
            session.send("I am a very simple bot indeed.")
        }
    )
);