import './App.css';
import Cart from './components/cart/cart.component';
import CartSummary from './components/cart-summary/cart-summary.component';
import Header from './components/header/header.component';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='cart-details'>
        <Cart />
        <CartSummary />
      </div>
    </div>
  );
}

export default App;
