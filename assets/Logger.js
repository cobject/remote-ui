const IS_CONSOLE = true;

class Logger {
  static log(tag, msg) {
    if (IS_CONSOLE === true) {
      console.log(msg);
    }
  }

  static format(tag, msg) {
    // [tag]: [time]: msg
    // return "[" + tag + "]: " + []
  }
}
