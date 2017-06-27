const IS_CONSOLE = true;

class Logger {
  static log(tag, msg) {
    if (IS_CONSOLE === true) {
      console.log(tag, msg);
    }
  }
}
