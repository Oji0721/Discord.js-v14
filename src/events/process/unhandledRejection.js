module.exports = {
  name: 'unhandledRejection',
  process: true,

  async execute(reason, p) {
    console.log(reason, p);
  }
}