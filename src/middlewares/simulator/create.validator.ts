import DB from '../../models'
import {
  Validator
} from 'node-input-validator';

export default async (req, res, next) => {
  const {
    profile_id
  } = req.params;

  const {
    price,
    name,
    cryptocurrency
  } = req.body;
  const v = new Validator({
    price,
    name,
    cryptocurrency
  }, {
    name: 'required|minLength:3',
    cryptocurrency: 'required|minLength:1',
    price: 'required|numeric'
  },);

  if (await v.fails()) {
    res.status(400).send({
      error: 'Your data is invalid'
    })
  }else if (!DB.isValidObjectId(profile_id)) {
    res.status(400).send({
      error: 'profile_id is not correct!'
    })
  } else {
    next()
  }
}
