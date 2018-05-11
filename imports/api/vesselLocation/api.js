import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';

Meteor.methods({
  async 'vesselLocation.find'(mmsi) {
    if (this.isSimulation) {
      return;
    }
    let res = null;

    try {
      res = await (new Promise((resolve, reject) =>
        HTTP.get(
          'https://api.aprs.fi/api/get',
          {
            params: {
              name: mmsi,
              what: 'loc',
              apikey: '109676.BrVSr9i6TpbMbBe',
              format: 'json'
            }
          },
          (err, resp) => {
            if (err) {
              return reject(err);
            }
            resolve(resp);
          }
        )
      ));

      if (!res.data || res.data.result === 'fail') {
        throw new Meteor.Error('vesselLocation.find.api_error', '');
      }
    } catch (err) {
      throw new Meteor.Error('vesselLocation.find.api_error', 'Failed to get location data');
    }

    if (!res.data || res.data.found === 0) {
      throw new Meteor.Error('vesselLocation.find.not_found', 'Vessel location is not found');
    }

    return res.data.entries[0];
  }
})
