import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <div>
      <Link to="/async">async로 이동</Link>
    </div>
    hoilzz home 입니다
  </div>
);

export default Home;
