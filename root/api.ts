import Cookies from "js-cookie";

export async function apiGET(url:string){
    return await fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
}

export async function apiOthersAuthMethods (url:string,anyMethod:string,body:Object){
    await fetch(url, {
        method: anyMethod,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(body)
      });
}