import { useRef, useState } from "react";
import useAlert from "../hooks/useAlert";
import Alert from "./Alert";

const ContactForm = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      showAlert({
        show: true,
        text: "The form is not set up in this environment. LinkedIn is the reliable way to reach me.",
        type: "danger",
      });
      return;
    }

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          title: form.email,
          message: form.message,
        },
        publicKey
      );
      showAlert({
        show: true,
        text: "Thank you. I have your message.",
        type: "success",
      });
      setForm({ name: "", email: "", message: "" });
      window.setTimeout(() => hideAlert(), 4000);
    } catch (error) {
      console.error(error);
      showAlert({
        show: true,
        text: "The message did not send. Please try again, or use LinkedIn.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {alert.show && <Alert {...alert} />}
      <form ref={formRef} className="form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="5"
            required
            value={form.message}
            onChange={handleChange}
          />
        </label>
        <button className="send" type="submit" disabled={loading}>
          {loading ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
