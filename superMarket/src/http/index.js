import csmposApi from './csmpos/index';
import axios from 'axios';

const install = (Vue) => {
    if (install.installed) {
        return;
    }
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        //挂载在Vue原型的 $api 对象上
        $api: {
            get() {
                return Object.assign({}, csmposApi);
            }
        },
        $http: {
            get() {
                return axios;
            }
        }
    });
};

export default install;