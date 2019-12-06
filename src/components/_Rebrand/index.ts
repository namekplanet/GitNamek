import Vue from 'vue';

import Button from './Buttons/Button.vue';
import Input from './Forms/Input.vue';
import FormInput from './Forms/FormInput.vue';
import Panel from './Layout/Panel.vue';
import Card from './Cards/Card.vue';
import List from './Lists/List.vue';
import ListOption from './Lists/ListOption.vue';
import Expander from './Expander/Expander.vue';
import LayoutAsideExpander from './Expander/LayoutAsideExpander.vue';
import Badge from './Badges/Badge.vue';
import TitleBar from './Layout/TitleBar.vue';
import Tree from './Tree/Tree.vue';
import TreeItem from './Tree/TreeItem.vue';

Vue.component('GButton', Button);
Vue.component('GInput', Input);
Vue.component('GFormInput', FormInput);
Vue.component('GPanel', Panel);
Vue.component('GCard', Card);
Vue.component('GList', List);
Vue.component('GListOption', ListOption);
Vue.component('GExpander', Expander);
Vue.component('GBadge', Badge);
Vue.component('GLayoutAsideExpander', LayoutAsideExpander);
Vue.component('GTitleBar', TitleBar);
Vue.component('GTree', Tree);
Vue.component('GTreeItem', TreeItem);
