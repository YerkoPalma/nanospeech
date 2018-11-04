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

export const recognition  = {
  
}
