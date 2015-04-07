app.controller("ninja.shout.lynx.popup", ["$scope", "$rootScope", "ninja.shout.lynx.abstract", "ninja.shout.lynx.local.notifications",
    function ($scope, $rootScope, abstract, notifications) {
        $rootScope.$watch(function () {
            return abstract.getPostCount();
        }, function (newVal) {
            $scope.postCount=newVal;
        });

        $scope.showHints = false;

        $scope.navigateTo = function (url) {
            chrome.tabs.update({
                url: url
            });
        };

        $scope.go = function () {
            $scope.navigateTo(abstract.getUrl());
        };

        $scope.submitForm = function () {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                abstract.submit(tabs[0].url, function () {
                    notifications.attemptNotification("Success", {
                        body: "Your page was successfully submitted."
                    }, function () {
                        notifications.attemptNotification("Error", {
                            body: "Your page submission was unsuccessful."
                        });
                    });
                });
            });
        };
    }]);