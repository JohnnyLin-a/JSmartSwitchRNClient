import axios from 'axios';
import Config from 'react-native-config';

/**
 * Send a GET Request through axios with URLEndpoint
 *
 * @param {string} URLEndpoint
 */
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
// /**
// * Send a GET Request manually (XHR) with URLEndpoint
// *
// * @param {string} URLEndpoint
// */
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

/**
 * Send GET Request to 'api/v1/openMyComputer.php' endpoint
 */
export const openComputer = () => {
  return sendGET(Config.SERVER_URL + 'api/v1/openMyComputer.php');
};

/**
 * Send GET Request to 'api/v1/controlLights.php?control=open' endpoint
 */
export const openLights = () => {
  return sendGET(
    Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=open',
  );
};

/**
 * Send GET Request to 'api/v1/controlLights.php?control=close' endpoint
 */
export const closeLights = () => {
  return sendGET(
    Config.SERVER_URL + 'api/v1/controlLights.php' + '?control=close',
  );
};
