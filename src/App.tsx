import React, {useEffect} from 'react';
import './App.css';
import {Readability} from "@mozilla/readability";
import gzip from "gzip-js";


function App() {
  useEffect(() => {

    chrome.tabs.query({active: true}, function (tabs) {

      chrome.scripting.executeScript({
        files: ['getPageSource.js'],
        target: {tabId: tabs[0].id as number, allFrames: false}
      }, function (result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          const html = result[0].result;

          const doc = (new DOMParser()).parseFromString(html, 'text/html');
          const reader = new Readability(doc);
          const article = reader.parse();
          console.log('html', html)
          console.log('doc', doc)
          console.log('tx', article?.textContent)

          if (article?.textContent) {

            const gzipped = gzip.zip(article.textContent, {level: 9});
            const base64 = btoa(String.fromCharCode.apply(null, gzipped))

            chrome.tabs.create({url: `https://halfbold.com/?content=${encodeURIComponent(base64)}`});
          }
        }
      });
    });
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
