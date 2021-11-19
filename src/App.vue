<template>
  <Modals
    :open="isOpen"
    v-on:closemodal="openAndClose()"
    :reloadData="fetchStorage"
  />
  <div class="fond min-h-screen">
    <Header
      :data="dataInCurrent"
      :fetchStorage="fetchStorage"
      v-on:openmodal="openAndClose()"
    />
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
          :fetchStorage="fetchStorage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "./components/Cards.vue";
import Modals from "./components/Modals.vue";

const fs = require("fs");
import { existsSync } from "fs";

import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
    Cards,
    Modals,
  },
  data() {
    return {
      dataInCurrent: {},
      isOpen: false,
      dataIsUpdate: false,
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
    openAndClose() {
      this.isOpen = !this.isOpen;
    },
    fetchStorage() {
      console.log(this.dataInCurrent);
      if (existsSync("data.json")) {
        fs.readFile("./data.json", "utf8", (err, data) => {
          if (err) {
            console.err(err);
          } else {
            this.dataInCurrent = { ...JSON.parse(data) };
          }
        });
      } else {
        console.log("no");
        const template = JSON.stringify({ save: [] });

        fs.appendFile("data.json", template, function (err) {
          if (err) {
            console.error(err);
            return;
          } else {
            fs.readFile("./data.json", "utf8", (err, data) => {
              if (err) {
                console.err(err);
              } else {
                console.log(data);
              }
            });
          }
        });
      }
      // fs.readFile("../data.json", "utf8", (err) => {
      //   if (err) {
      //     existsSync
      //     console.error(err);
      //     console.log("création d'un fichier");
      //     // const template = JSON.stringify({ save: [{}] });
      //     // fs.appendFile("data.json", template, function (err) {
      //     //   if (err);
      //     //   return;
      //     // });
      //   } else {
      //     console.log("fichier existant");
      //   }
      //   // this.dataInCurrent = { ...JSON.parse(data) };
      // });
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
