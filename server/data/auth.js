import MongoDB from 'mongodb';
import { getUsers } from '../db/datebase.js';
const ObjectID = MongoDB.ObjectId;

export async function findByUserName(username) {
  return getUsers().find({ username }).next().then(mapOptionalUser);
}

export async function findById(id) {
  return getUsers()
    .find({ _id: new ObjectID(id) })
    .next(mapOptionalUser);
}

export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
