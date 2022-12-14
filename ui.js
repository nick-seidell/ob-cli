'use strict';
const React = require('react');
const {Text} = require('ink');
const Gradient = require('ink-gradient');
const BigText = require('ink-big-text');
const importJsx = require('import-jsx');
const Table = importJsx('./components/Table')

const App = () => (
  <Gradient name='summer'>
    <BigText text="orderbook cli" align='center' font='chrome'/>
  </Gradient>
);

module.exports = App;
