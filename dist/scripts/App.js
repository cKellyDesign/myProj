// Date Parsing function takes date in milliseconds, returns human readable format
function parseDate (date) {
  if ( !date ) return "";
  var thisDate = new Date(date);
  var timezoneDiff = thisDate.getTimezoneOffset() / 60;

  var thisMonth = thisDate.getMonth() + 1,
      thisDay = thisDate.getDate(),
      thisYear = thisDate.getFullYear(),
      this24Hour = ( thisDate.getHours() + timezoneDiff ),
      thisHour = this24Hour <= 12 ? this24Hour : this24Hour <= 24 ? this24Hour - 11 : this24Hour - 23,
      thisMinutes = thisDate.getMinutes(),
      thisAmPm = this24Hour < 12 ? "am" : this24Hour < 24 ? "pm" : "am";

  return thisMonth + "/" + thisDay + "/" + thisYear + "  " + thisHour + ":" + thisMinutes + thisAmPm;
}
// Simple percentage calculation, returns integer
function getPercentage(pass, fail) {
  var perc = pass / (pass + fail),
      perc = perc * 100
      perc = Math.round(perc);
  return perc;
}

// Angular App Start
var App = angular.module('App', []);

App.run(function($rootScope, $http){
  $rootScope.buildList = [];

  $rootScope.successCallback = function (responseData) {
    $rootScope.buildList = responseData.data;
  };
  
  $rootScope.errorCallback = function (errMessage){
    console.debug(errMessage);
  };

  $http({
    method: 'GET',
    url: '/data/all'
  }).then($rootScope.successCallback, $rootScope.errorCallback);
});

App.controller('mainController', function($scope, $rootScope, $http){
  $scope.branches = ["Debug", "Release", "Production"];
  $scope.expandedRow = NaN;
  
  $scope.onRowClick = function(i) {
    if ( $scope.expandedRow === i ) {
      return;
    } else if ( $scope.expandedRow >= 0 ) {
      $rootScope.buildList[$scope.expandedRow].expanded = false;
    }

    $scope.expandedRow = i;
    $rootScope.buildList[i].expanded = true;

    if ( $rootScope.buildList[i].buildData ) return;

    $http({
      method: 'GET',
      url: '/data/' + $rootScope.buildList[i].name

    }).then(function success (responseData) {
      responseData.data.build.finishTime = parseDate(responseData.data.build.finishTime);
      $rootScope.buildList[i].buildData = responseData.data;

    }, function error (errMessage) {
      console.log(errMessage);
    });
  };

  $scope.metricsClick = function(i){ 
    var thisBuild = $rootScope.buildList[i]
    console.log("Metrics Information for " + thisBuild.type + " \"" + thisBuild.name + "\" - ", thisBuild.buildData.metrics);
  };

  $scope.buildClick = function(i){ 
    var thisBuild = $rootScope.buildList[i]
    console.log("Build Information for " + thisBuild.type + " \"" + thisBuild.name + "\" - ", thisBuild.buildData.build);
  };

  $scope.unitTestClick = function(i){ 
    var thisBuild = $rootScope.buildList[i]
    console.log("Unit Test Information for " + thisBuild.type + " \"" + thisBuild.name + "\" - ", thisBuild.buildData.unitTest);
  };

  $scope.funcTestClick = function(i){ 
    var thisBuild = $rootScope.buildList[i]
    console.log("Functionality Test Information for " + thisBuild.type + " \"" + thisBuild.name + "\" - ", thisBuild.buildData.functionalTest);
  };
});

App.directive('buildRow', function(){
  return {
    restrict: 'AE',
    templateUrl: '/partials/buildRow',
    link: function(scope, elem, attr) {
      scope.timeStarted = parseDate(scope.build.timeStarted);
      
      scope.$watch(function(){return scope.build.buildData},function(buildData){

        // set tests passed percentages
        if (buildData) {
          scope.unitTestsPassed = getPercentage(buildData.unitTest.testsPassed, buildData.unitTest.testsFailed);
          scope.funcTestsPassed = getPercentage(buildData.functionalTest.functionsPassed, buildData.functionalTest.functionsFailed);          
        }

        // Create Unit Test Pie Charts
        if ( buildData && buildData.unitTest && buildData.unitTest.state === "Complete" && !scope.thisUnitPieChart ) {
          var ctx = $('.unitTest_chart .chart_canv', elem),
              data = [
            { value: buildData.unitTest.testsPassed, color: '#72ac4d' , highlight: '#87c261', label: "Tests Passed" },
            { value: buildData.unitTest.testsFailed, color: '#eb7d3b' , highlight: '#f39156', label: "Tests Passed" }
          ];
          
          scope.thisUnitPieChart = new Chart(ctx[0].getContext("2d")).Pie(data);
        }

        // Create Functional Test Pie Charts
        if ( buildData && buildData.functionalTest && buildData.functionalTest.state === "Complete" && !scope.thisFuncPieChart ) {
          var ctxB = $('.functionalTest_chart .chart_canv', elem),
              dataB = [
            { value: buildData.functionalTest.functionsPassed, color: '#72ac4d' , highlight: '#87c261', label: "Tests Passed" },
            { value: buildData.functionalTest.functionsFailed, color: '#eb7d3b' , highlight: '#f39156', label: "Tests Passed" }
          ];
          scope.thisFuncPieChart = new Chart(ctxB[0].getContext("2d")).Pie(dataB);
        }
      });
    }
  };
});