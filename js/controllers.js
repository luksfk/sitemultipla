/** *************Angular controller JS*********************/
"use strict";
app.controller('ContactController', function ($scope, $http, $timeout) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function (contactform, e) {
        e.preventDefault();
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method: 'POST',
                url: 'http://multiplasc.com.br:81/api/mail',
                //data: $.param($scope.formData),  //param method from jQuery
                data: $scope.formData,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function (data) {
                $scope.submitButtonDisabled = false;
                $scope.formData = null;
                $scope.resultMessage = "Seus dados foram recebidos, em breve entraremos em contato!";
                $scope.result = 'bg-success';
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Erro, preencha todos os campos.';
            $scope.result = 'bg-danger';
        }
        $timeout(function () {
            $scope.result = 'hidden';
        }, 10000);
    }
});

app.controller('SubscribeController', function ($scope, $http, $timeout) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function (contactform, e) {
        e.preventDefault();
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method: 'POST',
                url: 'http://multiplasc.com.br:81/api/subscribe',
                data: $scope.formData,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            }).success(function (data) {
                $scope.submitButtonDisabled = false;
                $scope.formData = null;
                $scope.resultMessage = "Dados cadastrados com sucesso!";
                $scope.result = 'bg-success';
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Erro, preencha todos os campos.';
            $scope.result = 'bg-danger';
        }
        $timeout(function () {
            $scope.result = 'hidden';
            angular.element(document.querySelector("#modal-2")).removeClass("md-show");
        }, 3000);
    }
});