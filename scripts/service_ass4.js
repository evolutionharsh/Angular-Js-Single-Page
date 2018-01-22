// Jav'use strict';

'use strict';

angular.module('confusionApp')
        .constant("baseURL", "http://localhost:3000/")

        .service('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
                this.getDishes = function(){
                    
                    return $resource(baseURL + "dishes/:id",null,{'update':{method: 'PUT'}});
                    
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
                this.getPromotion = function(index){
                    return $resource(baseURL + "promotions/:id",null,{'update':{method: 'PUT'}});
                }

    
                        
        }])

        .factory('corporateFactory',['$resource', 'baseURL', function($resource,baseURL) {
    
            var corp = {}
    

     
            corp.getLeaders = function(){
                    return $resource(baseURL + "leadership/:id",null,{'update':{method: 'PUT'}});
            }

            return corp;

    
    
        }])

        .factory('feedbackFactory',['$resource', 'baseURL', function($resource,baseURL) {
            var feedback = {}
    

     
            feedback.postFeedback = function(){
                    return $resource(baseURL + "feedback",null,{'save':{method: 'POST'}});
            }

            return feedback;


        }])


;