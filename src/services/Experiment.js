import Socket from "../util/Socket";
import { experimentEPs } from "../Config.json";

const { startEP, memoryEP, musicUpdateEP, expEndEP } = experimentEPs;

async function start(uid, exp_num, initial_v, initial_a) {
  const payLoad = {
    uid: uid,
    exp_num: exp_num,
    initial_v: initial_v,
    initial_a: initial_a
  };
  //console.log(payLoad, startEP);
  return await Socket.POST(startEP, payLoad);
}

async function memory(uid, exp_num, music_num, memory) {
  const payLoad = {
    uid: uid,
    exp_num: exp_num,
    music_num: music_num,
    memory: memory
  };
  //console.log(payLoad);
  return await Socket.POST(memoryEP, payLoad);
}

async function musicUpdate(uid, exp_num, music_num, mid, v, a, score, familiarity) {
  const payLoad = {
    uid: uid,
    exp_num: exp_num,
    music_num: music_num,
    mid: mid,
    v: v,
    a: a,
    score: score,
    familiarity: familiarity
  };
  //console.log(payLoad);
  return await Socket.POST(musicUpdateEP, payLoad);
}

async function expEnd(uid, exp_num, v, a, evaluate, recommend_rate) {
  const payLoad = {
    uid: uid,
    exp_num: exp_num,
    final_v: v,
    final_a: a,
    evaluate: evaluate,
    recommend_rate: recommend_rate
  };
  //console.log(payLoad);
  return await Socket.POST(expEndEP, payLoad);
}

export default {
  start, memory, musicUpdate, expEnd
};
