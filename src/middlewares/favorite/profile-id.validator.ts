import DB from '../../models'
export default (req, res, next) => {
  const {
    profile_id
  } = req.params;
  if (!DB.isValidObjectId(profile_id)) {
    res.status(400).send({
      error: 'profile_id is not correct!'
    })
  } else {
    next()
  }
}