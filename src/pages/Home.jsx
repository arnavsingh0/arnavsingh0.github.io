import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import {
  education,
  experiences,
  portrait,
  profile,
  projects,
  publications,
  socialLinks,
  toolGroups,
} from "../constants";

const NAV = [
  { id: "study", label: "Study" },
  { id: "work", label: "Work" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const isExternal = (href) => href.startsWith("http");

const EntryLink = ({ href, children }) => {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return <Link to={href}>{children}</Link>;
};

const Home = () => {
  const [active, setActive] = useState("study");

  useEffect(() => {
    document.title = "Arnav Singh";
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView();
  }, []);

  useEffect(() => {
    const sections = NAV.map(({ id }) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <h1>
              <a href="#top">Arnav Singh</a>
            </h1>
            <p className="brand-role">{profile.role}</p>
          </div>
          <nav className="site-nav" aria-label="On this page">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="content" className="page">
        <div id="top" className="intro">
          <img className="portrait" src={portrait.src} alt={portrait.alt} width="400" height="400" />
          <div>
            {profile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="epigraph">
              <p>{profile.quote.text}</p>
              <footer>
                <cite>{profile.quote.cite}</cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <section id="study" aria-labelledby="study-heading">
          <h2 id="study-heading">Study</h2>
          <div className="entries">
            <article className="entry">
              <p className="when">{education.when}</p>
              <div>
                <h3>{education.school}</h3>
                <p className="where">{education.degree}</p>
                <p className="desc">{education.detail}</p>
              </div>
            </article>
          </div>
          <h3 className="subhead">Languages and tools</h3>
          {toolGroups.map((group) => (
            <p className="note" key={group.label}>
              <strong>{group.label}. </strong>
              {group.items}
            </p>
          ))}
        </section>

        <section id="work" aria-labelledby="work-heading">
          <h2 id="work-heading">Work</h2>
          <div className="entries">
            {experiences.map((item) => (
              <article className="entry" key={`${item.company}-${item.duration}`}>
                <p className="when">{item.duration}</p>
                <div>
                  <h3>{item.role}</h3>
                  <p className="where">{item.company}</p>
                  <p className="desc">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" aria-labelledby="research-heading">
          <h2 id="research-heading">Research</h2>
          <div className="entries">
            {publications.map((paper) => (
              <article className="entry solo" key={paper.name}>
                <div>
                  <h3>
                    <EntryLink href={paper.link}>{paper.name}</EntryLink>
                  </h3>
                  <p className="desc">{paper.description}</p>
                  <p className="meta">{paper.tags.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-heading">
          <h2 id="projects-heading">Projects</h2>
          <div className="entries">
            {projects.map((project) => (
              <article className="entry solo" key={project.name}>
                <div>
                  <h3>
                    <EntryLink href={project.link}>{project.name}</EntryLink>
                  </h3>
                  <p className="desc">{project.description}</p>
                  <p className="meta">{project.tags.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p className="contact-note">
            For a research question, a class, or a project, write here or on LinkedIn.
          </p>
          <ul className="contact-links">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a href={link.link} target="_blank" rel="noopener noreferrer">
                  {link.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>© {new Date().getFullYear()} Arnav Singh</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
