import rp, { Options } from 'request-promise-native';
import { Request, Response } from 'express';

export const fetchMovieByTitle = async (req: Request, res: Response) => {
  const title = req.params.title;

  if (!title) {
    return res.status(400).send('Invalid request.');
  }

  const options: Options = {
    uri: `https://www.omdbapi.com/?s=${ title }&apikey=${ process.env.API_KEY }`,
    method: 'GET',
    json: true
  };

  try {
    const data = await rp(options);
    res.send(data);
  } catch (e) {
    res.status(404).send(e);
  }
};

export const fetchMovieDetailsById = async (req: Request, res: Response) => {
  const movieId = req.params.id;

  const options: Options = {
    uri: `https://www.omdbapi.com/?i=${ movieId }&apikey=${ process.env.API_KEY }`,
    method: 'GET',
    json: true
  };

  try {
    const data = await rp(options);
    res.send(data);
  } catch (e) {
    res.status(404).send(e);
  }
};
