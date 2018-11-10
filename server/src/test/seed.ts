import { ObjectId } from 'bson';

const id1 = new ObjectId();
const id2 = new ObjectId();

interface Seed {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  _id?: ObjectId;
};

const movies: Seed[] = [
  {
    Title: 'Jason Bourne',
    Year: '2014',
    imdbID: 'tt000001',
    Type: 'action',
    Poster: 'url1',
    _id: id1,
  },
  {
    Title: 'The Man from the U.N.C.L.E.',
    Year: '2015',
    imdbID: 'tt000002',
    Type: 'action',
    Poster: 'url2',
    _id: id2,
  },
];

export default movies;
