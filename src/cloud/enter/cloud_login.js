/*******************全局样式*************************** */
import '../../style/css/comm.css';
import '../../style/css/base.css';
import 'element-ui/lib/theme-chalk/index.css';
/********************************************* */
import Vue              from 'vue';
import VueRouter        from 'vue-router';
import RouterCloud      from "../router/router_cloud.js";
import TempCloudLogin    from "../vue/cloud_login.vue";
import REQ from "../vue/global/request.js";
import MainStore        from "../vuex/main_store.js";
import '../sass/clond_main.scss'

import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Step,
    Cascader,
    ColorPicker,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message,
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Step);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.use( VueRouter );
new Vue({
    el:'#cloud-body',
    store:MainStore,
    router:RouterCloud.getRouter(),
    render:render => render( TempCloudLogin ),
    data:{
        notify:new Vue()  //统一事件派发
    }
});
/**
 * vue原型挂载公共方法
 */
Object.assign(Vue.prototype,{
    REQ                      //全局api接口
});

