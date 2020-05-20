const { server } = require('../server/index.js');

const { _connectionKey } = server;
const PORT = _connectionKey.split(':').pop();
const key = `Demo test localhost:${PORT}`;

// end-to-end test for `Search` component
module.exports = {
  [key]: (client) => {
    client
      .url(`http://localhost:${PORT}`)
      .waitForElementVisible('body')
      .assert.visible('input[type=search]')
      // .pause(1000)
      .setValue('input[type=search]', 'fugit')
      .pause(3000)
      .assert.containsText('.review', 'fugit')
      .end(() => process.exit());
  },
};
