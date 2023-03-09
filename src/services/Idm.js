import Socket from "../util/Socket";
import { idmEPs } from "../Config.json";

const { loginEP, registerEP } = idmEPs;

async function login(name, password) {
  const payLoad = {
    uname: name,
    upw: password
  };

  return await Socket.POST(loginEP, payLoad);
}

async function register(uname, password, utype, profession, age, gender, expertise, love_level) {
  const payLoad = {
    uname: uname,
    upw: password,
    utype: parseInt(utype),
    profession: profession,
    age: parseInt(age),
    gender: parseInt(gender),
    expertise: parseInt(expertise),
    love_level: parseInt(love_level)
  };
  //console.log(payLoad);
  return await Socket.POST(registerEP, payLoad);
}

export default {
  login, register
};
