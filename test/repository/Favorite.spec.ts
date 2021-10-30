import {
  expect
} from "chai";

import Favorite from '../../src/repository/Favorite';
import DB from '../../src/models';


suite('Testing Favorite Repo Class', () => {
  suiteSetup(async function() {
    await DB.connect();
  });

  suiteTeardown(async function() {
    await DB.disconnect();
  });

  setup(async () => {
    await Favorite.removeAll();
  });

  suite(':getAll()', () => {
    test('should returns all data', async () => {
      const profile_id = DB.generateObjectId();
      const profile_id2 = DB.generateObjectId();
      const name = 'Reza';
      const name2 = 'Mir';
      const favorites = ['myfav1', 'myfav2'];
      const favorites2 = ['fav3', 'fav4'];
      await Favorite.create({
        profile_id,
        name,
        favorites
      })
      await Favorite.create({
        profile_id: profile_id2,
        name: name2,
        favorites: favorites2
      });

      const result = await Favorite.getAll();
      expect(result.length).to.be.equal(2);
      const item1 = result.find(x => x.name === 'Reza');
      const item2 = result.find(x => x.name === 'Mir');
      expect(item1.favorites).be.deep.equal(favorites);
      expect(item2.favorites).be.deep.equal(favorites2);
    });

  });


  suite(':find()', () => {
    test('should find data with profile id', async () => {
      const profile_id = DB.generateObjectId();
      const profile_id2 = DB.generateObjectId();
      const name = 'Reza';
      const name2 = 'Mir';
      const favorites = ['myfav1', 'myfav2'];
      const favorites2 = ['fav3', 'fav4'];
      await Favorite.create({
        profile_id,
        name,
        favorites
      })
      await Favorite.create({
        profile_id: profile_id2,
        name: name2,
        favorites: favorites2
      });

      const result = await Favorite.find({
        profile_id
      });
      expect(result.length).to.be.equal(1);
      expect(result[0].favorites).be.deep.equal(favorites);
    });

  });
});