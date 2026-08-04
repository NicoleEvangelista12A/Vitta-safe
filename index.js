import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="text-content">
        <p className="sub-headline">HACKING THE CELL</p>
        <h1 className="headline">Creating a<br />Biocomputer</h1>
        <button className="cta-button">LEARN MORE</button>
      </div>
      
      <div className="visual-element">
        <div className="bio-art-shader"></div>
      </div>
      
      <div className="pagination">
        <span className="active">01</span> / 02
      </div>
    </section>
  );
};

export default Hero;