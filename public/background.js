chrome.tabs.onUpdated.addListener(function
    (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo.url) {
      // do something here

      console.log('ssd', changeInfo)

      if(jQuery) {
        console.log('jquery active')
        $('p').each(function () {
          console.log('sss')
          console.log($(this).innerHTML)
        })
      }

    }
  }
);

