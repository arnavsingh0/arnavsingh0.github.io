import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import RoverDoor from "../components/RoverDoor";
import Transit from "../components/Transit";
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

const FIGURES = {
  "Olympic Medal Prediction": { stat: "82%", note: "accuracy" },
  Nuggets: { stat: "#1", note: "ranked" },
  "AWS Cloud Security": { stat: "WAF · Shield · Cognito", note: "the stack", compact: true },
};

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
  const [scrolled, setScrolled] = useState(false);
  const rover = projects.find((project) => project.link === "/lunar-rover");
  const otherProjects = projects.filter((project) => project !== rover);

  useEffect(() => {
    document.title = "Arnav Singh";
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
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
          <a
            href="#top"
            className={scrolled ? "brand is-visible" : "brand"}
            aria-hidden={scrolled ? undefined : true}
            tabIndex={scrolled ? 0 : -1}
          >
            Arnav Singh
          </a>
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
        <div className="opening" id="top">
          <div className="hero">
            <div className="hero-name">
              <h1>Arnav Singh</h1>
              <p className="role">{profile.role}</p>
            </div>
            <div className="hero-copy">
              <p>{profile.lede}</p>
              <p>
                I was born in <em>Singapore</em>, and grew up between <em>Ireland</em> and{" "}
                <em>upstate New York</em>. Three different skies. I still look up.
              </p>
            </div>
            <figure className="hero-photo">
              <img src={portrait.src} alt={portrait.alt} width="400" height="400" />
              <figcaption>Outside a telescope dome.</figcaption>
            </figure>
          </div>
          <Transit />
          <blockquote className="epigraph epigraph-after">
            <p>{profile.quote.text}</p>
            <footer>
              <cite>{profile.quote.cite}</cite>
            </footer>
          </blockquote>
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
          <p className="lead">
            A console company, an observatory, a NASA lab, a few months of consulting, and a lot of office hours.
          </p>
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
          <p className="lead">
            Photometry of cataclysmic variable stars, and machine-learning models of Earth&apos;s magnetosphere.
          </p>
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
          <RoverDoor />
          <div className="pieces">
            {otherProjects.map((project) => {
              const figure = FIGURES[project.name];
              return (
                <article className="piece" key={project.name}>
                  {figure && (
                    <p className={figure.compact ? "stat stat-compact" : "stat"}>
                      {figure.stat}
                      <span>{figure.note}</span>
                    </p>
                  )}
                  <h3>
                    <EntryLink href={project.link}>{project.name}</EntryLink>
                  </h3>
                  <p className="desc">{project.description}</p>
                  <p className="meta">{project.tags.join(" · ")}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading">
          <h2 id="contact-heading">Contact</h2>
          <p className="lead">For a research question, a class, or a project, write to me.</p>
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
