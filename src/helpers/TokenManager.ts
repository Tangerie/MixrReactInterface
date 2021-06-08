import cookie from 'react-cookies';

//Just some utility functions for managing the user token as a cookie
export function GetUserToken() : string | null {
    const token = cookie.load("token");
    return token;
}

export function SetUserToken(token : string) {
    cookie.save("token", token, {
        path: "/"
    });
    console.log("Saving Token", token);
}

export function RevokeUserToken() {
    cookie.remove("token");
    console.log("Revoking Token");
}