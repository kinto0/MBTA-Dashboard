<template>
  <div v-if="station">
    <h1>{{station}}</h1>
    <h2>Inbound: {{inbound}}</h2>
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
  eta: "",
  methods: {
    getNextTrains() {
      var time = new Date();
      Api.getNextTrains(this.station).then(res => {
        console.log(res);
        var eta = new Date(res[0].attributes.arrival_time);
        console.log(eta);
      });
    }
  },
  created() {
    this.getNextTrains();
  }
};
</script>