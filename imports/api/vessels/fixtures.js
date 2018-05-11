import { Meteor } from 'meteor/meteor';
import Vessels from './api';
import seedVessels from './seed.json';

Meteor.startup(() => {
  if (Vessels.find({}).count() === 0) {
    seedVessels.forEach(v => {
      Vessels.insert(v);
    });
  }
})
