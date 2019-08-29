<template>
  <div>
    <h1>Please select a station</h1>
    <v-autocomplete
      v-model="station"
      :items="stations"
      label="Select a station"
      item-text="name"
      item-value="value"
    >
      <template v-slot:selection="data">
        <v-chip v-bind="data.attrs" :input-value="data.selected">
          <v-avatar left>
            <div class="v-image" v-bind:style="{ backgroundColor: data.item.color}" />
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-avatar>
            <div class="v-image" v-bind:style="{ backgroundColor: data.item.color}" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>

    <NextTrain :inbound="true" :station="station" />
  </div>
</template>

<script>
import NextTrain from "./NextTrain";

export default {
  name: "MainPage",
  components: {
    NextTrain
  },
  data() {
    const colors = {
      green: "#008000"
    };

    return {
      station: "",
      stations: [{ name: "MFA", value: "70245", color: colors.green }]
    };
  }
};
</script>
