import { POPUP_UI } from "./UI";

POPUP_UI.CLOSE_BUTTONS!.forEach((Button:Node) => {
    Button.addEventListener('click', () => {
        POPUP_UI.POPUP!.classList.remove('active');
    });
})