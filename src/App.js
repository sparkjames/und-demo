import './App.scss';
import './assets/fonts/nimbus-roman-no9-l.css';

import Header from './components/header/header.component';
import Hero from './components/hero/hero.component';
import RecentPosts from './components/recentPosts/recentPosts.component';
import Footer from './components/footer/footer.comonent';
import { useEffect } from 'react';

function App() {

  useEffect( () => {
    const WebFont = require('webfontloader');

    WebFont.load({
      google: {
        families: [
          'Oswald:500'
        ]
      },
      custom: {
        families: ['Nimbus Roman No9 L Regular', 'Nimbus Roman No9 L Bold']
      }
    });
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <RecentPosts></RecentPosts>
      <Footer></Footer>
    </div>
  );
}

export default App;
