//-----------------------------------
//
// Main
//
//----------------------------------

import FastClick from 'fastclick'
import BPM from './components/BPM'
import '../css/index.css'


const MOUNT = document.getElementById('mount')


function resetCallback(){
  MOUNT.innerHTML = '0.0'
}


function calc(b){
  const {avg, count} = b.tap()
  MOUNT.innerHTML = `${avg.toFixed(1)}`
}


function start(){

  //new counter
  const b = new BPM(resetCallback)

  //make clicks fast
  FastClick.attach(document.body)

  //listeners
  document.body.addEventListener('keydown', () => {calc(b)})
  document.body.addEventListener('click', () => {calc(b)})
}

//start
document.addEventListener('DOMContentLoaded', start)

//add service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
