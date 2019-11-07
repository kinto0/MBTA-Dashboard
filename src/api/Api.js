import axios from 'axios';

const BASE_URL = 'https://api-v3.mbta.com';

export default {
  getStops() {
    BASE_URL + "stops?filter%5Broute_type%5D=1";
  },
  async getNextTrains(stop, inbound) {
    const URL = BASE_URL + `/predictions?sort=arrival_time&fields%5Bprediction%5D=arrival_time%2C%20departure_time&filter%5Bstop%5D=${stop}`

    const res = await axios.get(URL);
    return res.data.data;
  }
}