import React from 'react';
import './Promo.css';

function Promo() {
  
    return (
      <section className="promo">
        <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className="promo__logo"/>
        <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a href="#about-project" className="promo__link">Узнать больше</a>
      </section>
    );
  };
  
  export default Promo;