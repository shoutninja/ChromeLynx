/**
 * Created by jakebillings on 3/29/15.
 */
app.run(["ninja.shout.lynx.abstract", "ninja.shout.lynx.commands.go", "ninja.shout.lynx.commands.submit","ninja.shout.lynx.local.notifications",
    function (abstract, goCommand, submitCommand,notifications) {
        var commands = {};
        commands[goCommand] = function () {
            chrome.tabs.update({
                url: abstract.getUrl()
            });
        };
        commands[submitCommand] = function () {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                abstract.submit(tabs[0].url, function () {
                    notifications.attemptNotification("Success", {
                        body: "Your page was successfully submitted."
                    });
                },function(reason) {
                    notifications.attemptNotification("Error",{
                        body: reason||"Your page submission was unsuccessful."
                    });
                });
            });
        };
        chrome.commands.onCommand.addListener(function (command) {
            commands[command]();
        });
    }]);