import { useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Smartphone, 
  Layers, 
  ArrowRight, 
  Mail, 
  Instagram,
  Menu,
  X,
  ExternalLink,
  Terminal,
  Database,
  Server,
  ChevronRight,
  MessageCircle
} from 'lucide-react';

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-brand-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-display font-bold text-brand-accent">{title}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert max-w-none text-white/70 leading-relaxed space-y-4">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter hover:text-brand-accent transition-colors">
          OVERSHIFT
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/70 hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand-accent text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-white transition-all duration-300"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-surface border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-white/70"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-brand-accent text-white px-5 py-3 rounded-xl text-center font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand-accent text-xs font-bold tracking-widest uppercase mb-6">
            Digital Excellence
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[0.9]">
            We Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white">
              Digital Solutions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Overshift specializes in crafting high-performance websites, scalable systems, and innovative applications that drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#portfolio" 
              className="group bg-brand-accent text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all duration-300"
            >
              View Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all"
            >
              Our Services
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-surface relative overflow-hidden">
      {/* Background Enhancements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Innovating the <br />
              <span className="text-white/40">Digital Landscape</span>
            </h2>
            <p className="text-lg text-white/60 mb-6 leading-relaxed">
              At Overshift, we don't just build software; we engineer experiences. Our team is dedicated to pushing the boundaries of what's possible in the digital realm.
            </p>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              We focus on three core pillars: <strong>Innovation</strong>, <strong>Efficiency</strong>, and <strong>Scalability</strong>. With over 90% of our clients satisfied with our solutions, we provide the technical foundation for your success, whether you're a startup or an enterprise.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-12 flex items-center justify-center relative group">
              {/* Abstract Tech Visual */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Hub */}
                <motion.div 
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(250,204,21,0.1)", "0 0 40px rgba(250,204,21,0.2)", "0 0 20px rgba(250,204,21,0.1)"] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-32 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center z-20 backdrop-blur-sm"
                >
                  <Layers className="w-12 h-12 text-brand-accent" />
                </motion.div>

                {/* Orbiting Icons */}
                {[
                  { Icon: Code2, delay: 0, x: -100, y: -80 },
                  { Icon: Database, delay: 1, x: 100, y: -60 },
                  { Icon: Server, delay: 2, x: 80, y: 100 },
                  { Icon: Terminal, delay: 3, x: -90, y: 70 },
                  { Icon: Globe, delay: 1.5, x: 0, y: -120 },
                  { Icon: Cpu, delay: 2.5, x: 0, y: 120 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      x: [item.x, item.x + 10, item.x],
                      y: [item.y, item.y - 10, item.y],
                    }}
                    transition={{ 
                      opacity: { duration: 1, delay: item.delay },
                      x: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md z-10"
                  >
                    <item.Icon className="w-6 h-6 text-white/40" />
                  </motion.div>
                ))}

                {/* Connecting Lines (Visual only) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <motion.circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(250,204,21,0.2)" strokeWidth="1" strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                  <motion.circle cx="50%" cy="50%" r="100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="10 10" animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
                </svg>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Website Development",
      description: "Custom, responsive websites built with modern frameworks for optimal performance and SEO.",
      icon: <Globe className="w-8 h-8" />,
      color: "from-brand-accent/10 to-white/5"
    },
    {
      title: "System Development",
      description: "Robust HRIS, Academic, Hospital, and Financial systems tailored to your specific business needs.",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-white/10 to-brand-accent/5"
    },
    {
      title: "Mobile & Web Apps",
      description: "High-performance applications for iOS, Android, and Web using React Native and modern web tech.",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-brand-accent/10 to-white/5"
    },
    {
      title: "Custom Software",
      description: "Bespoke software solutions designed to solve complex challenges and automate workflows.",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-white/10 to-brand-accent/5"
    }
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Our Expertise</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We provide comprehensive digital services to help your business thrive in the modern era.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-3xl bg-brand-surface border border-white/5 hover:border-brand-accent/30 transition-all duration-500 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-brand-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [showAll, setShowAll] = useState(false);
  const projects = [
    {
      title: "PGHNAI Sumatera Selatan",
      description: "A web application facilitating registration, payment, and reporting with integrated payment gateway (Midtrans) for membership in events and workshops for doctors, particularly the National Symposium of the Indonesian Association of Pediatric Gastroenterology, Hepatology, and Nutrition.",
      tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
      image: "https://i.ibb.co.com/zWK9M0H8/pghnai.png",
      link: null
    },
    {
      title: "GJS Client Dashboard",
      description: "A web application consisting of reports integrated from the GJS Security Patrol mobile application containing information and reports on security management and patrol monitoring.",
      tech: ["PHP", "Laravel", "Bootstrap", "PostgreSQL", "jQuery"],
      image: "https://i.ibb.co.com/LdQ5Rm1n/work-gjs-client.jpg",
      link: null
    },
    {
      title: "Next Hotel Yogyakarta",
      description: "A web for profiling Next Hotel with booking system.",
      tech: [],
      image: "https://plain-apac-prod-public.komododecks.com/202604/09/qWRYUjl8r7pxxgRrhmZk/image.png",
      link: "https://nexthotel.id/"
    },
    {
      title: "Villa App",
      description: "A web application for villa management with booking system and company profile.",
      tech: [],
      image: "https://pix10.agoda.net/hotelImages/26841533/0/39f50e4cf3a56c47e4ccfc854885a77e.jpg",
      link: null
    },
    {
      title: "CSUL Web Application",
      description: "Applications with features that are divided into various menus according to the needs of each department at CSULfinance.",
      tech: [".Net", "C#", "Bootstrap", "jQuery", "SQL"],
      image: "https://plain-apac-prod-public.komododecks.com/202604/09/egxa9MFEIy7dsWmKPYx1/image.png",
      link: null
    },
    {
      title: "KMK Digital Self Service",
      description: "Application for customers and suppliers in applying for Working Capital Credit (KMK) to CSULfinance. The approval process is done digitally and integrated with digital signature services.",
      tech: [".Net", "C#", "Bootstrap", "jQuery", "SQL", "API"],
      image: "https://plain-apac-prod-public.komododecks.com/202604/09/ZA2GY07lDeo6MVZ18GJE/image.png",
      link: null
    },
    {
      title: "HRServices",
      description: "Website Application created to manage all processes related to HR Department",
      tech: [".Net", "C#", "Bootstrap", "jQuery", "JavaScript", "SQL"],
      image: "https://irwansyah-dev.netlify.app/images/Hrservice.png",
      link: null
    },
    {
      title: "Sakti Application",
      description: "Application created to provide sub system and surrounding system to support Core Application",
      tech: ["Outsystems", "Low Code", "PostgreSQL", "API"],
      image: "https://irwansyah-dev.netlify.app/images/saktiapps.jpg",
      link: "https://sakti.csulfinance.com/CSULFoundation_Login/Login?RedirectURL=https%3A%2F%2Fsakti.csulfinance.com%2F"
    },
    {
      title: "Project Management",
      description: "Website Application created to manage project, change requests, milestones, and tasks related to company projects",
      tech: [".Net", "C#", "Bootstrap", "jQuery", "JavaScript", "SQL", "API"],
      image: "https://i.ibb.co.com/wNHymk0Y/project-management.jpg",
      link: "https://csuldev.csulfinance.com/ProjectManagement/"
    },
    {
      title: "PKBIDAI Sumatera Selatan",
      description: "A web application providing registration, payment, and reporting with integrated payment gateway (Midtrans) for workshops and symposiums",
      tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
      image: "https://porto-agenghermawan.vercel.app/images/pkbidai.png",
      link: null
    },
    {
      title: "Lido Music Art & Center",
      description: "Platform for managing music and art events including scheduling, registration, and monitoring dashboard",
      tech: [],
      image: "https://porto-agenghermawan.vercel.app/images/web-lmac.png",
      link: null
    },
    {
      title: "Maine Residence",
      description: "Company profile website with property portfolio and booking system",
      tech: [],
      image: "https://porto-agenghermawan.vercel.app/images/web-maine.png",
      link: null
    },
    {
      title: "Hello Kitchen",
      description: "Company profile with login system and online ordering feature",
      tech: [],
      image: "https://porto-agenghermawan.vercel.app/images/hellokitchen.png",
      link: null
    },
    {
      title: "Tssabes App",
      description: "Platform for Padepokan Silat Rajawali with member management and login system",
      tech: [],
      image: "https://porto-agenghermawan.vercel.app/images/tssabespicture.png",
      link: null
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 6);

  return (
    <section id="portfolio" className="py-24 bg-brand-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Work</h2>
            <p className="text-white/60 max-w-xl">
              A selection of our recent projects that showcase our commitment to quality and innovation.
            </p>
          </div>
          {!showAll && (
            <button 
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 text-brand-accent font-bold hover:text-white transition-colors"
            >
              View All Projects <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-brand-bg flex flex-col h-full"
              >
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent opacity-90" />
              <div className="relative p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech && project.tech.length > 0 && project.tech.map(t => (
                    <span key={t} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/60 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-auto">
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent hover:text-white transition-colors group/btn"
                    >
                      View Project <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-white/20 text-sm font-bold flex items-center gap-2">
                      Internal System <X className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {projects.length > 6 && !showAll && (
          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="bg-brand-accent text-black px-10 py-4 rounded-full font-bold hover:bg-white transition-all duration-300 shadow-lg shadow-brand-accent/20"
            >
              View Full Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const TechnologyCard = ({ name }: { name: string }) => {
  const getIcon = (tech: string) => {
    const mapping: Record<string, string> = {
      "HTML": "html5",
      "CSS": "css3",
      "JavaScript": "javascript",
      "TypeScript": "typescript",
      "jQuery": "jquery",
      "React JS": "react",
      "Next JS": "nextdotjs",
      "Vue JS": "vuedotjs",
      "Nuxt JS": "nuxtdotjs",
      "Angular": "angular",
      "Bootstrap": "bootstrap",
      "Tailwind CSS": "tailwindcss",
      "Laravel": "laravel",
      "C#": "csharp",
      "ASP .Net & ASP .Net Core": "dotnet",
      "VB .Net": "dotnet",
      "PostgreSQL": "postgresql",
      "MySQL": "mysql",
      "Redis": "redis",
      "Microsoft Flow": "microsoftpowerautomate",
      "Microsoft SharePoint": "microsoftsharepoint",
      "WhatsApp API": "whatsapp",
      "OpenStreetMap": "openstreetmap",
      "API Gateway (KONG)": "kong",
      "Swagger": "swagger",
      "Flutter": "flutter",
      "Outsystems (Low Code)": "outsystems",
      "Vite": "vite",
      "Docker": "docker",
      "Kubernetes": "kubernetes",
    };

    const slug = mapping[tech];
    if (slug) {
      return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`;
    }
    return null;
  };

  const iconUrl = getIcon(name);

  return (
    <motion.div
      whileHover={{ scale: 1.05, borderColor: "rgba(250, 204, 21, 0.5)" }}
      className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center p-3 transition-all group hover:shadow-[0_0_20px_rgba(250,204,21,0.1)] cursor-default"
    >
      <div className="relative w-8 h-8 mb-2 flex items-center justify-center">
        {iconUrl ? (
          <img 
            src={iconUrl} 
            alt={name} 
            className="w-full h-full opacity-40 group-hover:opacity-100 transition-opacity brightness-0 invert" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <Code2 className="w-full h-full opacity-20 group-hover:opacity-100 transition-opacity text-brand-accent" />
        )}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-tighter text-center line-clamp-2 opacity-30 group-hover:opacity-100 transition-opacity px-1">
        {name}
      </span>
    </motion.div>
  );
};

const Technologies = () => {
  const techGroups = [
    {
      title: "Core Web & Languages",
      techs: ["HTML", "CSS", "JavaScript", "TypeScript", "jQuery", "Ajax", "XML / JSON"]
    },
    {
      title: "Frameworks & UI",
      techs: ["React JS", "Next JS", "Vue JS", "Nuxt JS", "Angular", "Bootstrap", "Tailwind CSS", "Laravel"]
    },
    {
      title: "Enterprise & Backend",
      techs: ["C#", "ASP .Net & ASP .Net Core", "VB .Net", "SQL", "PostgreSQL", "MySQL", "Redis"]
    },
    {
      title: "Specialized Integrations",
      techs: ["OCR", "Biometrix & Biodata Verification", "Microsoft Flow", "Microsoft SharePoint", "WhatsApp API", "Online Payment", "OpenStreetMap", "SMS Gateway", "API Gateway (KONG)", "Digital Signature", "Swagger"]
    },
    {
      title: "Modern & Low Code",
      techs: ["Flutter", "Outsystems (Low Code)", "Vite", "Docker", "Kubernetes"]
    }
  ];

  return (
    <section id="technologies" className="py-24 border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            OUR TECHNOLOGIES.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 max-w-3xl mx-auto"
          >
            We master a wide range of technologies to provide the most efficient and scalable solutions for our clients.
          </motion.p>
        </div>

        <div className="space-y-12">
          {techGroups.map((group, groupIndex) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-6 flex items-center gap-4">
                {group.title}
                <div className="h-px bg-white/10 flex-1" />
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {group.techs.map((tech, techIndex) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (groupIndex * 0.1) + (techIndex * 0.02) }}
                  >
                    <TechnologyCard name={tech} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    {
      title: "Mobile Developer",
      description: "Experienced in building scalable and high-performance mobile applications.",
      link: "https://porto-agenghermawan.vercel.app/",
      icon: <Smartphone className="w-12 h-12 text-brand-accent" />
    },
    {
      title: "Backend Specialist",
      description: "Specializing in building robust, secure, and scalable backend systems.",
      link: "https://irwansyah-dev.netlify.app/",
      icon: <Cpu className="w-12 h-12 text-brand-accent" />
    }
  ];

  return (
    <section id="team" className="py-24 bg-brand-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 uppercase">OUR TEAM</h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Our team brings together experts with more than <span className="text-white font-semibold">5 years of experience</span> in system development, ensuring every project is built with industry-leading standards.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-accent text-black px-8 py-6 rounded-2xl flex flex-col items-center justify-center shadow-xl shadow-brand-accent/10"
          >
            <span className="text-5xl font-display font-black leading-none">5+</span>
            <span className="text-xs font-bold uppercase tracking-widest mt-2">Years Experience</span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <motion.a
              key={member.title}
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group block bg-brand-bg border border-white/10 p-10 rounded-3xl hover:border-brand-accent/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brand-accent/10 transition-colors" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {member.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-4">{member.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8">
                  {member.description}
                </p>
                
                <div className="flex items-center gap-2 text-brand-accent font-bold text-sm group-hover:gap-4 transition-all">
                  View Portfolio <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block py-1 px-4 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold tracking-widest uppercase mb-6">
                Let's Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Let's Build Something <br />
                <span className="text-brand-accent">Extraordinary</span>
              </h2>
              <p className="text-lg text-white/60 mb-10 leading-relaxed">
                Ready to start your digital transformation? Reach out to us and let's discuss how we can help your business grow.
              </p>

              {/* Highlight Message */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />
                <p className="text-white font-medium flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                  Free consultation with our team (online or offline – South Jakarta only)
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Mail className="text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">Email Us</p>
                    <p className="text-lg font-medium">dproject3321@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <MessageCircle className="text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-white/40 uppercase tracking-widest font-bold">WhatsApp</p>
                    <p className="text-lg font-medium">089509313931</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-brand-surface border border-white/10 p-10 rounded-3xl backdrop-blur-sm relative overflow-hidden"
          >
            <div className="relative z-10 text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold mb-4">Start a Conversation</h3>
              <p className="text-white/50 mb-10">Choose your preferred way to reach out. We're here to help you build your next big thing.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/6289509313931" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-accent text-black px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 shadow-lg shadow-brand-accent/10"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat via WhatsApp
                </a>
                <a 
                  href="mailto:dproject3321@gmail.com" 
                  className="flex-1 bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>
              
              <div className="mt-12 pt-12 border-t border-white/5 flex justify-center lg:justify-start gap-6">
                <a href="https://www.instagram.com/overshift.idn?igsh=cmw1b3lkdm5heGxx" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-accent transition-colors flex items-center gap-2">
                  <Instagram className="w-6 h-6" />
                  <span className="text-sm font-medium">overshift.idn</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onOpenPrivacy, onOpenTerms }: { onOpenPrivacy: () => void; onOpenTerms: () => void }) => {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-brand-bg border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.a 
              href="#" 
              className="inline-block group relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-brand-accent/20 blur-2xl rounded-full animate-pulse -z-10" />
              <img 
                src="https://i.ibb.co.com/Xk3pbhh5/Overshift-logo.jpg" 
                alt="Overshift Logo" 
                className="h-50 w-50 object-contain rounded-2xl shadow-2xl shadow-brand-accent/20 border border-white/10 transition-transform group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Overshift specializes in crafting high-performance websites, scalable systems, and innovative applications that drive business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-white/40 hover:text-brand-accent transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest mb-1">WhatsApp</p>
                <a href="https://wa.me/6289509313931" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-accent transition-colors text-sm">
                  089509313931
                </a>
              </li>
              <li>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest mb-1">Email</p>
                <a href="mailto:dproject3321@gmail.com" className="text-white/40 hover:text-brand-accent transition-colors text-sm">
                  dproject3321@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={onOpenPrivacy} className="text-white/40 hover:text-brand-accent transition-colors text-sm cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="text-white/40 hover:text-brand-accent transition-colors text-sm cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Overshift. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/overshift.idn?igsh=cmw1b3lkdm5heGxx" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-brand-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Technologies />
        <Team />
        <Contact />
      </main>
      <Footer 
        onOpenPrivacy={() => setActiveModal('privacy')} 
        onOpenTerms={() => setActiveModal('terms')} 
      />

      {/* Privacy Policy Modal */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Privacy Policy"
      >
        <p className="text-sm text-white/40 mb-4">Effective Date: {new Date().toLocaleDateString()}</p>
        <p>Overshift values your privacy. This Privacy Policy explains how we collect, use, and protect your information.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">Information We Collect</h4>
        <p>We may collect personal information such as your name, email address, and message when you fill out our contact form.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">How We Use Information</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Respond to inquiries</li>
          <li>Improve our services</li>
          <li>Communicate with clients</li>
        </ul>
        
        <h4 className="text-white font-bold mt-6 mb-2">Data Protection</h4>
        <p>We implement appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">Third-Party Services</h4>
        <p>We may use third-party tools or integrations, but we do not sell or share your personal data for marketing purposes.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">Cookies</h4>
        <p>Our website may use cookies to enhance user experience.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">Your Rights</h4>
        <p>You have the right to request access, correction, or deletion of your personal data.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">Contact</h4>
        <p>If you have any questions, please contact us through the website.</p>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Terms of Service"
      >
        <p>By accessing and using the Overshift website, you agree to the following terms:</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">1. Use of Website</h4>
        <p>You agree to use this website only for lawful purposes and not for any activity that may harm the website or its users.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">2. Services</h4>
        <p>Overshift provides digital services including website, system, and application development. All project agreements will be discussed separately with clients.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">3. Intellectual Property</h4>
        <p>All content on this website, including design, text, and graphics, is the property of Overshift and may not be copied without permission.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">4. Limitation of Liability</h4>
        <p>Overshift is not liable for any damages resulting from the use or inability to use this website.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">5. External Links</h4>
        <p>This website may contain links to third-party websites. We are not responsible for their content or policies.</p>
        
        <h4 className="text-white font-bold mt-6 mb-2">6. Changes to Terms</h4>
        <p>We may update these terms at any time without prior notice.</p>
      </Modal>
    </div>
  );
}
