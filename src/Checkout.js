import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = ({ total, clearCart }) => {
  const handlePayment = () => {
    clearCart();  // Sepeti temizle
    alert('Ödeme başarıyla tamamlandı!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Ödeme Sayfası</h1>
      <h3>Toplam Tutar: {total} TL</h3>
      <button 
        onClick={handlePayment}
        style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
        Ödeme Yap
      </button>
      <Link to="/">
        <button 
          style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
          Ana Sayfaya Dön
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
