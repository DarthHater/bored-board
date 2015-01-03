var boredBoredDirectives = angular.module('boredBoredDirectives', []);

boredBoredDirectives.directive("passwordStrength", function(){
    return {        
        restrict: 'A',
        link: function(scope, element, attrs){                    
            scope.$watch(attrs.passwordStrength, function(value) {
                if(angular.isDefined(value)){
                    if (value.length > 8) {
                        scope.strength = 'strong';
                    } else if (value.length > 3) {
                        scope.strength = 'medium';
                    } else {
                        scope.strength = 'weak';
                    }
                }
            });
        }
    };
});

boredBoredDirectives.directive("compareTo", function() {
	return {
		require: 'ngModel',
		scope: {
			otherModelValue: '=compareTo'
		},
		link: function(scope, element, attrs, ngModel) {
			ngModel.$validators.compareTo = function (modelValue) {
				return modelValue == scope.otherModelValue;
			};

			scope.$watch('otherModelValue', function() {
				ngModel.$validate();
			});
		}
	};
});