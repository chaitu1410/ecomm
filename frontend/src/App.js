import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

import Header from './conponents/Header';
import Footer from './conponents/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
