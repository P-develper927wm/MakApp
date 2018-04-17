
'use strict';


import db from '../../api/db/realm-db';
import Meteor from 'baryshok-react-native-meteor';




const userHelper = {

  isCompanyAdmin(companyId) {
    const user = Meteor.user();
    return Boolean(
      companyId &&
      user &&
      user.companies &&
      user.companies.length &&
      user.companies.some(item => item.companyId === companyId && item.role === 'admin')
    );
  },


  isBroadcaster() {
    const user = Meteor.user();
    return Boolean(
      user &&
      user.roles &&
      user.roles.length &&
      user.roles.indexOf('broadcaster') > -1
    );
  },


  getName(user) {
    if (user === undefined) {
      user = Meteor.user() || db.getCurrentUser();
    }
    if (!user) { return ''; }

    const { profile, username, emails } = user;

    if (profile && profile.firstName && profile.lastName) {
      return `${profile.firstName} ${profile.lastName}`;
    }

    if (username) { return username; }

    const email = emails && emails[0] && emails[0].address;
    if (email) { return email.substr(0, email.indexOf('@')); }

    return '';
  },


  getUserDataForAvatar(user) {
    if (user === undefined) {
      user = Meteor.user() || db.getCurrentUser();
    }
    if (!user) { return {}; }

    const username = user.username;
    const emails = user.emails;
    const email = emails && emails[0] && emails[0].address;
    const profile = user.profile;
    const avatarUrl = profile && profile.avatar && profile.avatar.upload;

    return { username, email, avatarUrl };
  },


  isNeedToSignUpForKisi() {
    const user = Meteor.user();
    return (
      user &&
      user.kisi &&
      user.kisi.needToSignUp &&
      !user.kisi.signedUp
    );
  },


  getUserDefaultProperty(user, properties) {
    const propertyId = userHelper.getUserDefaultPropertyId(user);
    return userHelper.getPropertyById(properties, propertyId);
  },


  getUserDefaultPropertyId(user) {
    const validPropertyUse = user && user.propertyUse && user.propertyUse.find(use => !use.endDate);
    return validPropertyUse && validPropertyUse.propertyId;
  },


  getPropertyById(properties, propertyId) {
    return properties && properties.find(property => property._id === propertyId);
  },


  getUserDefaultCompany(user, companies) {
    const companyId = userHelper.getUserDefaultCompanyId(user);
    return userHelper.getCompanyById(companies, companyId);
  },


  getUserDefaultCompanyId(user) {
    return user && user.companies && user.companies[0] && user.companies[0].companyId;
  },


  getCompanyById(companies, companyId) {
    return companies && companies.find(company => company._id === companyId);
  },


  getCompanyMembersCount(users, companyId) {
    let companyMembers = [];

    users && users.forEach && users.forEach(user => {
      const userCompanies = user && user.companies;
      const isTargetCompanyMember = userCompanies.some(userCompany => userCompany.companyId === companyId);
      if (isTargetCompanyMember) { companyMembers.push(user); }
    });

    return companyMembers.length;
  },

};


export default userHelper;
