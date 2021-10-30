'use strict';
import {
  expect
} from "chai";

require('../../src/api');

import {
  SERVER_PORT,
  SERVER_URL
} from "../../src/config";

import axios from 'axios';
import DB from "../../src/models";
import Favorite from "../../src/repository/Favorite";
import Profile from "../../src/repository/Profile";
import Simulator from "../../src/repository/Simulator";

const SERVER = `${SERVER_URL}:${SERVER_PORT}`;


suite('Testing Express API routes', () => {


  suite('Favorite Routes ', () => {
    test('should  /api/favorites return data correctly', async () => {
      await Favorite.removeAll();
      const {
        data: response
      } = await axios.get(`${SERVER}/api/favorites`);
      expect(response.favorite).to.be.an('array').that.have.length(0);

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
      const {
        data: {
          favorite
        }
      } = await axios.get(`${SERVER}/api/favorites`);

      expect(favorite.length).to.be.equal(2);
      const item1 = favorite.find(x => x.name === 'Reza');
      const item2 = favorite.find(x => x.name === 'Mir');
      expect(item1.favorites).be.deep.equal(favorites);
      expect(item2.favorites).be.deep.equal(favorites2);

    });

    test('should /api/favorites/:profile_id return data correctly', async () => {
      await Favorite.removeAll();
      const {
        data: response,
        status
      } = await axios.get(`${SERVER}/api/favorites/123`, {
        validateStatus: function() {
          return true;
        }
      });
      expect(status).to.be.equal(400);
      expect(response.error).to.be.equal('profile_id is not correct!');

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

      const {
        data: result,
      } = await axios.get(`${SERVER}/api/favorites/${profile_id}`, {
        validateStatus: function() {
          return true;
        }
      });

      expect(result.length).to.be.equal(1);
      expect(result[0].favorites).be.deep.equal(favorites);

    });
  });

  suite('Profile Routes ', () => {
    test('should Get /api/profiles return data correctly', async () => {
      await Profile.removeAll();
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
      const {
        data: {
          profile
        }
      } = await axios.get(`${SERVER}/api/profiles`);
      expect(profile).to.be.an('array').that.have.length(2);
      expect(profile[0]).to.have.all.keys('_id', 'name', 'email', 'nickname', 'capital', 'divisa', 'prefered_cryptocurrency');

    });

    test('should Post /api/profiles create item correctly', async () => {
      await Profile.removeAll();
      const newUser = {
        email: 'rmir@gmail.com',
        name: 'Reza',
        nickname: 'Reza2021'
      };
      const {
        data
      } = await axios.post(`${SERVER}/api/profiles`,
        newUser);

      expect(data.email).to.equal(newUser.email);
      expect(data.name).to.equal(newUser.name);
      expect(data.nickname).to.equal(newUser.nickname);

    });

    test('should Post /api/profiles validate input correctly', async () => {
      await Profile.removeAll();
      const newUser = {
        email: 'badmail.com',
        name: 'Reza',
        nickname: 'Reza2021'
      };
      let {
        data,
        status
      } = await axios.post(`${SERVER}/api/profiles`,
        newUser, {
          validateStatus: function() {
            return true;
          }
        });
      expect(status).to.equal(400);
      expect(data.error).to.equal('Your data is invalid');
      ///
      const newUser2 = {
        email: 'reza@mail.com',
        name: '',
        nickname: ''
      };
      const {
        data: data2,
        status: status2
      } = await axios.post(`${SERVER}/api/profiles`,
        newUser2, {
          validateStatus: function() {
            return true;
          }
        });
      expect(status2).to.equal(400);
      expect(data2.error).to.equal('Your data is invalid');

    });
  });

  suite('Simulator Routes ', () => {
    test('should Get /api/simulators return all data correctly', async () => {
      await Simulator.removeAll();
      const profile_id = DB.generateObjectId();
      const profile_id2 = DB.generateObjectId();

      const data = {
        name: `String`,
        start_date: `01/05/2021`,
        check_date: `02/05/2021`,
        cryptocurrency: `bitcoin`,
        divisa: `divisa`,
        Crypto_price_start: `123`,
        Crypto_price_check: `657`,
        dateRecorded: new Date(),
        euros: 333,
        price: 777
      };
      const data2 = {
        name: `String`,
        start_date: `01/05/2021`,
        check_date: `02/05/2021`,
        cryptocurrency: `shiba`,
        divisa: `divisa`,
        Crypto_price_start: `123`,
        Crypto_price_check: `657`,
        dateRecorded: new Date(),
        euros: 999,
        price: 555
      };

      await Simulator.create({
        profile_id,
        ...data,
      })
      await Simulator.create({
        profile_id: profile_id2,
        ...data2,
      })

      const {
        data: {
          simulator
        }
      } = await axios.get(`${SERVER}/api/simulators`);
      expect(simulator.length).to.be.equal(2);
      const item1 = simulator.find(x => x.cryptocurrency === 'bitcoin');
      const item2 = simulator.find(x => x.cryptocurrency === 'shiba');
      expect(item1.price).to.be.equal(777);
      expect(item2.price).to.be.equal(555);

    });

    test('should Get /api/simulators/:profile_id find item correctly', async () => {
      await Simulator.removeAll();
      const profile_id = DB.generateObjectId();
      const profile_id2 = DB.generateObjectId();

      const info = {
        name: `String`,
        start_date: `01/05/2021`,
        check_date: `02/05/2021`,
        cryptocurrency: `bitcoin`,
        divisa: `divisa`,
        Crypto_price_start: `123`,
        Crypto_price_check: `657`,
        dateRecorded: new Date(),
        euros: 333,
        price: 777
      };
      const info2 = {
        name: `String`,
        start_date: `01/05/2021`,
        check_date: `02/05/2021`,
        cryptocurrency: `shiba`,
        divisa: `divisa`,
        Crypto_price_start: `123`,
        Crypto_price_check: `657`,
        dateRecorded: new Date(),
        euros: 999,
        price: 555
      };

      await Simulator.create({
        profile_id,
        ...info,
      })
      await Simulator.create({
        profile_id: profile_id2,
        ...info2,
      })

      const {
        data
      } = await axios.get(`${SERVER}/api/simulators/${profile_id}`);

      expect(data[0].profile_id.toString()).to.be.equal(profile_id.toString())
    });

    test('should Get /api/simulators/:profile_id validate input correctly', async () => {
      const {
        data,
        status
      } = await axios.get(`${SERVER}/api/simulators/abc`, {
        validateStatus: function() {
          return true;
        }
      });
      expect(status).to.equal(400);
      expect(data.error).to.equal('profile_id is not correct!');
    });

    test('should Post /api/simulators/:profile_id create item correctly', async () => {
      await Simulator.removeAll();
      const profile_id = DB.generateObjectId();
      const data = {
        name: `NameString`,
        start_date: `01/05/2021`,
        check_date: `01/05/2021`,
        cryptocurrency: `bitcoin`,
        divisa: `String`,
        Crypto_price_start: `123`,
        Crypto_price_check: `123`,
        dateRecorded: new Date(),
        euros: 6500,
        price: 60000
      }

      const {
        data: result
      } = await axios.post(`${SERVER}/api/simulators/${profile_id}`, {
        profile_id,
        ...data
      });
      expect(result.profile_id).to.be.equal(profile_id.toString())
      expect(result.price).to.be.equal(data.price);
      expect(result.euros).to.be.equal(data.euros);
      expect(result.cryptocurrency).to.be.equal(data.cryptocurrency);
      expect(result.name).to.be.equal(data.name);
    });

    test('should Post /api/simulators/:profile_id validate input correctly', async () => {
      const {
        data,
        status
      } = await axios.post(`${SERVER}/api/simulators/abc`, {
        name: `NameString`,
        cryptocurrency: `bitcoin`,
        price: 3000
      }, {
        validateStatus: function() {
          return true;
        }
      });
      expect(status).to.equal(400);
      expect(data.error).to.equal('profile_id is not correct!');

      //
      const profile_id = DB.generateObjectId();
      const {
        data: data2,
        status: status2
      } = await axios.post(`${SERVER}/api/simulators/${profile_id}`, {}, {
        validateStatus: function() {
          return true;
        }
      });
      expect(status2).to.equal(400);
      expect(data2.error).to.equal('Your data is invalid');

    });

  });

});