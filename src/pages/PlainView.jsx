
import { projects, socialLinks, publications } from '../constants';
import { Link } from 'react-router-dom';
import { myimage } from '../assets/images';

const PlainView = () => {
    return (
        <div className="font-sans bg-white text-gray-900 min-h-screen w-full relative z-50 flex justify-center py-20 px-4 sm:px-8">
            {/* Return link styled consistently but placed at top */}
            <div className="absolute top-8 left-8">
                <Link to="/" className="text-purple-600 hover:text-purple-800 text-sm font-medium tracking-wide">
                    [ return to rich view ]
                </Link>
            </div>

            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 items-start mt-8">

                {/* Left Column: Image */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img
                        src={myimage}
                        alt="Arnav Singh"
                        className="w-full h-auto object-cover border border-gray-200 shadow-sm"
                    />
                </div>

                {/* Right Column: Content */}
                <div className="w-full md:w-2/3 flex flex-col gap-6">

                    <header>
                        <h1 className="text-4xl font-bold text-black mb-3">Arnav Singh</h1>

                        {/* Social Links matching reference [ github ] [ linkedin ] */}
                        <div className="flex flex-wrap gap-3 mb-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-800 font-medium tracking-tight"
                                >
                                    <span className="text-purple-500 mr-1">[</span>
                                    {link.name.toLowerCase()}
                                    <span className="text-purple-500 ml-1">]</span>
                                </a>
                            ))}
                        </div>

                        <p className="text-gray-600 mb-6">
                            Physics & CS @ Dartmouth College | ex. SWE @ PlayStation
                        </p>

                        <p className="text-gray-800 leading-relaxed text-sm">
                            Hey! I'm Arnav, a student at Dartmouth College studying Physics, Mathematics, and Computer Science.
                            I am interested in research, more specifically in space physics models, AI,
                            and creating cool software. I love building high-performance systems, algorithms, and dynamic user interfaces.
                        </p>
                    </header>

                    {/* Publications Section */}
                    <section className="mt-4">
                        <h2 className="text-black font-bold mb-3 tracking-wide">
                            [ publications ]
                        </h2>
                        <div className="flex flex-col gap-1">
                            {publications.map((pub, index) => (
                                <div key={index} className="flex flex-col mb-2">
                                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                                        {pub.name}
                                    </a>
                                    <p className="text-gray-500 text-xs mt-1">{pub.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section className="mt-4">
                        <h2 className="text-black font-bold mb-3 tracking-wide">
                            [ projects ]
                        </h2>
                        <div className="flex flex-col gap-2">
                            {projects.map((proj, index) => (
                                <Link
                                    key={index}
                                    to={proj.link}
                                    target={proj.link.startsWith('http') ? '_blank' : undefined}
                                    rel={proj.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="text-purple-600 hover:text-purple-800 font-medium text-sm block"
                                >
                                    {proj.name}
                                </Link>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PlainView;
