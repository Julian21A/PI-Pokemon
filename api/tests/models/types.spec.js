const { Type, conn } = require('../../src/db.js');

describe('Types model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Type.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if type name is null', (done) => {
        Type.create({})
          .then(() => done(new Error('It requires a valid Type')))
          .catch(() => done());
      });
      it('should work when its a valid Type', () => {
        Type.create({ name: 'Grass' });
      });
    });
  });
});
