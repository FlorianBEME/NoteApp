<template>
  <div class="fond min-h-screen">
    <Header />

    <!-- <img :src="test" /> -->
  </div>
</template>

<script>
// import note from "./store/note";

import Header from "./components/Header.vue";
import dataJSON from "./data/data.json";

export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      dataSave: dataJSON,
    };
  },
  mounted() {
    // j'init la save dans le store au mounted
    this.$store.dispatch("initSaveInStore", this.dataSave.save);
  },
};
</script>

<style>
.fond {
  background-image: url("./assets/image/fond.jpg");
  background-size: cover;
}
</style>
