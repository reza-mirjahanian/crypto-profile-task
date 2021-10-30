import {
  Validator
} from 'node-input-validator';

export default async (req, res, next) => {
  const {
    email,
    name,
    nickname
  } = req.body;
  const v = new Validator({
    email,
    name,
    nickname
  }, {
    email: 'required|email',
    name: 'required|minLength:3',
    nickname: 'required|minLength:3'
  }, );

  if (await v.fails()) {
    res.status(400).send({
      error: 'Your data is invalid'
    })
  } else {
    next()
  }
}