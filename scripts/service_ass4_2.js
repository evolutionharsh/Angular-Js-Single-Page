// JavaScript Document
'use strict';

angular.module('confusionApp')

        .service('menuFactory',['$resource','baseUrl',function($resource,baseUrl) {
                
                this.getDish = function() {
                    
                    return $resource(baseUrl + 'dishes/:id', null, {'update':{method:'PUT'}});
                };
    
                this.getPromotion = function(index){
                    return $resource(baseUrl + 'promotions/:id', null, {'update':{method:'PUT'}});
                }
                        
        }])

        .service('corporateFactory',['$resource','baseUrl',function($resource,baseUrl) {
    
        this.getLeader = function(){
            return $resource(baseUrl + 'leadership/:id', null, {'update':{method:'PUT'}});
        };
        }])

        .service('feedbackFactory',['$resource','baseUrl',function($resource,baseUrl){
            this.saveData = function(){
                return $resource(baseUrl + 'feedback', null, {'update':{method:'PUT'}});
            }
        }])

;