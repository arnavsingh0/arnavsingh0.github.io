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
  const [isRotating, setIsRotating] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setIsRotating(true);
  const handleBlur = () => setIsRotating(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsRotating(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      showAlert({
        show: true,
        text: "EmailJS environment variables are missing!",
        type: "danger",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          name: form.name,
          title: form.email,
          message: form.message,
        },
        publicKey
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
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      ).finally(() => {
        setIsRotating(false);
      });
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
          className='w-full flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='font-semibold text-gray-300 mb-2'>Name</span>
            <input
              type='text'
              name='name'
              className='bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1d1836_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white'
              placeholder='Who’s the preferred frame of reference?'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='flex flex-col'>
            <span className='font-semibold text-gray-300 mb-2'>Email</span>
            <input
              type='email'
              name='email'
              className='bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1d1836_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white'
              placeholder='Ex. noether.symmetry@lagrangian.io'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='flex flex-col'>
            <span className='font-semibold text-gray-300 mb-2'>Message</span>
            <textarea
              name='message'
              rows='4'
              className='bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none [&:-webkit-autofill]:shadow-[0_0_0_1000px_#1d1836_inset] [&:-webkit-autofill]:text-white [&:-webkit-autofill]:-webkit-text-fill-color-white'
              placeholder='Type your message; boundary conditions may apply...'
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='btn bg-gradient-to-r from-blue-500 to-purple-600 border-none text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px] relative overflow-hidden'>
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
              isRotating={isRotating}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[.1, .1, .1]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
