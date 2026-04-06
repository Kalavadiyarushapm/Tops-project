import React, { useState } from "react";
import { motion } from "framer-motion";

import about_hero from "../src/assets/img/about-hero.svg";
import fastdelevery from "../src/assets/img/service-delivery.webp";
import easy_returns from "../src/assets/img/service-returns.jpg";
import best_deals from "../src/assets/img/service-deals.jpg";
import service_support from "../src/assets/img/service-support.webp";

 
 
export default function About() {
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      {/* ================= HERO ================= */}
 
<section className="about-hero">
  <div className="container">
    <div className="row align-items-center">
      
      <div className="col-lg-6">
        <div className="about-hero-glass">
          <h1>About Us</h1>
          <p>
            We deliver quality products with trust, simplicity,
            and customer-first thinking at the core of everything we do.
          </p>

          <button className="hero-cta">
            Explore More
          </button>
        </div>
      </div>

      <div className="col-lg-6 text-center">
        <img
          src={about_hero}
          alt="About Hero"
          className="img-fluid about-hero-img"
        />
      </div>

    </div>
  </div>
</section>


      {/* ================= COMPANY STATS ================= */}
    <section className="stats-section">
  <div className="container py-5">
    <motion.div
      className="row text-center g-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        ["10+", "Years Experience"],
        ["25K+", "Happy Customers"],
        ["500+", "Products"],
        ["24/7", "Support"],
      ].map(([value, label]) => (
        <motion.div
          key={label}
          className="col-6 col-md-3"
          variants={fadeUp}
        >
          <div className="stats-glass-card">
            <h2 className="stats-value">{value}</h2>
            <p className="stats-label">{label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


    {/* ================= JOURNEY ================= */}
<section className="journey-section">
  <div className="container py-5">
    <div className="text-center pb-4">
      <h2 className="fw-bold">Our Journey</h2>
      <p className="text-muted">
        Key milestones that shaped our growth
      </p>
    </div>

    <motion.div
      className="row g-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[
        ["2018", "Founded with a vision for quality ecommerce"],
        ["2020", "Reached 10,000+ customers"],
        ["2022", "Expanded nationwide delivery"],
        ["2024", "Serving global brands & partners"],
      ].map(([year, text]) => (
        <motion.div
          key={year}
          className="col-md-6 col-lg-3"
          variants={fadeUp}
        >
          <div className="journey-glass-card h-100 text-center">
            <h5 className="journey-year">{year}</h5>
            <p className="journey-text">{text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


      {/* ================= SERVICES (NO FRAMER MOTION) ================= */}
      <section className="container py-5">
        <div className="text-center pb-4">
          <h2 className="fw-bold">Our Services</h2>
          <p className="text-muted">
            Designed for a seamless shopping experience
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              icon: "fa-truck",
              title: "Fast Delivery",
              desc: "Quick and reliable shipping worldwide",
              bg: fastdelevery,
            },
            {
              icon: "fa-exchange-alt",
              title: "Easy Returns",
              desc: "Hassle-free returns within 30 days",
              bg: easy_returns,
            },
            {
              icon: "fa-percent",
              title: "Best Deals",
              desc: "Exclusive offers and discounts",
              bg:best_deals,
            },
            {
              icon: "fa-user-clock",
              title: "24/7 Support",
              desc: "Always here to help you",
              bg: service_support,
            },
          ].map((service, index) => {

          const isActive = hoveredIndex === index;
             return (
            <div key={service.title} className="col-md-6 col-lg-3">
             <div
        className={`service-card ${isActive ? "active" : ""}`}
        style={{
          backgroundImage: `url(${service.bg})`,
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="service-overlay">
          <i className={`fa ${service.icon}`} />
          <h5 className="fw-bold mt-2">{service.title}</h5>
          <p className="small mb-0">{service.desc}</p>
        </div>
      </div>
            </div>
                )})}
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center pb-4">
            <h2 className="fw-bold">Our Team</h2>
            <p className="text-muted">
              Passionate people behind our success
            </p>
          </div>

          <motion.div
            className="row g-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              ["https://tse2.mm.bing.net/th/id/OIP.HpVkXgdVfYtkaTOMTL8Y1wHaLH?pid=Api&P=0&h=180", "John Doe", "Founder"],
              ["https://static.vecteezy.com/system/resources/previews/024/354/252/non_2x/businessman-isolated-illustration-ai-generative-free-photo.jpg", "Jane Smith", "Marketing"],
              ["https://images.unsplash.com/photo-1610088441520-4352457e7095?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D", "David Lee", "Operations"],
              ["https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_1280.jpg", "Sarah Khan", "Support"],
            ].map(([img, name, role]) => (
              <motion.div
                key={name}
                className="col-sm-6 col-lg-3"
                variants={fadeUp}
              >
                <div className="card border-0 shadow text-center h-100 align-items-center p-3">
                  <img
                    src={`${img}`}
                    className="team-logo rounded-circle m-3"
                    alt={name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h6 className="fw-bold mb-1">{name}</h6>
                    <p className="text-muted small">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-success py-5 text-center">
        <motion.div
          className="container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-white fw-bold mb-3">
            Ready to start shopping?
          </h2>
          <a href="/shop" className="btn btn-light btn-lg">
            Explore Products
          </a>
        </motion.div>
      </section>
    </>
  );
}
