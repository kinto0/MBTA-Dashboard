<template>
  <div v-if="station">
    <h1>{{station}}</h1>
    <h2>Inbound: {{inbound}}</h2>

    <p>
      Next train arriving in {{(nextTrain.arrival - rightNow) / 1000}}.
      The one after that arrives in {{(secondTrain.arrival - rightNow) / 1000}}.
    </p>
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
      trains: []
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
      var time = new Date();
      Api.getNextTrains(this.station).then(res => {
        if (res != undefined && res.length > 0) {
          res.forEach(train => {
            this.trains.push({
              arrival: new Date(train.attributes.arrival_time).getTime(),
              departure: new Date(train.attributes.departure_time).getTime()
            });
          });
        }
      });
    }
  },
  mounted() {
    this.updateTrains();
  }
};
</script>