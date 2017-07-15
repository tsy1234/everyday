import React from 'react';
import { render } from 'react-dom';

import Nav from '../modules/components/Nav';
import Groups from '../modules/components/Groups';
import '../public/style/normalize.css';

render(
     <div>
         <Nav/>
         <Groups/>
     </div>,
    document.getElementById('app')
);


