<template>
  <div class="flex flex-col sm:flex-row justify-between items-center px-8 py-4">
    <img :src="img.logo" alt="logo" class="w-24" />
    <div
      class="w-full flex space-x-3 items-center justify-between sm:justify-end"
    >
      <div
        class="bg-bluemidtheme p-3 rounded-full cursor-pointer"
        @click="this.$emit('openmodal')"
      >
        <!-- <?xml version="1.0" encoding="UTF-8"?> -->
        <svg
          class="w-12"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>File-New</title>
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="File-New">
              <rect
                id="Rectangle"
                fill-rule="nonzero"
                x="0"
                y="0"
                width="24"
                height="24"
              ></rect>
              <path
                d="M4,5 C4,3.89543 4.89543,3 6,3 L15.1716,3 C15.702,3 16.2107,3.21071 16.5858,3.58579 L19.4142,6.41421 C19.7893,6.78929 20,7.29799 20,7.82843 L20,19 C20,20.1046 19.1046,21 18,21 L6,21 C4.89543,21 4,20.1046 4,19 L4,5 Z"
                id="Path"
                stroke="#FFFFFF"
                stroke-width="1"
                stroke-linecap="round"
              ></path>
              <path
                d="M15,4 L15,6 C15,7.10457 15.8954,8 17,8 L19,8"
                id="Path"
                stroke="#FFFFFF"
                stroke-width="1"
                stroke-linecap="round"
              ></path>
              <line
                x1="12"
                y1="9"
                x2="12"
                y2="15"
                id="Path"
                stroke="#FFFFFF"
                stroke-width="1"
                stroke-linecap="round"
              ></line>
              <line
                x1="9"
                y1="12"
                x2="15"
                y2="12"
                id="Path"
                stroke="#FFFFFF"
                stroke-width="1"
                stroke-linecap="round"
              ></line>
            </g>
          </g>
        </svg>
      </div>
      <div>
        <input
          id="search"
          type="text"
          class="h-10 rounded-xl"
          v-on:input="setFilter"
          placeholder="Search..."
        />
      </div>
    </div>
  </div>
</template>

<script>
const logo = require("../assets/image/logo.svg");

export default {
  name: "Header",
  props: {
    data: Object,
    openAndClose: Function,
  },
  components: {},
  data() {
    return {
      img: {
        logo: logo,
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("changeFilter", event.target.value);
    },
  },
};
</script>
<style>
input#search {
  background-image: url("../assets/image/Search.svg");
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: 40px;
}
</style>
