
module.exports = function(app){
  console.log(`Loading feature toggles`);

  app.get('/features', (req, res) => {
    console.log('Got request');

    res.setHeader('Content-Type', 'application/json');
    res.json({
      ADD_ITEM: process.env.TOGGLE_ADD_ITEM === "true",
    });
  });
};
