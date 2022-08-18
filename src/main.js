import { createApp } from 'vue'
import App from './pages/todoList.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
// import { Button, Table } from 'view-ui-plus';
// app.component('Button', Button);
// app.component('Table', Table);
// import './assets/main.css'
const app = createApp(App)
app.use(ViewUIPlus)
    .mount('#app')