import { ObjectId } from 'bson';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

const { app } = require('../../server');
const { Movie } = require('../../db/models/movie');
import movies from '../seed';

const { expect, request } = chai.use(chaiHttp);

// const id1 = new ObjectId();
// const id2 = new ObjectId();

describe('#movies', () => {
  // const movies = [
  //   {
  //     _id: id1,
  //     title: 'The SpongeBob SquarePants Movie',
  //     genre: 'animation',
  //     isLiked: true
  //   },
  //   {
  //     _id: id2,
  //     title: 'The Notebook',
  //     genre: 'drama',
  //     isLiked: false
  //   }
  // ];

  beforeEach(async () => {
    await Movie.remove({});
    await Movie.insertMany(movies);
  });

  describe('GET /movies', () => {
    it('returns all movies', async () => {
      const response = await request(app)
        .get('/api/movies')

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });
  });

  describe('POST /api/movies', () => {
    it('adds a new post', async () => {
      const newMovie = {
        Title: 'SpongeBob Squarepants',
        Year: '2004',
        imdbID: 'tt000003',
        Type: 'children',
        Poster: 'url3'
      };

      const response = await request(app)
        .post('/api/movies')
        .send(newMovie);

      const movies = await Movie.find({});

      expect(response.status).to.equal(201);
      expect(response.body).has.property('Title', 'SpongeBob Squarepants');
      expect(movies).to.have.lengthOf(3);
    });

    it('returns error if no title is given to the movie', async () => {
      const newMovie = {
        Year: '2004',
        imdbID: 'tt000003',
        Type: 'children',
        Poster: 'url3'
      };

      const response = await request(app)
        .post('/api/movies')
        .send(newMovie);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('errors');
      expect(response.body).to.have.property('message', 'Movie validation failed: Title: Path `Title` is required.');
    });
  });

  describe('GET /api/movies/:id', () => {
    it('returns error if id is not valid', async () => {
      const response = await request(app)
        .get('/api/movies/123');

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Invalid id!');
    });

    it('should return 404 if no movie is found', async () => {
      const newId = 'tt001';

      const response = await request(app)
        .get(`/api/movies/${ newId }`);

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Movie not found.');
    });

    it('returns the relevant movie', async () => {
      const response = await request(app)
        .get('/api/movies/tt000001');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.lengthOf(1);

      const [movie] = response.body;
      expect(movie).to.have.property('Title', 'Jason Bourne');
    });
  });

  describe('DELETE /api/movies', () => {
    it('deletes all movies', async () => {
      const response = await request(app)
        .del('/api/movies');

      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Deleted all movies.');

      const movies = await Movie.find({});
      expect(movies).to.have.lengthOf(0);
    });

    it('returns error if id is not valid', async () => {
      const response = await request(app)
        .del('/api/movies/123');

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Invalid id!');
    });

    it('should return 404 if no movie is found', async () => {
      const response = await request(app)
        .del('/api/movies/tt001');

      expect(response.status).to.equal(404);
      expect(response.text).to.equal('Movie not found.');
    });

    it('deletes the relevant movie', async () => {
      const response = await request(app)
        .del('/api/movies/tt000001');

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('Title', 'Jason Bourne');

      const movies = await Movie.find({});
      expect(movies).to.have.lengthOf(1);

      const [movie] = movies;
      expect(movie).to.have.property('Title', 'The Man from the U.N.C.L.E.');
    });
  });
});
