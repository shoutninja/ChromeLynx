/**
 * Created by jakebillings on 3/29/15.
 */
app.run(["ninja.shout.lynx.abstract", "ninja.shout.lynx.commands.go", "ninja.shout.lynx.commands.submit","ninja.shout.lynx.local.notifications",
    function (abstract, goCommand, submitCommand,notifications) {
        var attemptToAdd = function(url) {
            abstract.submit(url, function () {
                notifications.attemptNotification("Success", {
                    body: "Submitted page: " + url
                });
            },function(reason) {
                notifications.attemptNotification("Error",{
                    body: reason||"Your page submission was unsuccessful."
                });
            });
        };

        var commands = {};
        commands[goCommand] = function () {
            chrome.tabs.update({
                url: abstract.getUrl()
            });
        };
        commands[submitCommand] = function () {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                attemptToAdd(tabs[0].url);
            });
        };
        chrome.commands.onCommand.addListener(function (command) {
            commands[command]();
        });

        chrome.contextMenus.create({
            id: 'ninja.shout.lynx.chrome.contextMenu.add',
            title: 'Add to Lynx',
            contexts: ['all'],
            onclick: function(event) {
                attemptToAdd(event.linkUrl||event.srcUrl||event.pageUrl);
            }
        });

        chrome.contextMenus.create({
            id: 'ninja.shout.lynx.chrome.contextMenu.addSource',
            title: 'Add Source to Lynx',
            contexts: ['image','video','audio'],
            onclick: function(event) {
                attemptToAdd(event.srcUrl);
            }
        });
    }]);