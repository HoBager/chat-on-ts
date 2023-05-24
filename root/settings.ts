import { POPUP_UI, SETTINGS_UI } from "./UI";
import { apiOthersAuthMethods } from "./api.js";

SETTINGS_UI.OPEN_BUTTON!.addEventListener('click', () => {
    POPUP_UI.TITLE!.textContent = 'Настройки';
    SETTINGS_UI.WINDOW!.classList.add('active');
    POPUP_UI.POPUP!.classList.add('active');
})

SETTINGS_UI.NAME_FORM!.addEventListener('submit', (event:Event) => {
    event.preventDefault();

    if (SETTINGS_UI.NAME_INPUT!.value) {
        changeName(SETTINGS_UI.NAME_INPUT!.value);
    }
});

async function changeName(newName:string) {
    apiOthersAuthMethods('https://edu.strada.one/api/user', 'PATCH', { name: newName });
}