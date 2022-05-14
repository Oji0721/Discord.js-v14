const express = require('express');

module.exports = async () => {
  
  const app = express();
  
  app.get('/', (req, res) => {
    res.sendStatus(200);
  });
  
  app.listen(3000);
}