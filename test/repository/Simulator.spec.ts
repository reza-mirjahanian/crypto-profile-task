import {
  expect
} from "chai";

import Simulator from '../../src/repository/Simulator';
import DB from '../../src/models';



suite('Testing Simulator Repo Class', () => {
  suiteSetup(async function() {
    await DB.connect();
  });

  suiteTeardown(async function() {
    await DB.disconnect();
  });

  setup(async () => {
    await Simulator.removeAll();
  });

  suite(':getAll()', () => {
    test('should returns all data', async () => {
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

      const result = await Simulator.getAll();
      expect(result.length).to.be.equal(2);
      const item1 = result.find(x => x.cryptocurrency === 'bitcoin');
      const item2 = result.find(x => x.cryptocurrency === 'shiba');
      expect(item1.price).to.be.equal(777);
      expect(item2.price).to.be.equal(555);

    });
  });

  suite(':find()', () => {
    test('should find correct data', async () => {
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

      const result = await Simulator.find({
        profile_id
      });

      expect(result[0].profile_id.toString()).to.be.equal(profile_id.toString())

    });
  });


});