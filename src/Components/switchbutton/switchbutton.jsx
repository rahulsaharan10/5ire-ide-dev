

import React from 'react';
import { Switch } from 'antd';
const switchbutton = (defaultChecked) => (
  <>
    <Switch defaultChecked />
    <br />
    <Switch size="small" defaultChecked />
  </>
);
export default switchbutton;