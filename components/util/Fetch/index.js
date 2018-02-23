import Axios from 'axios';

export default class Fetch extends Axios {
  static testCustom(params) {
    console.log(params);
  }
}
