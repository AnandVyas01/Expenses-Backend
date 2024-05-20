class NoAuth {
  constructor(message) {
    this.message = message;
    this.status = 401;
  }
}

module.exports = { NoAuth };
