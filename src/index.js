'use strict';

const m = require('mithril');
const domready = require('domready');

const pomodoroDuration = 1500;
const shortBreakDuration = 300;
const longBreakDuration = 900;

function timerView(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  return m('time', `${minutes}:${seconds}`);
}

const pomodoroComponent = {
  oninit(vnode) {
    vnode.state.currentDuration = 0;
    vnode.state.time = 0;

    vnode.state.startTimer = () => {
      if (!vnode.state.time) {
        vnode.state.time = vnode.state.currentDuration;
      }

      vnode.state.counter = setInterval(() => {
        vnode.state.time--;
        m.redraw();
        if (vnode.state.time === 0) {
          clearInterval(vnode.state.counter);
        }
      }, 1000);
    };

    vnode.state.resetTimer = () => {
      clearInterval(vnode.state.counter);
      vnode.state.time = vnode.state.currentDuration;
    };

    vnode.state.setTimer = (duration) => {
      vnode.state.currentDuration = duration;
      vnode.state.time = duration;
    };
  },
  view(vnode) {
    return m('main', [
      m('h1', 'Pomodoro Timer'),
      m('nav', [
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(pomodoroDuration); } }, 'Pomodoro'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(shortBreakDuration); } }, 'Short break'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(longBreakDuration); } }, 'Long Break')
      ]),
      timerView(vnode.state.time),
      m('nav', [
        m('button[type="button"]', { onclick: vnode.state.startTimer }, 'Start'),
        m('button[type="button"]', {}, 'Pause'),
        m('button[type="button"]', { onclick: vnode.state.resetTimer }, 'Reset')
      ])
    ]);
  }
};

domready(() => m.mount(document.body, pomodoroComponent));
