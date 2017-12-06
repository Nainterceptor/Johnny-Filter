function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    console.log("Storing stats...");
    console.log ("Adding " + request.johnnys + " Johnnys to stats.");
    chrome.storage.sync.get({
      johnnys: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        johnnys: items.johnnys + request.johnnys,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    console.log("Putting badge on address bar.");
    chrome.pageAction.show(sender.tab.id);
    sendResponse({});
  }
}

chrome.runtime.onMessage.addListener(onMessage);
