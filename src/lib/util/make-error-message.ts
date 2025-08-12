type Message = string | string[];

interface MessageObject {
  message: Message;
}

type ServerErrorMessage = Message | MessageObject;

function makeString(message: Message) {
  if (Array.isArray(message)) {
    return message.join('. ');
  }

  return message;
}

export default function makeErrorMessage(message: ServerErrorMessage) {
  if (typeof message === 'string' || Array.isArray(message)) {
    return makeString(message);
  }

  return makeString(message.message);
}
