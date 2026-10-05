import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sliders, CheckCircle2, Moon, Sparkles, Eye, Volume2 } from 'lucide-react';
import { FocusMode } from '../types';
import { playTactileClick } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';

import macroImage from '../assets/images/showcase_dial_macro_1791195195161.jpg';
import lifestyleImage from '../assets/images/lifestyle_desk_setup_1791195206307.jpg';

export const Showcase: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<'console' | 'macro' | 'lifestyle'>('console');
  const [currentMode, setCurrentMode] = useState<FocusMode>('pomodoro');
  
  // Console state
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dialRotationLeft, setDialRotationLeft] = useState(0);
  const [dialRotationRight, setDialRotationRight] = useState(45);
  const [activeSoundscape, setActiveSoundscape] = useState('Deep Brown Noise');
  const [soundscapeVolume, setSoundscapeVolume] = useState(65);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Refactor Core Engine Architecture', done: false },
    { id: 2, text: 'Finalize Circuit Schematic Review', done: true },
    { id: 3, text: 'Draft Hardware Field Documentation', done: false },
  ]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          if (timerMinutes > 0) {
            setTimerMinutes((prevMin) => prevMin - 1);
            return 59;
          }
          setIsRunning(false);
          return 0;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerMinutes]);

  const handleRotateLeft = () => {
    playTactileClick(1100, 0.02, 0.09);
    setDialRotationLeft((prev) => (prev + 30) % 360);
    const modes: FocusMode[] = ['pomodoro', 'soundscape', 'tasks', 'code'];
    const nextIdx = (modes.indexOf(currentMode) + 1) % modes.length;
    setCurrentMode(modes[nextIdx]);
  };

  const handleRotateRight = () => {
    playTactileClick(1400, 0.015, 0.09);
    setDialRotationRight((prev) => (prev + 25) % 360);
    if (currentMode === 'pomodoro') {
      const presets = [15, 25, 45, 60, 90];
      const currentIdx = presets.indexOf(timerMinutes);
      const nextMin = presets[(currentIdx + 1) % presets.length];
      setTimerMinutes(nextMin);
      setTimerSeconds(0);
    } else if (currentMode === 'soundscape') {
      const sounds = ['Deep Brown Noise', 'Cedar Mountain Rain', 'Analog Mechanical Clock', 'Kyoto Bamboo Wind'];
      const nextIdx = (sounds.indexOf(activeSoundscape) + 1) % sounds.length;
      setActiveSoundscape(sounds[nextIdx]);
    } else if (currentMode === 'tasks') {
      // Toggle top task
      setTasks((prev) =>
        prev.map((t, idx) => (idx === 0 ? { ...t, done: !t.done } : t))
      );
    }
  };

  const handleToggleTimer = () => {
    playTactileClick(900, 0.03, 0.12);
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    playTactileClick(800, 0.02, 0.08);
    setIsRunning(false);
    setTimerMinutes(25);
    setTimerSeconds(0);
  };

  return (
    <section id="showcase" className="py-24 bg-[#0e1012] border-t border-white/[0.06] relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Hardware & Interface Experience
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Designed for touch. Calibrated for silence.
            </h2>
          </div>

          {/* Interactive Showcase View Tabs */}
          <div className="mt-6 md:mt-0 flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab('console')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'console'
                  ? 'bg-amber-400 text-black shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Interactive Console
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('macro')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'macro'
                  ? 'bg-amber-400 text-black shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Macro Detents
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('lifestyle')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'lifestyle'
                  ? 'bg-amber-400 text-black shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Desk Architecture
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {activeTab === 'console' && (
          <div className="rounded-2xl border border-white/10 bg-[#14161a] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Virtual Hardware Simulator Device */}
              <div className="lg:col-span-8 flex flex-col items-center">
                {/* Hardware Enclosure */}
                <div className="w-full max-w-xl bg-gradient-to-b from-[#212429] to-[#15171a] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
                  
                  {/* Aluminum texture line */}
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-5 pb-3 border-b border-white/10">
                    <span className="font-semibold text-neutral-300">KANSO DIAL // PROTOTYPE MK-II</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      STANDALONE OPERATIONAL
                    </span>
                  </div>

                  {/* High Contrast E-Paper Monochromatic Display */}
                  <div className="bg-[#e9ebe7] text-[#121415] rounded-xl p-6 sm:p-8 shadow-inner border-2 border-[#2b2e33] min-h-[220px] flex flex-col justify-between font-sans select-none transition-all">
                    
                    {/* E-Paper Top Header Bar */}
                    <div className="flex items-center justify-between border-b border-black/15 pb-2 text-xs font-bold uppercase tracking-wider text-black/70">
                      <span>
                        {currentMode === 'pomodoro' && 'MODE 01 · TACTILE INTERVAL'}
                        {currentMode === 'soundscape' && 'MODE 02 · AMBIENT FREQUENCY'}
                        {currentMode === 'tasks' && 'MODE 03 · FOCAL TASK MATRIX'}
                        {currentMode === 'code' && 'MODE 04 · DEEP FLOW STREAK'}
                      </span>
                      <span className="font-mono-numeric font-semibold">BATTERY 94%</span>
                    </div>

                    {/* Mode Specific E-Paper Contents */}
                    <div className="py-6 flex flex-col items-center justify-center text-center">
                      {currentMode === 'pomodoro' && (
                        <div>
                          <div className="font-mono-numeric text-5xl sm:text-6xl font-bold tracking-tighter text-black">
                            {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                          </div>
                          <div className="text-xs uppercase tracking-widest text-black/60 font-semibold mt-2">
                            {isRunning ? 'FLOW SESSION IN PROGRESS' : 'READY · TURN RIGHT DIAL TO ADJUST DURATION'}
                          </div>
                          <div className="flex items-center justify-center gap-4 mt-4">
                            <span className="text-[11px] font-mono text-black/80 bg-black/10 px-2 py-0.5 rounded">
                              Interval: {timerMinutes}m
                            </span>
                            <span className="text-[11px] font-mono text-black/80 bg-black/10 px-2 py-0.5 rounded">
                              Distractions: 0
                            </span>
                          </div>
                        </div>
                      )}

                      {currentMode === 'soundscape' && (
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-black font-display">
                            {activeSoundscape}
                          </div>
                          <div className="text-xs uppercase tracking-wider text-black/60 font-medium mt-1">
                            Binaural Filter: 432 Hz · Volume: {soundscapeVolume}%
                          </div>
                          <div className="w-48 h-2 bg-black/15 rounded-full mx-auto mt-4 overflow-hidden">
                            <div
                              className="h-full bg-black transition-all duration-300"
                              style={{ width: `${soundscapeVolume}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {currentMode === 'tasks' && (
                        <div className="w-full text-left max-w-sm">
                          <div className="text-xs uppercase tracking-widest text-black/60 font-bold mb-2">
                            Primary Direct Objective:
                          </div>
                          <div className="space-y-2">
                            {tasks.map((task, idx) => (
                              <div
                                key={task.id}
                                className={`p-2 rounded text-xs flex items-center justify-between ${
                                  idx === 0 ? 'bg-black text-white font-medium' : 'text-black/70 bg-black/5'
                                }`}
                              >
                                <span className="truncate pr-2">
                                  {idx === 0 ? '▶ ' : '  '}
                                  {task.text}
                                </span>
                                <span>{task.done ? '✓ DONE' : 'PENDING'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {currentMode === 'code' && (
                        <div>
                          <div className="font-mono-numeric text-4xl sm:text-5xl font-bold text-black">
                            3h 42m
                          </div>
                          <div className="text-xs uppercase tracking-widest text-black/70 font-semibold mt-1">
                            Unbroken Flow State Streak
                          </div>
                          <div className="text-[11px] text-black/60 mt-3 font-mono">
                            41 OS notifications intercepted and silenced
                          </div>
                        </div>
                      )}
                    </div>

                    {/* E-Paper Footer Bar */}
                    <div className="flex items-center justify-between border-t border-black/15 pt-2 text-[11px] font-mono text-black/60">
                      <span>LEFT: ROTATE MODE</span>
                      <span>RIGHT: VALUE / ACTION</span>
                    </div>
                  </div>

                  {/* Physical Hardware Controls on Console Base */}
                  <div className="mt-8 flex items-center justify-between px-4 sm:px-8">
                    
                    {/* Left Rotary Knob (Mode Switcher) */}
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={handleRotateLeft}
                        aria-label="Rotate left dial to switch mode"
                        className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#3a3e47] via-[#24272c] to-[#16181b] border-2 border-neutral-600 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                      >
                        {/* Radial knurling texture */}
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center transition-transform duration-200"
                          style={{ transform: `rotate(${dialRotationLeft}deg)` }}
                        >
                          <div className="w-1.5 h-4 bg-amber-400 rounded-full absolute top-1.5 shadow-sm" />
                          <div className="w-8 h-8 rounded-full border border-white/20 bg-neutral-800" />
                        </div>
                      </button>
                      <span className="text-[11px] font-mono text-neutral-400 mt-2">
                        LEFT DIAL (MODE)
                      </span>
                    </div>

                    {/* Center Push Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleToggleTimer}
                        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-md ${
                          isRunning
                            ? 'bg-amber-500 text-black hover:bg-amber-400'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                        }`}
                      >
                        {isRunning ? (
                          <span className="flex items-center gap-1.5">
                            <Pause size={13} /> Pause
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <Play size={13} /> Start
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleResetTimer}
                        className="p-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md border border-white/10 transition-colors"
                        title="Reset timer"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>

                    {/* Right Rotary Knob (Parameter / Timer) */}
                    <div className="flex flex-col items-center">
                      <button
                        type="button"
                        onClick={handleRotateRight}
                        aria-label="Rotate right dial to adjust parameter"
                        className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#3a3e47] via-[#24272c] to-[#16181b] border-2 border-neutral-600 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                      >
                        <div
                          className="w-full h-full rounded-full flex items-center justify-center transition-transform duration-200"
                          style={{ transform: `rotate(${dialRotationRight}deg)` }}
                        >
                          <div className="w-1.5 h-4 bg-amber-400 rounded-full absolute top-1.5 shadow-sm" />
                          <div className="w-8 h-8 rounded-full border border-white/20 bg-neutral-800" />
                        </div>
                      </button>
                      <span className="text-[11px] font-mono text-neutral-400 mt-2">
                        RIGHT DIAL (VALUE)
                      </span>
                    </div>

                  </div>
                </div>

                <p className="text-xs text-neutral-400 mt-4 text-center">
                  💡 Click the physical dials or buttons above to test the mechanical responsiveness and e-paper state engine.
                </p>
              </div>

              {/* Explanatory Technical Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Stepless Optical Sensation
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Physical Feedback Over Touchscreens
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Glass touchscreens demand your visual gaze. Physical rotary dials utilize proprioception — your body's innate sense of hand position — so you adjust timers without breaking mental momentum.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Bi-Stable Electrophoretic State
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Zero Photons Fired Into Your Retinas
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Unlike OLED monitors that blast micro-pulses of light into tired eyes, the Kanso e-paper display reflects natural ambient room light. Zero flicker, zero circadian disruption.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Local Firmware Architecture
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    No Subscription. No Account. No Cloud.
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Operates straight out of the box. No mandatory companion app, no Wi-Fi pairing headaches, no telemetry tracking your work habits.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Macro View Tab */}
        {activeTab === 'macro' && (
          <div className="rounded-2xl border border-white/10 bg-[#14161a] overflow-hidden shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 relative aspect-[4/3] md:aspect-auto">
                <img
                  src={macroImage}
                  alt="Extreme macro close-up of knurled rotary encoder dial and CNC aluminum body"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
              </div>
              <div className="md:col-span-4 p-8 flex flex-col justify-center bg-[#15171b]">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
                  Precision Tolerances
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  0.02mm CNC Knurling
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Every dial is carved from a solid block of aerospace-grade 6061 aluminum, glass-bead blasted, and anodized for lasting micro-grip texture.
                </p>
                <div className="space-y-3 border-t border-white/10 pt-4 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Encoder Type</span>
                    <span className="text-white font-semibold">Optical Quadrature</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Detents / Rev</span>
                    <span className="text-white font-semibold">64 Click Detents</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Bearing Core</span>
                    <span className="text-white font-semibold">Dual Japanese Ceramic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Torque Weight</span>
                    <span className="text-white font-semibold">42g Calibrated Resistance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lifestyle View Tab */}
        {activeTab === 'lifestyle' && (
          <div className="rounded-2xl border border-white/10 bg-[#14161a] overflow-hidden shadow-2xl animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto">
                <img
                  src={lifestyleImage}
                  alt="Minimalist designer desk setup featuring Kanso Dial console next to notebook and fountain pen"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-4 p-8 flex flex-col justify-center bg-[#15171b]">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
                  Spatial Integration
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Harmony in Any Workspace
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  Compact 140mm footprint occupies minimal desk surface while serving as an unshakeable physical anchor for deep creative workflows.
                </p>
                <div className="space-y-3 border-t border-white/10 pt-4 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Footprint</span>
                    <span className="text-white font-semibold">142 × 86 × 28 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Desk Grip</span>
                    <span className="text-white font-semibold">High-Tac Silicone Mat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Mass</span>
                    <span className="text-white font-semibold">480g Weighted Base</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
