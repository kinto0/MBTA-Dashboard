<template>
  <div v-if="station">
    <h1>{{station}}</h1>
    <h2>Inbound: {{inbound}}</h2>

    <p>
      Next train arriving in {{nextArrival}}.
      The one after that arrives in {{secondArrival}}.
    </p>
    <button v-on:click="updateTrains()">Update</button>
  </div>
</template>

<script>
import Api from "../api/Api";

export default {
  name: "NextTrain",
  props: {
    inbound: Boolean,
    station: String
  },
  data() {
    return {
      trains: [],
      nextArrival: "",
      secondArrival: ""
    };
  },
  computed: {
    nextTrain() {
      if (this.trains != undefined && this.trains.length > 0) {
        return this.trains[0];
      } else {
        return { arrival: -1 };
      }
    },
    secondTrain() {
      if (this.trains != undefined && this.trains.length > 1) {
        return this.trains[1];
      } else {
        return { arrival: -1 };
      }
    },
    rightNow() {
      return new Date().getTime();
    }
  },
  methods: {
    updateTrains() {
      Api.getNextTrains(this.station).then(res => {
        if (res != undefined && res.length > 0) {
          this.trains = [];
          res.forEach(train => {
            this.trains.push({
              arrival: new Date(train.attributes.arrival_time).getTime(),
              departure: new Date(train.attributes.departure_time).getTime()
            });
          });
          this.countdown();
        }
      });
    },
    countdown() {
      let rightNow = new Date().getTime();
      let date = new Date(null);
      date.setSeconds((this.nextTrain.arrival - rightNow) / 1000);
      this.nextArrival = date.toISOString().substr(14, 5);
      date.setSeconds((this.secondTrain.arrival - rightNow) / 1000);
      this.secondArrival = date.toISOString().substr(14, 5);
    }
  },
  mounted() {
    this.updateTrains();
    this.interval = setInterval(this.countdown, 1000);
  }
};
</script>