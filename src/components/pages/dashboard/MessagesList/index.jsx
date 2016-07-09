import React from 'react';
import AsyncElement from '../../../common/AsyncElement';

var PreMessagesList = React.createClass({

  mixins: [ AsyncElement ],

  bundle: require('bundle?lazy!./MessagesList.jsx'),

  preRender: function () {
  	return <div></div>;
  }
});

export default PreMessagesList;