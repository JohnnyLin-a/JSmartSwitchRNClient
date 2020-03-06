import axios from 'axios';
import Config from 'react-native-config';

const sendGET = URLEndpoint => {
  return axios
    .get(URLEndpoint)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};

/* ALTERNATIVE TO AXIOS BELOW */
// const sendGET = URLEndpoint => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//         if (xhr.status === 200) {
//           console.log('XHR 200', xhr.response);
//           // resolve(JSON.parse(xhr.response));
//           // Server response sometimes missing '}' to complete the json
//           resolve({success: true});
//         } else {
//           console.log('XHR ' + xhr.status, xhr.response);
//           reject({success: false, reason: xhr.status});
//         }
//       }
//     };

//     xhr.open('GET', URLEndpoint);
//     xhr.send();
//   });
// };

export const openComputer = () => {
  return sendGET(Config.SERVER_URL + 'api/v1/openMyComputer.php');
};

export const openLights = () => {
  return sendGET(
    Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=open',
  );
};

export const closeLights = () => {
  return sendGET(
    Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=close',
  );
};
