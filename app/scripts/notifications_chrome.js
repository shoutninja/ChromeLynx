app.service("ninja.shout.lynx.local.notifications", ["$window", "ninja.shout.constants.local.notifications.length",
    function ($window, length) {
        this.attemptNotification = function (title, body) {
            chrome.notifications.create(title+new Date(),{
                type: "basic",
                iconUrl: body.icon || "images/icon128.png",
                title: title,
                message: body.body
            },function(id) {
                $window.setTimeout(function() {
                    chrome.notifications.clear(id, function(){});
                },length);
            });
        };
    }]);