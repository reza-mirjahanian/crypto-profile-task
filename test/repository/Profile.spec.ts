import {
  expect
} from "chai";

import Profile from '../../src/repository/Profile';
import DB from '../../src/models';


suite('Testing Profile Repo Class', () => {
  suiteSetup(async function() {
    await DB.connect();
  });

  suiteTeardown(async function() {
    await DB.disconnect();
  });

  setup(async () => {
    await Profile.removeAll();
  });

  suite(':getAll()', () => {
    test('should returns all data', async () => {
      const name = 'My profile';
      const email = 'rmir@gmail.com';
      const nickname = 'reza1234';
      const capital = 123;
      const divisa = 'high';
      const prefered_cryptocurrency = 'what?';
      await Profile.create({
        name,
        email,
        nickname,
        capital,
        divisa,
        prefered_cryptocurrency
      })
      await Profile.create({
        name: 'name2',
        email: 'mymail@gmail.com',
        nickname: 'unique',
        capital: 0,
        divisa: 'divisa',
        prefered_cryptocurrency: 'bitcoin'
      })

      const result = await Profile.getAll();
      expect(result).to.be.an('array').that.have.length(2);
      expect(result[0]).to.have.all.keys('_id', 'name', 'email', 'nickname', 'capital', 'divisa', 'prefered_cryptocurrency');
    });
  });

  suite(':createUser()', () => {
    test('should create user only once', async () => {
      const name = 'Reza';
      const email = 'rmir@gmail.com';
      const nickname = 'reza1234';
      const newUser = await Profile.createUser(
        email,
        name,
        nickname
      );

      const result = await Profile.getAll();
      expect(result[0].email).to.be.equal(email);
      expect(newUser.email).to.be.equal(email);
      expect(result[0].nickname).to.be.equal(nickname);
      expect(newUser.nickname).to.be.equal(nickname);
      expect(result[0].name).to.be.equal(name);

      const newUser2 = await Profile.createUser(
        email,
        'name 22',
        nickname
      );
      expect(newUser2.nickname).to.be.equal(nickname);
      expect(newUser2.name).to.be.equal(name);

      const newUser3 = await Profile.createUser(
        email,
        'name 33',
        'nickname 33'
      );
      expect(newUser3.nickname).to.be.equal(nickname);
      expect(newUser3.name).to.be.equal(name);
      const newUser4 = await Profile.createUser(
        'aonther@mail.com',
        'name 33',
        nickname
      );
      expect(newUser4.nickname).to.be.equal(nickname);
      expect(newUser4.name).to.be.equal(name);
      expect(newUser4.email).to.be.equal(email);

    });
  });


});