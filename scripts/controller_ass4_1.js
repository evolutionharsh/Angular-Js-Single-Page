// JavaScript Document
'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });            

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

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'menuFactory',function($scope,menuFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    menuFactory.getFeedback().save({id:0},$scope.feedback);
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message="Loading ..."; 
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            $scope.comment={
                    rating:5,
                    comment:"",
                    author:"",
                    dateStr:""           
                    }; 
            $scope.sendComment = function () {
                
                //Step 2: This is how you record the date
                $scope.comment.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.comment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                //Step 4: reset your form to pristine
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment={
                                  rating:5,
                                  comment:"",
                                  author:"",
                                  dateStr:""           
                }; 
                $scope.commentForm.$setPristine();                           
            };                         

        }])

        //not used for awhile, it is replicated inside DishDetailController 
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.sendComment = function () {
                
                $scope.comment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.comment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.comment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController',['$scope','$stateParams', 'menuFactory',
            function($scope, $stateParams, menuFactory) {
                $scope.showPromotion = false;
                menuFactory.getPromotions().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.promotion = response;
                        $scope.showPromotion=true;
                    },
                    function(response){
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                )
                ;
                $scope.showDish = false;
                $scope.message="Loading ...";
                //$scope.featDishe = menuFactory.getDishes().get({id:0});   
                $scope.featDishe = menuFactory.getDishes().get({id:0})
                    .$promise.then(
                        function(response){
                            $scope.featDishe = response;
                            $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                );

            }])


        .controller('AboutController',['$scope','$stateParams', 'corporateFactory',
            function($scope, $stateParams, corporateFactory) {
            $scope.showLeaders = false;
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {                    
                    $scope.showLeaders = true;
                    $scope.leaders=response;
                },
                $scope.message= function(response) {
                    $scope.message="Error: "+response.status + " " + response.statusText;
                }); 

            $scope.leader = corporateFactory.getLeaders().get({id:3})
                    .$promise.then(
                        function(response){
                            $scope.leader = response;
                            $scope.showleader = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                );
            }])



;