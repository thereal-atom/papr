import './Footer.css';

import React from 'react';

const Footer = () => {
    return (
        <div class="footer__container">
      <div class="footer__links">
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>About Us</h2>
            <a href="/privacy">Privacy Policy</a> <a href="/testimonials">Testimonials</a>
            <a href="/terms">Terms</a>
          </div>
          <div class="footer__link--items">
            <h2>Support</h2>
            <a href="/">Feedback</a> <a href="/">Email</a>
            <a href="/">FAQ</a>
          </div>
        </div>
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>Account</h2>
            <a href="/trade">Trade</a> <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </div>
          <div class="footer__link--items">
            <h2>Socials</h2>
            <a href="/">Telephone</a> <a href="https://github.com/thereal-atom">Github</a>
            <a href="https://twitter.com/thereal_atom">Twitter</a>
          </div>
        </div>
      </div>
      <section class="social__media">
        <div class="social__media--wrap">
          <div class="footer__logo">
            <a href="/" id="footer__logo">papr</a>
          </div>
          <p class="website__rights">© papr 2021. All rights reserved</p>
          <div class="social__icons">
            <a href="/" class="social__icon--link" target="_blank"
              ><i class="fab fa-facebook"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-youtube"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-twitter"></i
            ></a>
          </div>
        </div>
      </section>
    </div>
    );
};

export default Footer;
