interface SpeakOptions {
  rate: number;
  picth: number;
  volume: number;
  lang: string;
}

type Speech = {
  on: (event: string, handler: (this: SpeechSynthesisUtterance, ev: SpeechSynthesisEvent) => any) => void,
  emit: (event: string) => void,
  cancel: () => void,
  pause: () => void,
  resume: () => void
}

export function speak (text: string, opts: SpeakOptions): Speech {}

type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;
  on: (event: string, handler: (ev: SpeechRecognitionEvent) => any) => void,
  emit: (event: string) => void
}

export const recognition: Recognition
