import Vue from 'vue'
import { Button, Table, TableColumn, Loading } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
