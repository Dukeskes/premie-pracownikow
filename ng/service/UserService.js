angular.module(APP_ID)
    .service('userService', ['http', function(http) {
        // this.create = function(user) {
        //     return http.post('ws/user', user);
        // };

        var vm = this;

        vm.getUser = function(){
            return http.get('/ws/users');
        };

        vm.login = function(username, password){
            return vm.post('/ws/sessions', {
                username : username, password : password
            }).then(function(val){
                vm.token = val.data;
                http.defaults.headers.common['X-Auth'] = val.data;
                return vm.getUser();
            });
        };

        vm.create = function(username, password){
            return http.post('/ws/users', {
                username : username, password : password
            });
        };

        vm.logout = function(){
            if(vm.token) {
                vm.token = null;
            }
        };
    }]);
