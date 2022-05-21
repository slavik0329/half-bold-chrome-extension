import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import * as cheerio from 'cheerio';
// @ts-ignore
import {findContent} from "find-main-content";


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
          const $ = cheerio.load(html);

          const decoded = findContent($, 'txt');
          console.log('tx', decoded.content)

          chrome.tabs.create({ url: `https://halfbold.com/?content=${encodeURIComponent(decoded.content)}` });
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
