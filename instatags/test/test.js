'use strict';

const fs = require('fs');
require('chai').should();

const options = {
  resources: 'usable',
  runScripts: 'dangerously', 
  url: 'file://' + __dirname
};

const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
require('jsdom-global')(html, options);

const $ = require('jquery');
const user = require('../lib/user.json');

describe('Instatags', () => {

  before(done => window.pageIsReady = done); // Start tests only once all content is rendered on page

  it('should start calling renderUserMedia', () => {
    $('#user img').attr('src').should.equal(user.data.profile_picture);
  });
  
  it('should render the username on the page', () => {
    $('#user h1').text().should.equal(user.data.username);
  });

  it('should render the user data on the page', () => {
    $('#num-followers').text().should.equal(user.data.counts.followed_by);
    $('#num-follows').text().should.equal(user.data.counts.follows);
    $('#num-media').text().should.equal(user.data.counts.media);
  });

  it('should render the correct number of media', () => {
    $('.user-media-item').css('background-image').should.exist;
    $('.user-media-item').length.should.equal(20);
  });

  it('should render tags filtered by minimum frequency of 2', () => {
    $('.tag-list ul li').length.should.equal(14);
  });

  it('should filter pictures by sorted tags', () => {
    $('.tag-list ul li a')[0].click();
    $('.user-media-item').length.should.equal(15);
    $('.tag-list ul li a')[1].click();
    $('.user-media-item').length.should.equal(4);
  });
});
