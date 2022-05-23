const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
    });

    describe('health', ()=>{
      it('should throw 50 if health is null', (done)=>{
        Pokemon.create({health:'' })
        .then(() => done(50))
        .catch(() => done());
      
      });
      it('should work when its a valid stat', () => {
        Pokemon.create({ health: 65 });
      })
      it('should throw error if health is invalid', (done)=>{
        Pokemon.create({health:258 })
        .then(() => done(new Error('It requires a valid name')))
        .catch(() => done());
      });
    });

    describe('strength', ()=>{
      it('should throw 50 if strength is null', (done)=>{
        Pokemon.create({ strength:'' })
        .then(() => done(50))
        .catch(() => done());
      
      });
      it('should work when its a valid stat', () => {
        Pokemon.create({ strength: 258 });
      })
      it('should throw error if health is invalid', (done)=>{
        Pokemon.create({health:258 })
        .then(() => done(new Error('It requires a valid value')))
        .catch(() => done());
      });
    });

    describe('defense', ()=>{
      it('should throw 50 if defense is null', (done)=>{
        Pokemon.create({ defense:'' })
        .then(() => done(50))
        .catch(() => done());
      
      });
      it('should work when its a valid stat', () => {
        Pokemon.create({ defense: 65 });
      })
      it('should throw error if defense is invalid', (done)=>{
        Pokemon.create({defense: 256 })
        .then(() => done(new Error('It requires a valid value')))
        .catch(() => done());
      });
    });
    
    describe('speed', ()=>{
      it('should throw 50 if speed is null', (done)=>{
        Pokemon.create({ speed:'' })
        .then(() => done(50))
        .catch(() => done());
      
      });
      it('should work when its a valid stat', () => {
        Pokemon.create({ speed: 65 });
      })
      it('should throw error if speed is invalid', (done)=>{
        Pokemon.create({health:258 })
        .then(() => done(new Error('It requires a valid value')))
        .catch(() => done());
      });
    });
  });
})
