// JavaScript Document
'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', '$resource', 'menuFactory', function($scope,$resource,menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.show = false

            $scope.dishes= menuFactory.getDish().query().$promise.then(
                function(response){
                    $scope.dishes = response;
                    $scope.show = true;
                },
                function(response){
                    $scope.message = "Error " + response.statusCode + " : " + response.status;
                }
            )

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope','baseUrl','$resource', 'feedbackFactory',function($scope,baseUrl,$resource,feedbackFactory) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    feedbackFactory.saveData().save($scope.feedback).$promise.then(
                        function(response){
                            alert('Comment submitted successfully');
                        },
                        function(response){
                            alert('Comment not submitted')
                        }
                    )
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.myform.$setPristine();
                    console.log($scope.feedback);
                }
            };
            
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory' ,'$resource', function($scope, $stateParams, menuFactory, $resource) {

            var dish= menuFactory.getDish().get({id:parseInt($stateParams.id)}).$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.show = true;
                },
                function(response){
                    $scope.message = "Error " + response.statusCode + " : " + response.status;
                }
            )
            
            $scope.dish = dish;
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController',['menuFactory','corporateFactory','$scope','$resource',function(menuFactory,corporateFactory,$scope,
                                                                                                      $resource){
            $scope.show1 = false;
            $scope.show2 = false;
            $scope.show3 = false;
            $scope.message1 = "Loading ...";
            $scope.message2 = "Loading ...";
            $scope.message3 = "Loading ...";
            var first = menuFactory.getDish().get({id:0}).$promise.then(
                function(response){
                    $scope.first = response;
                    $scope.show1 = true;
                },
                function(response){
                    $scope.message1 = "Error " + response.statusCode + " : " + response.status;
                }
            );
            $scope.first = first;
            $scope.second = menuFactory.getPromotion().get({id:0}).$promise.then(
                function(response){
                    $scope.second = response;
                    $scope.show2 = true;
                },
                function(response){
                    $scope.message2 = "Error " + response.statusCode + " : " + response.status;
                }
            );
            $scope.third = corporateFactory.getLeader().get({id:3}).$promise.then(
                function(response){
                    $scope.third = response;
                    $scope.show3 = true;
                },
                function(response){
                    $scope.message3 = "Error " + response.statusCode + " : " + response.status;
                }
            );
        }])

        .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
            $scope.show = false;
            $scope.message = "Loading ...";
            $scope.leaders = corporateFactory.getLeader().query().$promise.then(
                function(response){
                    $scope.leaders = response;
                    $scope.show = true;
                },
                function(response){
                    $scope.message = "Error " + response.statusCode + " : " + response.status;
                }
            );
        }]);
;







