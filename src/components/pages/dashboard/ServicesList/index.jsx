import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreServicesList = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./ServicesList.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreServicesList;