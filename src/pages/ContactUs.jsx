import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.name.trim()) {
      err.name = 'Name is required.';
    }
    if (!form.email.trim()) {
      err.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = 'Email is invalid.';
    }
    if (!form.subject.trim()) {
      err.subject = 'Subject is required.';
    }
    if (!form.message.trim()) {
      err.message = 'Message is required.';
    }
    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted', form);
      setSubmitted(true);
      // Reset form after submission if needed
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div className="contact-page">
      <h1 className="section-title">Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email address"
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter subject"
            required
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your message"
            required
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>
        <button type="submit" className="cta-button">
          Send Message
        </button>
        {submitted && <p className="success-message">Thank you for contacting us!</p>}
      </form>
    </div>
  );
};

export default ContactUs;