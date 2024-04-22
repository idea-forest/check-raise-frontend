import ky from 'ky';

let userData = localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') : "";
console.log(userData)
class HTTPError extends Error { }
const AdminAuth = ky.extend({
  // prefixUrl: "https://api.checkraise.ch/api/",
  // prefixUrl:"http://localhost:8000/api",
  prefixUrl:process.env.REACT_APP_API_URL,
  hooks: {
    beforeRequest: [
      (options) => {
        const localHeaders = JSON.parse(localStorage.getItem('admintoken'));

        if (localHeaders) {
          // console.log("token work",localHeaders);
          options.headers.set('Authorization', `Bearer ${localHeaders}`);
        }
      },
    ],
    afterResponse: [
      async (response) => {
        if (response.status === 401) {

          const body = await response.json()
          throw new HTTPError(body.message);
        }
      }
    ]
  },
  // headers: { 'Authorization': `Bearer ${userData}` }
});

export default AdminAuth;