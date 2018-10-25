import rp from 'request-promise-native';

export const fetchMovieByTitle = async (req: any, res: any) => {
  const title = req.params.title;

  if (!title) {
    return res.status(400).send('Invalid request.');
  }

  const options = {
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

export const fetchMovieDetailsById = async (req: any, res: any) => {
  const movieId = req.params.id;

  const options = {
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
