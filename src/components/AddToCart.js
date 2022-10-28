import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product = {} }) => {
  const { addToCart } = useCartContext();
  const { id, stock, colors = [] } = product;
  const [colorSelected, setColorSelected] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prev) => {
      if (prev === stock) return prev;
      return prev + 1;
    });
  };
  const decreaseQty = () => {
    setQuantity((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
          {colors.map((color, index) => (
            <button
              className={
                colorSelected === color ? 'color-btn active' : 'color-btn'
              }
              key={index}
              style={{ backgroundColor: `${color}` }}
              onClick={() => setColorSelected(colors[index])}
            >
              {colorSelected === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          add={increaseQty}
          minus={decreaseQty}
          amount={quantity}
        />

        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, colorSelected, quantity, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
