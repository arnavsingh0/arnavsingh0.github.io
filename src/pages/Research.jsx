const Research = () => {
  const researchProjects = [
    {
      title: 'Modeling the Earth\'s Magnetosphere',
      description: 'Developing statistical models to predict magnetospheric boundaries using neural networks and machine learning techniques.',
      imageUrl: 'https://example.com/magnetosphere.jpg',
      link: 'https://github.com/arnavsingh0/OCB_modeling',
    },
    {
      title: 'Machine Learning in Space Physics',
      description: 'Applied machine learning algorithms to solve complex problems in space physics, focusing on plasma dynamics and satellite data analysis.',
      imageUrl: 'https://example.com/space-ml.jpg',
      link: '#',
    },
    {
      title: 'The Future . . .',
      description: 'More research projects coming soon! Stay tuned for updates on my latest research endeavors.',
      imageUrl: 'https://example.com/rocket.jpg',
      link: 'https://github.com/arnavsingh0',
    },
    // Adding more research in the future
  ];

  return (
    <section id="research" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">Research</h2>

        {/* Research Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchProjects.map((project, index) => (
            <div
              key={index}
              className="research-card bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-indigo-400 hover:text-indigo-600 transition-colors duration-300"
              >
                Learn More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Research;