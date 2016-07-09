import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreServiceAdd = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./ServiceAdd.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreServiceAdd;