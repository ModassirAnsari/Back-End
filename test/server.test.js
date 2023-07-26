const { expect } = require('chai');
const chai = require('chai');
// const request = require('chai').request;
// const app = require('../server'); 
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const requests = chai.request("http://localhost:1998");

// Test the POST /suppliers route
describe('POST /suppliers', () => {
  it('should create a new supplier', (done) => {
    const newSupplier = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      mobile: '1234567890',
      product: 'Product XYZ',
    };

    requests
      .post('/suppliers')
      .send(newSupplier)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        expect(res.body.message).to.equal('Supplier added successfully');
        return done();
      });
  }).timeout(10000);
});



describe('GET /suppliers', () => {
  it('should get all suppliers', (done) => {
    const res = requests.get('/suppliers').end((err, res) => {
      if (err) return done(err);
      res.should.have.status(200);
      // res.body.message.should.be.a('string');
      return done();
    });
  }).timeout(10000);
});


// Test the POST /login route
describe('POST /login', () => {
  it('should return 401 for invalid credentials', (done) => {
    // Create a user object with invalid credentials
    const invalidUserCredentials = {
      email: 'john.doe@example.com',
      password: 'invalid-password',
    };

    requests
      .post('/login')
      .send(invalidUserCredentials)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(401);
        expect(res.body.message).to.equal('Invalid email or password');
        return done();
      });
  }).timeout(10000);

  it('should return 404 for non-existent user', (done) => {
    // Create a user object with a non-existent email
    const nonExistentUserCredentials = {
      email: 'nonexistent@example.com',
      password: 'password',
    };

    requests
      .post('/login')
      .send(nonExistentUserCredentials)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(404);
        expect(res.body.message).to.equal('Invalid email or password');
        return done();
      });
  }).timeout(10000);
});

// ============================================
// Test the DELETE /suppliers/:id route

describe('DELETE /suppliers/:id', () => {
  let supplierId; // Variable to store the ID of the created supplier
  it('should delete a supplier', (done) => {
    requests
      .delete(`/suppliers/${supplierId}`)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        expect(res.body.message).to.equal('Supplier deleted successfully');
        return done();
      });
  }).timeout(10000); 


});

