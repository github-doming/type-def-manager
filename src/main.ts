import { createApp } from 'vue'
import App from './TypeIndex.vue'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

createApp(App).use(store).use(Antd).mount('#type_def_manage')
