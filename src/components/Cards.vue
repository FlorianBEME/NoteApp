<template>
  <!-- <div class="bg-opacity-custom w-1/4 h-60 m-5">
    {{ item.title }}
  </div> -->

  <div class="group">
    <div
      class="
        w-full
        p-5
        aspect-w-1 aspect-h-1
        bg-opacity-custom
        rounded-lg
        overflow-hidden
        xl:aspect-w-7 xl:aspect-h-8
      "
    >
      <div class="flex justify-between items-center">
        <h3 class="text-darktheme font-primary-font text-xl">
          {{ item.title }}
        </h3>
        <div
          class="bg-bluemidtheme rounded-full p-2 cursor-pointer shadowcustom"
          @click="deleteNote(item.uuid)"
        >
          <svg
            fill="#EAF0F0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path
              d="M5,3h14c0.6,0,1,0.4,1,1v0c0,0.6-0.4,1-1,1H5C4.4,5,4,4.6,4,4v0C4,3.4,4.4,3,5,3z"
            />
            <path
              d="M17,5l-3-3h-4L7,5H17z M5,7v13c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7H5z M9,20L9,20c-0.6,0-1-0.4-1-1v-9c0-0.6,0.4-1,1-1h0	c0.6,0,1,0.4,1,1v9C10,19.6,9.6,20,9,20z M15,20L15,20c-0.6,0-1-0.4-1-1v-9c0-0.6,0.4-1,1-1h0c0.6,0,1,0.4,1,1v9	C16,19.6,15.6,20,15,20z"
            />
          </svg>
        </div>
      </div>

      <p class="text-lg font-secondary-font">{{ item.text }}</p>

      <div v-if="item.tags.length > 0" class="mt-5 flex space-x-2">
        <div v-for="tag in item.tags" :key="tag" class="">{{ tag }}</div>
      </div>
    </div>
  </div>
</template>
<script>
const fs = require("fs");

export default {
  name: "Cards",
  props: {
    item: Object,
    data: Object,
    path: String,
  },
  methods: {
    deleteNote(uuid) {
      console.log(uuid);
      new Promise((resolve, reject) => {
        fs.readFile(`${this.path}/data.json`, "utf8", (err) => {
          if (err) {
            console.error(err);
            reject();
            return;
          }
          let dataInJSON = { ...this.data };
          dataInJSON.save = this.data.save.filter((note) => note.uuid !== uuid);
          console.log(dataInJSON.save);
          console.log(dataInJSON);
          resolve(dataInJSON);
        });
      })
        .then((data) => {
          fs.writeFile(
            `${this.path}/data.json`,
            JSON.stringify(data),
            (err) => {
              console.log("test avant err");
              if (err) {
                console.log(err);
                return;
              } else {
                this.$emit("update");
              }
            }
          );
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
.bg-opacity-custom {
  background: rgba(106, 138, 166, 0.25);
  backdrop-filter: blur(56.67px);
  border-radius: 25px;
}
.shadowcustom {
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}
</style>
