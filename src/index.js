'use strict';

const m = require('mithril');
const domready = require('domready');

const pomodoroDuration = 1500;
const shortBreakDuration = 300;
const longBreakDuration = 900;



function padWithZeros(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function timerView(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  return m('time', `${padWithZeros(minutes)}:${padWithZeros(seconds)}`);
}

const pomodoroComponent = {
  oninit(vnode) {
    let currentDuration = 0;
    let counter;

    vnode.state.time = 0;

    vnode.state.startTimer = () => {
      if (!vnode.state.time) {
        return;
      }

      counter = setInterval(() => {
        vnode.state.time--;
        m.redraw();
        if (vnode.state.time === 0) {
          clearInterval(counter);
        }
      }, 1000);
    };

    vnode.state.pauseTimer = () => {
      clearInterval(counter);
    };

    vnode.state.resetTimer = () => {
      clearInterval(counter);
      vnode.state.time = currentDuration;
    };

    vnode.state.setTimer = (duration) => {
      currentDuration = duration;
      vnode.state.resetTimer();
    };
  },
  view(vnode) {
    return m('main', [
      m('h1', 'Pomodoro Timer'),
      timerView(vnode.state.time),
      m('nav', [
        m('button[type="button"]', { onclick: vnode.state.startTimer }, 'Start'),
        m('button[type="button"]', { onclick: vnode.state.pauseTimer }, 'Pause'),
        m('button[type="button"]', { onclick: vnode.state.resetTimer }, 'Reset')
      ]),
      m('.durationSelection', [
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(pomodoroDuration); } }, 'Pomodoro'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(shortBreakDuration); } }, 'Short break'),
        m('button[type="button"]', { onclick: () => { vnode.state.setTimer(longBreakDuration); } }, 'Long Break')
      ])
    ]);
  }
};

domready(() => m.mount(document.body, pomodoroComponent));
