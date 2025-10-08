import { useContext } from 'react';

import CartContext from '../contexts/CartContext.jsx';

import { DUMMY_PRODUCTS } from '../dummy-products.js';
import Product from './Product.jsx';

export default function Shop() {
  const { addItemToCart } = useContext(CartContext);
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={addItemToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}
