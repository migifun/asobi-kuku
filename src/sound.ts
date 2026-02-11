let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  delay = 0,
  volume = 0.3,
): void {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  gain.gain.setTargetAtTime(0, c.currentTime + delay + duration - 0.05, 0.02);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + duration);
}

/** ピンポン♪ */
export function playCorrect(): void {
  playTone(880, 0.12, "sine", 0, 0.25);
  playTone(1320, 0.2, "sine", 0.12, 0.25);
}

/** ブブー */
export function playWrong(): void {
  playTone(200, 0.15, "square", 0, 0.15);
  playTone(160, 0.3, "square", 0.15, 0.15);
}

/** ファンファーレ */
export function playItemGet(): void {
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    playTone(freq, 0.2, "sine", i * 0.15, 0.2);
    playTone(freq * 1.5, 0.2, "triangle", i * 0.15, 0.1);
  });
}

/** ポンッ */
export function playTap(): void {
  playTone(600, 0.06, "sine", 0, 0.15);
}
