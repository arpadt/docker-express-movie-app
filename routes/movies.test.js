const chai = require('chai');
const chaiHttp = require('chai-http');
const { Types: { ObjectId } } = require('mongoose');

const { app } = require('../server/server');
const { Movie } = require('../db/models/movie');

const { expect, request } = chai.use(chaiHttp);

const id1 = new ObjectId();
const id2 = new ObjectId();

describe('#movies', () => {
  const movies = [
    {
      _id: id1,
      title: 'The SpongeBob SquarePants Movie',
      genre: 'animation',
      isLiked: true
    },
    {
      _id: id2,
      title: 'The Notebook',
      genre: 'drama',
      isLiked: false
    }
  ];

  beforeEach(async () => {
    await Movie.remove({});
    await Movie.insertMany(movies);
  });

  describe('GET /movies', () => {
    it('returns all movies', async () => {
      const response = await request(app)
        .get('/movies')

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });
  });

  describe('POST /movies', () => {
    it('adds a new post', async () => {
      const newMovie = {
        title: 'Mr Fuzzycat',
        genre: 'family',
        isLiked: true
      };

      const response = await request(app)
        .post('/movies')
        .send(newMovie);

      const movies = await Movie.find({});

      expect(response.status).to.equal(200);
      expect(response.body).has.property('title', 'Mr Fuzzycat');
      expect(movies).to.have.lengthOf(3);
    });

    it('returns error if no title is given to the movie', async () => {
      const newMovie = {
        genre: 'family'
      };

      const response = await request(app)
        .post('/movies')
        .send(newMovie);

      expect(response.status).to.equal(400);
      expect(response.text).to.equal('An error occured.');
    });
  });

  describe('GET /movies/:id', () => {
    it('returns error if id is not valid', async () => {
      const response = await request(app)
        .get('/movies/123');

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Invalid id!');
    });

    it('should return 404 if no movie is found', async () => {
      const newId = new ObjectId();

      const response = await request(app)
        .get(`/movies/${ newId }`);

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Movie not found.');
    });

    it('returns the relevant movie', async () => {
      const response = await request(app)
        .get(`/movies/${ id1 }`);

      expect(response.body).to.have.property('title', 'The SpongeBob SquarePants Movie');
    });
  });
});
