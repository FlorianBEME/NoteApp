<template>
  <Modals
    :open="isOpen"
    v-on:closemodal="this.openAndClose"
    :v-on:update="fetchStorage"
    :data="dataInCurrent"
    :path="path"
  />
  <div class="fond min-h-screen">
    <Header
      :data="dataInCurrent"
      v-on:openmodal="this.openAndClose"
      v-on:changeFilter="changeFilter($event)"
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
          :path="this.path"
          v-for="item in dataFiltering"
          :key="item.uuid"
          :item="item"
          :data="dataInCurrent"
          v-on:update="fetchStorage"
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
      path: process.cwd(),
      filterExpr: "",
    };
  },
  mounted() {
    this.fetchStorage();
  },
  computed: {
    dataFiltering() {
      if (this.filterExpr.length === 0) {
        return this.dataInCurrent.save;
      } else {
        return this.dataInCurrent.save.filter(
          (item) =>
            item.title.toLowerCase().includes(this.filterExpr.toLowerCase()) ||
            item.tags.includes(this.filterExpr)
        );
      }
    },
    isload() {
      return (
        this.dataInCurrent &&
        Object.prototype.hasOwnProperty.call(this.dataInCurrent, "save")
      );
    },
  },
  methods: {
    changeFilter(data) {
      this.filterExpr = data;
    },
    openAndClose() {
      this.isOpen = !this.isOpen;
    },
    setCurrentData(data) {
      console.log("chargement de la data");
      this.dataInCurrent = { ...JSON.parse(data) };
    },
    createNewDataFile() {
      fs.readFile(`${this.path}/data.json`, "utf8", (err, data) => {
        if (err) {
          console.err(err);
        } else {
          this.setCurrentData(data);
        }
      });
    },
    fetchStorage() {
      if (existsSync(`${this.path}/data.json`)) {
        console.log("Fichier de data trouvé ");
        fs.readFile(`${this.path}/data.json`, "utf8", (err, data) => {
          if (err) {
            console.err(err);
          } else {
            console.log("Lecture du fichier...");
            this.setCurrentData(data);
          }
        });
      } else {
        console.log("Aucun fichier de data trouvé ");
        const template = JSON.stringify({ save: [] });
        fs.appendFile(`${this.path}/data.json`, template, (err) => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log("Création d'un nouveau fichier de data");
            this.createNewDataFile();
          }
        });
      }
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
