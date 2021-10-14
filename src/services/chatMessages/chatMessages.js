import { DirectLine } from "botframework-directlinejs";
const BotDirectLineSecrets = import.meta.env.VITE_BotDirectLineSecrets;
/**
 * Initializes chat bot conversation.
 * @param messageRecievedHandler Overwrites the directLineMessageRecievedHandler function with parameters: userName and messagetext.
 * @param userName user name sending the message.
 */

const initConnection = (messageRecievedHandler, userName, lang) => {
  return new Promise((resolve, reject) => {
    if (messageRecievedHandler)
      directLineMessageRecievedHandler = messageRecievedHandler;
    if (lang === "fr") lang = "fr-ca";
    // console.log("test,", BotDirectLineSecrets);
    directLine = new DirectLine({
      secret: "yiHz27_FE80.9vj25h3HqN29yZ6-bJUIdLA4Ok9FjhcG9w5C63VwmNE",
      conversationStartProperties: {
        locale: lang,
      },
    });
    receiveMessageHandler();

    //Subscribe to connectionStatus updates
    directLine.connectionStatus$.subscribe(
      (connectionStatus) => {
        //Resolve conversationId on Online connectionStatus
        if (connectionStatus === 2) resolve(directLine.conversationId);
        //Reject FailedToConnect connectionStatus
        else if (connectionStatus === 4) reject(Error("Connection Failed"));
      },
      (error) => reject(error)
    );
  });
};

let directLine;
//directLineMessageRecievedHandler can be Overwritten with a function to handle directLine responses
let directLineMessageRecievedHandler = (userName, messageText) => {
  console.log(
    "Overwrite directLineMessageRecievedHandler to capture messages returned"
  );
};

const sendMessage = (msg, userName, lang) => {
  if (lang === "fr") lang = "fr-ca";
  return new Promise((resolve, reject) => {
    directLine
      .postActivity({
        // "from" is when the app support user accounts (authentication)
        from: { id: "UserId", name: userName }, // (from.name is optional)
        type: "message",
        text: msg,
        locale: lang,
      })
      .subscribe(
        (id) => resolve(id),
        (error) => reject(error)
      );
  });
};

const receiveMessageHandler = () => {
  directLine.activity$.subscribe(
    (activity) => {
      // If messages need their own id, pass activity.id as a parameter in the function below.
      directLineMessageRecievedHandler(
        activity.from.name,
        activity.text,
        activity.conversation.id,
        activity.suggestedActions,
        Date.parse(activity.timestamp)
      );
    },
    (err) => console.log(err)
  );
};

const ChatMessagesService = {
  sendMessage,
  initConnection,
};

export default ChatMessagesService;
