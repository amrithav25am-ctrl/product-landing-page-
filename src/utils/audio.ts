// Web Audio API synthesized mechanical tactile clicks
// No external assets required, zero latency, lightweight

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function toggleHapticSound(): boolean {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

export function isHapticSoundEnabled(): boolean {
  return soundEnabled;
}

export function playTactileClick(frequency = 1200, duration = 0.015, volume = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Graceful fallback if user hasn't interacted or audio is restricted
  }
}
