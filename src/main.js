import "@/assets/style.css";

import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueSweetalert2);
app.mount("#app");
