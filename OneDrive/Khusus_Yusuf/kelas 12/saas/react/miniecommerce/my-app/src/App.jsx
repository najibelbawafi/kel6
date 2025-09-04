import { useState, useReducer, useMemo, useOptimistic, useEffect, useRef } from "react";
import "./App.css";
import useFetchAdvanced from "./useFetchAdvanced";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

function Reducer(state, action) {
  switch (action.type) {
    case "add-to-cart": {
      const existingProduct = state.find((item) => item.id === action.product.id);
      if (existingProduct) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.product, quantity: 1 }];
      }
    }

    case "remove-from-cart":
      return state.filter((item) => item.id !== action.id);

    case "descrease-quantity":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(Reducer, []);
  const { data: items, loading, error } = useFetchAdvanced(
    "https://fakestoreapi.com/products/"
  );

  const [optimisticCart, addOptimistic] = useOptimistic(cart, (state, newItem) => {
    const exist = state.find((p) => p.id === newItem.id);
    if (exist) {
      return state.map((p) =>
        p.id === newItem.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    return [...state, { ...newItem, quantity: 1 }];
  });

  const previousCart = usePrevious(cart);

  useEffect(() => {
    if (previousCart && previousCart !== cart) {
      console.log("Transaksi terakhir:", previousCart);
    }
  }, [cart, previousCart]);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // ✅ handle add pakai optimistic update
  const handleAddProduct = (item) => {
    addOptimistic(item); // langsung update UI
    setTimeout(() => {
      dispatch({ type: "add-to-cart", product: item }); // konfirmasi "server"
    }, 500);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <>
      <section className="cards">
        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} className="card-image" alt={item.title} />
            <h2 className="card-title">{item.title}</h2>
            <p className="card-description">{item.description}</p>
            <p className="card-price">${item.price}</p>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleAddProduct(item)}
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </section>

      <h2>Keranjang:</h2>
      {optimisticCart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <ul>
          {optimisticCart.map((item) => (
            <li key={item.id}>
              {item.title} - Rp {item.price.toLocaleString()} x {item.quantity}
              <button
                onClick={() =>
                  dispatch({ type: "descrease-quantity", id: item.id })
                }
                style={{ marginLeft: "10px" }}
              >
                -
              </button>
              <button
                onClick={() => handleAddProduct(item)}
                style={{ marginLeft: "5px" }}
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "remove-from-cart", id: item.id })
                }
                style={{ marginLeft: "5px", color: "red" }}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total Pembayaran: Rp {total.toLocaleString()}</h3>
    </>
  );
}

export default App;
