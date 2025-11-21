import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Rocket } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";


const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Arnav Singh",
          from_email: form.email,
          to_email: "arnav.singh.26@dartmouth.edu",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section id="contact" className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col justify-center p-10'>
        <h1 className='head-text mb-4'>Get in Touch</h1>
        <p className='text-gray-400 mb-10 text-lg'>
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-8'
        >
          <div className="relative group">
            <input
              type='text'
              name='name'
              className='w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300 peer'
              placeholder=' '
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label className='absolute left-0 top-3 text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-400 pointer-events-none'>
              Name
            </label>
          </div>

          <div className="relative group">
            <input
              type='email'
              name='email'
              className='w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300 peer'
              placeholder=' '
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label className='absolute left-0 top-3 text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-400 pointer-events-none'>
              Email
            </label>
          </div>

          <div className="relative group">
            <textarea
              name='message'
              rows='4'
              className='w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300 peer resize-none'
              placeholder=' '
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <label className='absolute left-0 top-3 text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500 peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:text-gray-400 pointer-events-none'>
              Message
            </label>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='btn mt-4 self-start'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] relative'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />

          <Suspense fallback={<Loader />}>
            <Rocket
              currentAnimation={currentAnimation}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
