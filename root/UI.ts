export const CHAT_UI:{
    CHAT: HTMLDivElement | null,
    FORM: HTMLFormElement | null,
    WINDOW: HTMLDivElement | null,
    INPUT: HTMLInputElement | null,
} = {
    CHAT: document.querySelector('.chat'),
    FORM: document.querySelector('.chat__form'),
    WINDOW: document.querySelector('.chat__window'),
    INPUT: document.querySelector('.chat__input'),
}

export const POPUP_UI: {
    POPUP: HTMLDivElement | null,
    TITLE: HTMLDivElement | null,
    CLOSE_BUTTONS: NodeList | null,
} = {
    POPUP: document.querySelector('.popup'),
    TITLE: document.querySelector('.popup__title'),
    CLOSE_BUTTONS: document.querySelectorAll('.popup__close'),
}

export const AUTHORIZATION_UI: {
    FORM: HTMLFormElement | null
    INPUT: HTMLInputElement | null,
    WINDOW: HTMLDivElement | null,
} = {
    FORM: document.querySelector('.authorization-form'),
    INPUT: document.querySelector('.authorization-input'),
    WINDOW: document.querySelector('.authorization'),
}

export const VERIFICATION_UI: {
    FORM: HTMLFormElement | null,
    INPUT: HTMLInputElement | null,
    WINDOW: HTMLDivElement | null,
} = {
    FORM: document.querySelector('.verification-form'),
    INPUT: document.querySelector('.verification-input'),
    WINDOW: document.querySelector('.verification'),
}

export const SETTINGS_UI: {
    WINDOW: HTMLDivElement | null,
    OPEN_BUTTON: HTMLAnchorElement | null,
    NAME_FORM: HTMLFormElement | null,
    NAME_INPUT: HTMLInputElement | null,
} = {
    WINDOW: document.querySelector('.settings'),
    OPEN_BUTTON: document.querySelector('.chat__settings'),
    NAME_FORM: document.querySelector('.name-form'),
    NAME_INPUT: document.querySelector('.name-input'),
}