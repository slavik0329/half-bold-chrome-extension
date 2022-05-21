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

          chrome.tabs.create({ url: `http://localhost:3000/?content=${encodeURIComponent(decoded.content)}` });
        }
      });
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
