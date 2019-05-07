import axios from 'axios';

export const baseUrl = `${window.location.protocol}//${window.location.host}`;

export const redirectToLink = async (link, newWindow) => {
    return await axios.get(`/links/${link}`)
      .then((response) => {
          if (newWindow) {
            window.open(response.data.url, '_blank');
          } else {
            window.location.href = response.data.url;
          }
      })
      .catch(() => window.location.href = '/');
}