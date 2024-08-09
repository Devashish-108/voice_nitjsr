const loginFactory = {
  data: {
    isLoggingIn: false,
  },
  get: function (key) {
    return this.data[key];
  },
  set: function (obj) {
    if (typeof obj === "object") {
      this.data = { ...this.data, ...obj };
    }
  },
};

export default loginFactory;
