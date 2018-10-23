export default function apiCheck(req: any, res: any, next: any) {
  process.env.API_KEY
    ? next()
    : next(new Error('Missing API key.'));
};
