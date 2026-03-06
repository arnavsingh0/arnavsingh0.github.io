import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";

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
    <section id="contact" className='relative z-10 text-white min-h-screen py-20'>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full bg-black/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl shadow-blue-900/20"
        >
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 animate-pulse"></div>
              </div>
              <p className="font-mono text-xs text-gray-400 tracking-widest ml-4 hidden sm:block">
                VANGUARD OS v2.0 // COMMUNICATIONS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
              <p className="font-mono text-xs text-blue-400 tracking-widest">UPLINK_READY</p>
            </div>
          </div>

          <div className="flex lg:flex-row flex-col">
            {/* Form Content */}
            <div className="flex-1 p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-white/5 relative">
              {alert.show && (
                <div className="absolute top-0 left-0 w-full z-50">
                  <Alert {...alert} />
                </div>
              )}

              <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500'>
                Establish Comm Link
              </h1>
              <p className='text-gray-400 mb-10 text-lg'>
                Looking to add a new rover to your fleet, have a mission in mind, or just want to transmit a signal? I'm ready to receive your telemetry!
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
                    className='bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none'
                    placeholder='Enter pilot designation...'
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
                    className='bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none'
                    placeholder='Ex. commander@vanguard.os'
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
                    className='bg-black/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none'
                    placeholder='Transmit your mission parameters...'
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
                  className='btn font-mono bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 w-full sm:w-auto mt-4'
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  {loading ? "TRANSMITTING..." : "SEND_TRANSMISSION"}
                </button>
              </form>
            </div>

            {/* 3D Canvas */}
            <div className='lg:w-1/2 w-full h-[400px] md:h-[550px] lg:h-auto relative overflow-hidden bg-black/40'>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none z-0"></div>

              {/* Radar Grid overlay */}
              <div className="absolute inset-0 border border-blue-500/10 rounded-full w-[150%] h-[150%] -top-[25%] -left-[25%] pointer-events-none opacity-20"></div>
              <div className="absolute inset-0 border border-blue-500/10 rounded-full w-[100%] h-[100%] top-0 left-0 pointer-events-none opacity-20"></div>
              <div className="absolute inset-0 w-px h-full bg-blue-500/10 left-1/2 pointer-events-none"></div>
              <div className="absolute inset-0 h-px w-full bg-blue-500/10 top-1/2 pointer-events-none"></div>

              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                <p className="font-mono text-[10px] text-green-500 tracking-widest">RADAR_ACTIVE</p>
              </div>

              <Canvas
                dpr={[1, 2]}
                camera={{
                  position: [0, 0, 5],
                  fov: 75,
                  near: 0.1,
                  far: 1000,
                }}
                className="z-10 relative"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
