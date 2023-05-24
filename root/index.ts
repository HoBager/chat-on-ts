import { authorization, skipAuth, isAuth } from "./authorization.js";
import { CHAT_UI } from "./UI.js";
import { apiGET } from "./api.js";
import Cookies from "js-cookie";

let breack: boolean = true;

document.addEventListener('DOMContentLoaded', async () => {
    await isAuth() ? skipAuth() : authorization();
    
    getMessages();
    loadHistory();
});

const templateMessage: HTMLTemplateElement | null = document.querySelector('#tmp__message');
const socket: WebSocket = new WebSocket(`wss://edu.strada.one/websockets?${Cookies.get('token')}`);
let lastMessegeIndex: number = 0;


declare module Message {

    export interface User {
        email: string;
        name: string;
    }

    export interface RootObject {
        _id: string;
        text: string;
        user: User;
        createdAt: Date;
        updatedAt: Date;
        __v: number;
    }

}

CHAT_UI.WINDOW!.addEventListener('scroll',virtualize);

function virtualize(this: any) {
    let cordWindow: number = this.scrollHeight + this.scrollTop - this.clientHeight;
    let scrollHeightLast: number = this.scrollHeight;
    
    if(cordWindow < 40 && breack){
        
        loadHistory();

        this.addEventListener('scroll',virtualize);

        breack = !breack;

        CHAT_UI.WINDOW!.scrollTop = CHAT_UI.WINDOW!.scrollTop + this.scrollHeight - scrollHeightLast;
        setTimeout(() => {
            breack = !breack;
        },1000);     
    }
}

async function getMessages():Promise<void> {
    const response = await apiGET('https://edu.strada.one/api/messages/');
    const messages = await response.json();

    localStorage.setItem('historyMesseges',JSON.stringify(messages.messages));
}

function loadHistory(){
    const messages = JSON.parse(localStorage.getItem('historyMesseges') as string);
    const messagesPiece = messages.slice(lastMessegeIndex,lastMessegeIndex + 20);

    CHAT_UI.WINDOW!.append(...messagesPiece.map((message: Message.RootObject) => {
        return createMessage(message)
    }));

    lastMessegeIndex += 20;
}

function createMessage(message: Message.RootObject) {
    const template = templateMessage!.content.cloneNode(true) as DocumentFragment;
    const bodyMessage = document.createElement('div');
    const textMessage = template.querySelector('p');
    const userName = message.user.name;
    const isMine = isMyMessage(message.user.email) ? 'my-message' : 'other-message';
    const classes = `chat__message`
    bodyMessage.classList.add(classes);
    bodyMessage.classList.add(isMine);
    textMessage!.textContent = `${userName}: ${message.text}`;

    bodyMessage.append(template);
    
    return bodyMessage;
}


function sendMessage(textMessage: string) {
    socket.send(JSON.stringify({ text: textMessage }));
}

function isMyMessage(email:string):boolean {
    const myUserName = sessionStorage.getItem('myEmail');
    
    return myUserName === email
}

CHAT_UI.FORM!.addEventListener('submit', (event:Event) => {
    event.preventDefault();
    const textMessage = CHAT_UI.INPUT!.value;
    CHAT_UI.INPUT!.value = '';
    
    sendMessage(textMessage);
})

socket.onmessage = (event) => {
    CHAT_UI.WINDOW!.prepend(createMessage(JSON.parse(event.data)));
}

