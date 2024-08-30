import svgicon from './svg-icon/svg-icon.vue';
import cdialog from './cdialog/index.vue';
import orderPage from './orderPage/index.vue';

export default {
        install(app: any) {
              app.component('svgicon',svgicon)
              app.component('Cdialog', cdialog)
              app.component('orderPage',orderPage)
      
        }
}