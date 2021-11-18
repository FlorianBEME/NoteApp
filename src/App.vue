<template>
  <div class="fond min-h-screen">
    <Header :data="dataInCurrent" :fetchStorage="fetchStorage" />
    <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-full lg:px-8">
      <div
        class="
          grid grid-cols-1
          gap-y-10 gap-x-6
          lg:grid-cols-3
          xl:grid-cols-4 xl:gap-x-8
        "
      >
        <cards
          v-for="item in dataInCurrent.save"
          :key="item.uuid"
          :item="item"
          :data="dataInCurrent"
          :fetchStorage="fetchStorage()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "./components/Cards.vue";
const fs = require("fs");

import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Cards,
  },

  data() {
    return {
      dataInCurrent: {},
    };
  },
  computed: {
    isload() {
      return (
        this.dataInCurrent &&
        Object.prototype.hasOwnProperty.call(this.dataInCurrent, "save")
      );
    },
  },
  mounted() {
    this.fetchStorage();
  },
  methods: {
    fetchStorage() {
      fs.readFile("../data.json", "utf8", (err) => {
        if (err) {
          console.error(err);
          console.log("création d'un fichier");
          const template = JSON.stringify({ save: [{}] });
          fs.appendFile("data.json", template, function (err) {
            if (err);
            return;
          });
        } else {
          console.log("fichier existant");
        }
        // this.dataInCurrent = { ...JSON.parse(data) };
      });
    },
  },
};
</script>

<style>
.fond {
  background-image: url("./assets/image/fond.jpg");
  background-size: cover;
}
</style>
