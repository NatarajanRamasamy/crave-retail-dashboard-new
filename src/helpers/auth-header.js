// export function authHeader() {
//     // return authorization header with jwt token
//     let user = JSON.parse(localStorage.getItem('user'));

//     if (user && user.token) {
//         return { 'Authorization': 'Bearer ' + user.token };
//     } else {
//         return {};
//     }
// }

function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('token');
    if (token) {
        return { Authorization: `${token}` };
    }
    return {};
}

export default authHeader;
