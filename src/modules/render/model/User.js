'use strict';

angular.module('paris1.user.render')
    .factory('User', function($config,$http,$q){


        var uri = $config.get('api')+'/users/';

        var User  = function (data){
            this.name = data.name;
        };

        User.prototype = Object.create({});
        User.prototype.constructor = User;



        // ----- Get an user from the API
        User.prototype.get = function(id){

            var defer = $q.defer();

            $http.get(this.uri+id).then(function(response){
                defer.resolve(new User(response.data));
            },function(reason){
                defer.reject(reason)
            });

            return defer.promise;
        };

        User.prototype.create = function(){
            var self = this,
                defer = $q.defer();

            $http.post(uri, this).then(function(response){
                self.id = response.data.id;
                defer.resolve(self);
            },function(reason){
                defer.reject(reason)
            })

            return defer.promise;

        }

        return User;

    });