'use strict';

//@todo use better Logger
export default {
  log: (message = '') => {
    console.log("#Log: " + message);
  },
  error: (message = "Error!") => {
    console.error("#Error: " + message);
  }


}
