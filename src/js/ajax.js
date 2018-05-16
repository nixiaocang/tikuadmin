import _ from 'lodash'
export default {

    //插件入口
    install(Vue, options) {
        Vue.http.options.emulateJSON = true;
        Vue.http.options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

        Vue.http.interceptors.push(function(request, next) {
            let originParams = _.isEmpty(request.params) ? request.body: request.params;
            let ajaxId = Math.ceil(Math.random() * 10000000000);
            originParams = JSON.stringify(originParams) + '$string';
            let originUrl = request.url;
            //阻止get请求缓存
            if (request.method.toUpperCase() == 'GET') {
                request.params._t = Math.random();
            }

            // continue to next interceptor
            next(function(response) {
                if (response.data.status == 1001) {
                    // Vue.cookie.set('session_id', '');
                    alert('登录失效,请重新登录');
                    location.href = '/login';
                }
            });
        });
    }
};
