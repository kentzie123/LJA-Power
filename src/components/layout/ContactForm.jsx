// Hooks
import { useState, useRef, useEffect } from "react";

// reCAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// Stores
import { useContactStore } from "../../stores/useContactStore";

const ContactForm = () => {
  const form = useRef();
  const { sendEmail } = useContactStore();
  const [captchaValid, setCaptchaValid] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [contactForm, setContactForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Check if required fields are filled
  useEffect(() => {
    const { fullname, email, message } = contactForm;
    if (fullname && email && message) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
      setCaptchaValid(false);
    }
  }, [contactForm]);

  const handleCaptcha = (value) => {
    setCaptchaValid(!!value);
  };

  const sendEmailToLJA = (e, form) => {
    e.preventDefault();

    if (!captchaValid) {
      alert("Please verify that you are not a robot.");
      return;
    }

    sendEmail(form);
    setContactForm({
      fullname: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    setCaptchaValid(false);
    setShowCaptcha(false);
  };

  return (
    <form
      ref={form}
      onSubmit={(e) => sendEmailToLJA(e, form.current)}
      className="contact-form bg-[var(--panel-blue)] p-8 rounded-2xl"
    >
      <div className="space-y-4">
        {/* FULL NAME */}
        <div>
          <label htmlFor="fullname">FULLNAME *</label>
          <input
            value={contactForm.fullname}
            onChange={(e) =>
              setContactForm({ ...contactForm, fullname: e.target.value })
            }
            id="fullname"
            name="fullname"
            required
            type="text"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="email">EMAIL ADDRESS *</label>
          <input
            value={contactForm.email}
            onChange={(e) =>
              setContactForm({ ...contactForm, email: e.target.value })
            }
            id="email"
            name="email"
            required
            type="email"
          />
        </div>

        {/* PHONE */}
        <div>
          <label htmlFor="phone">PHONE NUMBER</label>
          <input
            value={contactForm.phone}
            onChange={(e) =>
              setContactForm({ ...contactForm, phone: e.target.value })
            }
            id="phone"
            name="phone"
            type="tel"
          />
        </div>

        {/* COMPANY */}
        <div>
          <label htmlFor="company">COMPANY NAME</label>
          <input
            value={contactForm.company}
            onChange={(e) =>
              setContactForm({ ...contactForm, company: e.target.value })
            }
            id="company"
            name="company"
            type="text"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label htmlFor="message">MESSAGE *</label>
          <textarea
            value={contactForm.message}
            onChange={(e) =>
              setContactForm({ ...contactForm, message: e.target.value })
            }
            className="!h-auto"
            name="message"
            id="message"
            rows={6}
            required
          ></textarea>
        </div>

        {/* reCAPTCHA - show only when required fields are filled */}
        {showCaptcha && (
          <div className="flex justify-center py-2 transition-all duration-300">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptcha}
              theme="dark"
            />
          </div>
        )}

        {/* BUTTON */}
        <button
          className="btn-yellow w-full cursor-pointer mt-2 disabled:opacity-50"
          disabled={!showCaptcha || !captchaValid}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
