import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/app.css";
import store from "./store/note";

const app = createApp(App);
app.use(store);
app.mount("#app");
