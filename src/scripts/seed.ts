import Profile from "../repository/Profile";
import Simulator from "../repository/Simulator";
import Favorite from "../repository/Favorite";
import DB from "../models";


(async () => {

  await DB.connect();
  await Profile.removeAll();
  await Simulator.removeAll();
  await Favorite.removeAll();


  const profile = await Profile.create({
    name: `String`,
    email: `String`,
    nickname: `String`,
    capital: `123`,
    divisa: `String`,
    prefered_cryptocurrency: `String`
  });

  const idProfile = profile._id

  await Simulator.create({
    profile_id: idProfile,
    name: `String`,
    start_date: `01/05/2021`,
    check_date: `01/05/2021`,
    cryptocurrency: `String`,
    divisa: `String`,
    Crypto_price_start: `123`,
    Crypto_price_check: `123`,
    dateRecorded: new Date(),
    euros: 6500,
    price: 60000, //Use decimal
  });


  await Favorite.create({
    profile_id: idProfile,
    name: `String`,
    favorites: [`String1`, `String2`, `String3`, ]
  });

  await DB.disconnect();
})();
