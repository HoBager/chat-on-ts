import Cookies from "js-cookie";
import { CHAT_UI, POPUP_UI, VERIFICATION_UI } from "./UI";
import { apiGET } from "./api";

export function verification (){
    POPUP_UI.TITLE!.textContent = 'Подтверждение'; 
    VERIFICATION_UI.WINDOW!.classList.add('active');

    VERIFICATION_UI.FORM!.addEventListener('submit',(event:Event) => {
        event.preventDefault();

        saveToken(VERIFICATION_UI.INPUT!.value);
        nextStep();
    });
}

export async function saveMyName (){
    const response = await apiGET('https://edu.strada.one/api/user/me');
    const result = await response.json();

    sessionStorage.setItem('myEmail',result.email);
}

function saveToken (token:string){
    Cookies.set('token', token, { expires: 1 });
}

function nextStep(){
    VERIFICATION_UI.WINDOW!.classList.remove('active');
    CHAT_UI.CHAT!.classList.add('active');
    POPUP_UI.POPUP!.classList.remove('active');
}