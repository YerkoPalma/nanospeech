/* global SpeechSynthesisUtterance */
export function speak (text, opts) {
  if (!text) return
  // no default lang, because browser default lang will be used.
  let defaults = {
    rate: 1,
    pitch: 1,
    volume: 0.5
  }
  opts = Object.assign({}, defaults, opts)
  // select voice
  const synth = window.speechSynthesis
  let voices = synth.getVoices()
  let voice = voices.filter(voice => voice.default)[0]
  if (opts.lang) {
    voices = voices.filter(voice => voice.lang === opts.lang)
    if (voices.length > 0) voice = voices[0]
  }
  const utterance = new SpeechSynthesisUtterance(text)

  // assign options
  utterance.voice = voice
  utterance.pitch = opts.pitch
  utterance.rate = opts.rate
  utterance.volume = opts.volume

  function cancel () {
    synth.cancel()
  }
  function pause () {
    synth.pause()
  }
  function resume () {
    synth.resume()
  }
  return {
    on: (event, handler) => {
      if (event === 'start') utterance.onstart = handler
      if (event === 'boundary') utterance.onboundary = handler
      if (event === 'end') utterance.onend = handler
    },
    emit: event => {
      if (event === 'cancel') cancel()
      if (event === 'pause') pause()
      if (event === 'resume') resume()
    },
    cancel,
    pause,
    resume
  }
}

export const recognition  = (function () {
  var SpeechRecognition = window.SpeechRecognition ||
                          window.webkitSpeechRecognition ||
                          window.mozSpeechRecognition ||
                          window.msSpeechRecognition ||
                          window.oSpeechRecognition
  const recognize = new SpeechRecognition()
  let _recognition = {}
  Object.defineProperties(_recognition, {
    lang: {
      get: () => recognize.lang,
      set: (lang) => { recognize.lang = lang }
    },
    continuous: {
      get: () => recognize.continuous,
      set: (continuous) => { recognize.continuous = continuous }
    },
    interimResults: {
      get: () => recognize.interimResults,
      set: (interimResults) => { recognize.interimResults = interimResults }
    },
    maxAlternatives: {
      get: () => recognize.maxAlternatives,
      set: (maxAlternatives) => { recognize.maxAlternatives = maxAlternatives }
    },
    serviceURI: {
      get: () => recognize.serviceURI,
      set: (serviceURI) => { recognize.serviceURI = serviceURI }
    }
  })
  _recognition.start = recognize.start
  _recognition.stop = recognize.stop
  _recognition.abort = recognize.abort
  _recognition.on = (event, handler) => {
    if (event === 'nomatch') recognize.onnomatch = handler
    if (event === 'audiostart') recognize.onaudiostart = handler
    if (event === 'audioend') recognize.onaudioend = handler
    if (event === 'soudnstart') recognize.onsoudnstart = handler
    if (event === 'soundend') recognize.onsoundend = handler
    if (event === 'speechstart') recognize.onspeechstart = handler
    if (event === 'speechend') recognize.onspeechend = handler
    if (event === 'end') recognize.onend = handler
    if (event === 'result') recognize.onresult = event => {
      const text = event.results[event.resultIndex][0].transcript.trim()
      handler(text)
    }
  }
  _recognition.emit = event => {
    if (event === 'start') _recognition.start()
    if (event === 'stop') _recognition.stop()
    if (event === 'abort') _recognition.abort()
  }
  return _recognition
})()
