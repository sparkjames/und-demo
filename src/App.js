import './App.scss';

import Header from './components/header/header.component';
import Hero from './components/hero/hero.component';
import RecentPosts from './components/recentPosts/recentPosts.component';
import Footer from './components/footer/footer.comonent';

function App() {
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
