import axios from 'axios';
import Config from 'react-native-config';

const sendGET = URLEndpoint => {
  axios
    .get(URLEndpoint)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

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
