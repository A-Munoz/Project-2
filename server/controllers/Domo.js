const models = require('../models');
const Domo = models.Domo;


const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age ||!req.body.level) {
    return res.status(400).json({ error: 'all fields are required' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    class: req.body.class,
    health: req.body.health,
    wis: req.body.wis,
    int: req.body.int,
    dex: req.body.dex,
    str: req.body.str,
    con: req.body.con,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);
  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists' });
    }

    return res.status(400).json({ error: 'An error occured' });
  });

  return domoPromise;
};
const removeChar = (request, response) => {
    const req = request;
    const res = response;
    return Domo.DomoModel.removeCharacter(req.session.account._id, req.body.name,(err) => {
        if(err){
            console.log(err);
            return res.status(400).json({ error: 'An error occured' });
        }
        return res.json({message: 'Character Removed'});
    });
}

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};
const makeSettings = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('settings', { csrfToken: req.csrfToken() });
  });
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;
  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured' });
    }

    return res.json({ domos: docs });
  });
};


module.exports.makerPage = makerPage;
module.exports.makeSettings = makeSettings;
module.exports.getDomos = getDomos;
module.exports.make = makeDomo;
module.exports.removeChar = removeChar;
