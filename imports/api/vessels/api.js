import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Vessels = new Mongo.Collection('vessels');

export default Vessels;
