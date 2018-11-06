# nanospeech
Web speech api simplified

## Usage
### Text to speech

```js
import { speak } from 'nanospeech'

speak('hello world')
```

### Speech to text
```js
import { recognition } from 'nanospeech'

recognition.start()

recognition.on('result', text => console.log(text))
```

## Install

Include the following tags in your html

```
<script type="module" src="https://unpkg.com/nanospeech?module"></script>
<script nomodule src="https://unpkg.com/nanospeech@1.0.0/dist/nanospeech.umd.js"></script>
```

This will install the module version when the browser support modules and 
fallback to the umd version when it don't. You can still import or require this

```js
import { speak } from 'nanospeech'

// or

var speak = require('nanospeech').speak
```

## API
### `let speech = speak(text, [opts])`

The speak function speak a text passed as the first argument. Optionally the 
following options can be passed as an object on the second argument:

- lang([DOMString][DOMString]): A [BCP47][BCP47] format string (eg. `en-US`) to 
set the language to be spoken. Notice that the selected language must be 
supported by the availaible voices, otherwise, default voice and language will 
be used.
- rate(float): The speed of the utterance to be spoken, can be a value from 0.1 
to 10, defaults to 1.
- pitch(float): The pitch of the utterance to be spoken, can be a value from 0 
to 2, defaults to 1.
- volume(float): The volume of the utterance to be spoken, can be a value from 
0 to 1, defaults to 0.5.

The `speech` object returned is an Event Emitter like object. It has two single 
methods `on` and `emit` (There is no `off` method because there is actually no 
event going on, so no need to remove listeners)

### `speech.on(event, handler)`
`event` is a string with the name of the event to listen to. `handler` is a 
function which always get a [SpeechSynthesisEvent][SpeechSynthesisEvent] as its 
argument. Availaible events are:

- start: Emitted when a speech starts.
- boundary: Emitted when a word or sentence boundary is reched during a speech.
- end: Emitted when a speech finish being spoken.

### `speech.emit(event)`
`event` is a string with the name of the event to be emited. Also, every string 
has a function version, making `speech.emit('pause')` equivalent to 
`speech.pause()`

- cancel: Emit this event to cancel all qeued speechs.
- pause: Emit this event to pause an ongoing speak. If there is no speaking 
taking place, it will do nothing.
- resume: Emit this event to resume an ongoing speak. If there is no paused 
speaking, it will do nothing.

### `recognition.on(event, handler)`
`event` is a string with the name of the event to listen to. `handler` is a 
function which always get a [SpeechRecognitionEvent][SpeechRecognitionEvent] as 
its argument, with the exception of the result event which gets the text 
recognized as a string for the argument. Availaible events are:

- nomatch: Fired when the speech recognition service returns a final result with 
no significant recognition. 
- audiostart: Fired when the user agent has started to capture audio.
- audioend: Fired when the user agent has finished capturing audio.
- soudnstart: Fired when any sound — recognisable speech or not — has been 
detected.
- soundend: Fired when any sound — recognisable speech or not — has stopped 
being detected.
- speechstart: Fired when sound that is recognised by the speech recognition 
service as speech has been detected.
- speechend: Fired when speech recognised by the speech recognition service has 
stopped being detected.
- end: Fired when the speech recognition service has disconnected.
- result: Fired when the speech recognition service returns a result.

### `recognition.emit(event)`
`event` is a string with the name of the event to be emited. Also, every string 
has a function version, making `speech.emit('start')` equivalent to 
`speech.start()`

- start: Fired when the speech recognition service has begun listening to 
incoming audio.
- stop: Emit this event to stops the speech recognition service from listening 
to incoming audio, and attempts to return a SpeechRecognitionResult using the 
audio captured so far.
- abort: Stops the speech recognition service from listening to incoming audio.

[DOMString]: https://heycam.github.io/webidl/#idl-DOMString
[BCP47]: https://tools.ietf.org/html/bcp47
[SpeechSynthesisEvent]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisEvent
[SpeechRecognitionEvent]: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent

## LICENSE
[MIT](/license)