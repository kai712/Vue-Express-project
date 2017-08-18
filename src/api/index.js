import axios from 'axios';

//GET
export function get(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res.data)
      })
      .catch(function (err) {
        reject(err);
      });
  })
}

//POST
export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch(function (err) {
        reject(err);
      });
  })
}
