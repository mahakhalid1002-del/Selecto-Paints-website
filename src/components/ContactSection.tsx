import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const isPage = useLocation().pathname === '/contact';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const openMailApp = () => {
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const href = `mailto:info@selectopaints.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(4000),
      });

      if (res.ok) {
        setStatus({ type: "success", text: "Message sent. We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }
    } catch {
      // The mail server is unavailable, so the email app takes over below.
    } finally {
      setLoading(false);
    }

    openMailApp();
    setStatus({
      type: "success",
      text: "Your email app opened with this message. Press send there to reach Selecto Paints.",
    });
  };

  const fieldClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500";

  return (
    <section id="contact" className={`bg-gray-50 ${isPage ? 'pt-28 pb-10' : 'py-10 md:py-12'}`}>
      <div className="mx-auto max-w-4xl px-5">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-600 md:text-base">
            Have questions about our products? Need expert advice for your project?
            Our team is ready to assist you.
          </p>
        </div>

        <div className="mx-auto grid max-w-md gap-5 lg:max-w-none lg:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow-md">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="yourname@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your subject"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className={fieldClass}
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p
                  className={`text-center text-sm font-medium ${
                    status.type === "success" ? "text-green-700" : "text-red-600"
                  }`}
                  role="status"
                >
                  {status.text}
                </p>
              )}
            </form>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 via-white to-blue-50 p-5 text-center text-gray-800 shadow-md">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-6 top-4 h-16 w-16 rounded-full bg-blue-200 opacity-40 mix-blend-multiply blur-xl"></div>
              <div className="absolute right-6 top-16 h-20 w-20 rounded-full bg-pink-200 opacity-40 mix-blend-multiply blur-xl"></div>
              <div className="absolute bottom-6 left-10 h-16 w-16 rounded-full bg-purple-200 opacity-40 mix-blend-multiply blur-xl"></div>
            </div>

            <h3 className="relative mb-4 text-lg font-semibold">Contact Information</h3>

            <div className="relative space-y-4 text-sm leading-relaxed">
              <div>
                <MapPin className="mx-auto mb-1 h-5 w-5" />
                <h4 className="font-semibold">Our Location</h4>
                <p className="text-gray-600">Punjab, Pakistan</p>
              </div>

              <div>
                <Phone className="mx-auto mb-1 h-5 w-5" />
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">048 2150098</p>
                <p className="text-gray-600">Monday-Thursday, 9AM-5PM</p>
              </div>

              <div>
                <Mail className="mx-auto mb-1 h-5 w-5" />
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">info@selectopaints.com</p>
              </div>
            </div>

            <div className="relative mt-5 text-sm leading-relaxed">
              <h4 className="mb-1 font-semibold">Working Hours</h4>
              <p className="text-gray-600">Monday-Thursday, 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday-Sunday, 9:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Friday, closed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
