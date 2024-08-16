import './App.scss';

import Header from './components/header/header.component';
import Hero from './components/hero/hero.component';
import RecentArticles from './components/recentArticles/recentArticles.component';
import Footer from './components/footer/footer.comonent';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <RecentArticles></RecentArticles>
      <Footer></Footer>
    </div>
  );
}

export default App;
