import { verification } from "./verification.ts";
import { apiGET } from "./api.ts";
import { CHAT_UI, POPUP_UI, AUTHORIZATION_UI } from "./UI.ts";

export function authorization() {
  POPUP_UI.TITLE!.textContent = "Авторизация";

  AUTHORIZATION_UI.FORM!.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    if (AUTHORIZATION_UI.INPUT!.value) {
      sendMail(AUTHORIZATION_UI.INPUT!.value);

      nextStep();
    }
  });
}

export async function isAuth(): Promise<Boolean> {
  try {
    const response = await apiGET("https://edu.strada.one/api/user/me");

    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();

      sessionStorage.setItem("myEmail", result.email);

      return true;
    }

    throw new Error();
  } catch {
    return false;
  }
}

export function skipAuth(): void {
  POPUP_UI.POPUP!.classList.remove("active");
  CHAT_UI.CHAT!.classList.add("active");
  AUTHORIZATION_UI.WINDOW!.classList.remove("active");
}

async function sendMail(mail: string): Promise<void> {
  await fetch("https://edu.strada.one/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email: mail }),
  });
}

function nextStep(): void {
  AUTHORIZATION_UI.WINDOW!.classList.remove("active");
  verification();
}
