const html = require('nanohtml')
const { speak, recognition } = require('./dist/nanospeech.js')

document.body.appendChild(html`
<div>
  <textarea></textarea><button onclick=${e => speak(document.querySelector('textarea').value)}>speak</button>
  <br>
  <button onclick=${e => recognition.start()}>recognize</button>
</div>
`)

recognition.on('result', console.log)