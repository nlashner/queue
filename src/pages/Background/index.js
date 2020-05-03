import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';
import axios from 'axios'

console.log('This is the background page.');
console.log('Put the background scripts here.');

async function clickHandler(e) {
  const trackUrl = e.linkUrl
  const trackName = e.selectionText
  await axios.post('http://localhost:3010/api/tracks', {
    trackName: trackName,
    trackUrl: trackUrl
  })
}


chrome.contextMenus.create({
  "title": "Add to Queue",
  "contexts": ["selection", "link"],
  "onclick": clickHandler
});
