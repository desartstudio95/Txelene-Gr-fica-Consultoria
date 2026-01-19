import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, Printer, PenTool, Layers, Zap, Instagram, Facebook, Mail, Phone, MapPin, ChevronRight, ChevronUp, Send, CheckCircle, ArrowRight, Target, Eye, Diamond, Check, Clock, ShieldCheck, FileCheck, Wallet, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// --- Types ---

interface TxeleneLogoProps {
  className?: string;
  style?: React.CSSProperties;
  lightMode?: boolean;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  image: string;
}

interface StatProps {
  number: string;
  label: string;
  color: string;
}

interface ContactItemProps {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: React.ReactNode;
  href?: string;
}

interface SocialIconProps {
  icon: React.ReactNode;
  color?: string;
  href?: string;
}

interface NavigateProps {
  navigate: (page: string) => void;
}

// --- Components ---

const TxeleneLogo: React.FC<TxeleneLogoProps> = ({ className = "", style = {}, lightMode = false }) => (
  <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none', ...style }}>
    {/* CMYK Icon SVG */}
    <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      {/* Top Left - Yellow */}
      <path d="M50 50L0 50A50 50 0 0 1 50 0V50Z" fill="#FFF200"/>
      {/* Top Right - Magenta */}
      <path d="M50 50V0A50 50 0 0 1 100 50H50Z" fill="#EC008C"/>
      {/* Bottom Left - Cyan */}
      <path d="M50 50H0A50 50 0 0 0 50 100V50Z" fill="#00AEEF"/>
      {/* Center - Black */}
      <circle cx="50" cy="50" r="22" fill="#1A1A1A"/>
    </svg>
    
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, justifyContent: 'center' }}>
      <span style={{ 
        fontFamily: 'Outfit, sans-serif', 
        fontSize: '1.6rem', 
        fontWeight: 900, 
        color: lightMode ? '#ffffff' : '#1A1A1A',
        letterSpacing: '-0.02em'
      }}>
        TXELENE
      </span>
      <span className="hidden-mobile-xs" style={{ 
        fontFamily: 'Inter, sans-serif', 
        fontSize: '0.4rem', 
        fontWeight: 700, 
        color: lightMode ? 'rgba(255,255,255,0.7)' : '#1A1A1A',
        letterSpacing: '0.02em',
        marginTop: '3px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap'
      }}>
        Investimentos, Lda | Gráfica e Serigrafia
      </span>
    </div>
  </div>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.link/e9tm22"
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-button"
    title="Fale connosco no WhatsApp"
    style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      width: '60px',
      height: '60px',
      backgroundColor: '#25D366',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      textDecoration: 'none',
    }}
  >
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  </a>
);

// --- Subcomponents Definitions (Moved up for clarity in TS) ---

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, iconBg, title, desc, image }) => (
  <div className="hover-lift service-card" style={{ 
    background: '#fff', 
    borderRadius: '20px', 
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    border: '1px solid transparent',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }}
  >
    {/* Image Container */}
    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={image} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          loading="lazy"
        />
        <div style={{ 
            position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' 
        }} />
    </div>

    <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div className="service-icon" style={{ 
            width: '60px', 
            height: '60px', 
            background: iconBg, 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: '-60px',
            marginBottom: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
            zIndex: 2,
            position: 'relative'
        }}>
        {icon}
        </div>
        <h3 style={{ marginBottom: '15px', fontSize: '1.4rem', color: 'var(--text-main)' }}>{title}</h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: 1.7 }}>{desc}</p>
    </div>
  </div>
);

const ContactItem: React.FC<ContactItemProps> = ({ icon, bg, label, value, href }) => {
  const content = (
    <>
      <div style={{ background: bg, padding: '15px', borderRadius: '50%' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{value}</div>
      </div>
    </>
  );

  const style: React.CSSProperties = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    marginBottom: '30px',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '15px',
    transition: 'background 0.3s ease',
    textDecoration: 'none',
    color: 'inherit'
  };

  if (href) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover-scale" 
        style={style}
        onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
      >
        {content}
      </a>
    );
  }

  return (
    <div 
      className="hover-scale" 
      style={style}
      onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      {content}
    </div>
  );
};

const SocialIcon: React.FC<SocialIconProps> = ({ icon, color, href = "#" }) => (
  <a href={href} 
     target={href !== "#" ? "_blank" : undefined}
     rel={href !== "#" ? "noopener noreferrer" : undefined}
     style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '50px', 
    height: '50px', 
    background: '#f0f0f0', 
    borderRadius: '50%', 
    color: '#333',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = color || '#333';
    e.currentTarget.style.color = '#fff';
    e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = '#f0f0f0';
    e.currentTarget.style.color = '#333';
    e.currentTarget.style.transform = 'translateY(0) scale(1)';
  }}
  >
    {icon}
  </a>
);

// --- Page Components ---

const Home: React.FC<NavigateProps> = ({ navigate }) => (
  <section className="fade-in section-home" style={{ 
    minHeight: '85vh', 
    display: 'flex', 
    alignItems: 'center', 
    position: 'relative',
    paddingTop: '80px',
    paddingBottom: '40px',
    overflow: 'hidden'
  }}>
    {/* Dynamic Background FX */}
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
       {/* CMYK Floating Shapes */}
       <div className="floating-shape" style={{ 
         top: '10%', left: '5%', 
         width: '400px', height: '400px', 
         background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, rgba(255,255,255,0) 70%)', 
         animation: 'float-slow 8s ease-in-out infinite' 
       }}></div>
       <div className="floating-shape" style={{ 
         bottom: '20%', right: '5%', 
         width: '350px', height: '350px', 
         background: 'radial-gradient(circle, rgba(255,0,128,0.12) 0%, rgba(255,255,255,0) 70%)', 
         animation: 'float-fast 6s ease-in-out infinite reverse' 
       }}></div>
       <div className="floating-shape" style={{ 
         top: '30%', left: '40%', 
         width: '300px', height: '300px', 
         background: 'radial-gradient(circle, rgba(255,204,0,0.12) 0%, rgba(255,255,255,0) 70%)', 
         animation: 'float-slow 10s ease-in-out infinite 2s' 
       }}></div>
    </div>

    <div className="container" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', 
      gap: 'clamp(40px, 5vw, 80px)', 
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="home-content">
        <div className="hero-badge stagger-1" style={{ 
          display: 'inline-block', 
          padding: '8px 16px', 
          background: 'rgba(0, 102, 255, 0.1)',
          borderRadius: '30px', 
          color: 'var(--primary)', 
          marginBottom: '25px',
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '1px',
          cursor: 'default',
          border: '1px solid rgba(0, 102, 255, 0.2)'
        }}>
          GRÁFICA & SERIGRAFIA PROFISSIONAL
        </div>
        <h1 className="stagger-2" style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
          lineHeight: 1.1, 
          marginBottom: '25px',
          color: '#111'
        }}>
          Dê <span className="text-gradient">cor</span> e <span className="text-gradient" style={{ animationDelay: '1s' }}>visibilidade</span> <br />
          <span style={{ color: 'var(--primary)' }}>à sua marca</span>
        </h1>
        <p className="stagger-3" style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.2rem)', 
          color: 'var(--text-dim)', 
          marginBottom: '40px', 
          maxWidth: '520px',
          lineHeight: 1.6
        }}>
          Da serigrafia têxtil à impressão de grandes formatos, a Txelene entrega qualidade excepcional e durabilidade para a sua identidade visual.
        </p>
        <div className="stagger-4" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('contact')}>
            Pedir Orçamento <ArrowRight size={18} />
          </button>
          <button className="btn-secondary" onClick={() => navigate('services')}>
            Nossos Serviços
          </button>
        </div>
      </div>
      
      <div className="stagger-3" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '600px',
          aspectRatio: '1.4/1',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            {/* Decorative Gradient Circles */}
            <div style={{ width: '60%', height: '60%', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', top: '10%', right: '10%', opacity: 0.1, animation: 'float 6s ease-in-out infinite' }}></div>
            <div style={{ width: '50%', height: '50%', borderRadius: '50%', background: 'var(--secondary)', position: 'absolute', bottom: '15%', left: '15%', opacity: 0.1, animation: 'float 7s ease-in-out infinite 1s' }}></div>
            
            {/* Image Wrapper */}
            <div className="hover-lift hero-image-wrapper" style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              background: '#fff',
              borderRadius: '30px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.03)',
              cursor: 'pointer'
            }}>
              <img 
                src="https://txelene.co.mz/wp-content/uploads/2025/05/Gazebo_Mockup_1-1536x1114.png" 
                alt="Gazebo Mockup Txelene"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              
              {/* Floating Glass Badges - Hidden on very small screens */}
              <div className="hidden-mobile-xs glass-badge" style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '10px 18px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.4)',
                animation: 'float-fast 4s ease-in-out infinite'
              }}>
                <CheckCircle size={16} color="var(--primary)" />
                Qualidade Premium
              </div>

              <div className="hidden-mobile-xs glass-badge" style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '10px 18px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.4)',
                animation: 'float-slow 5s ease-in-out infinite 1s'
              }}>
                <div style={{ width: '10px', height: '10px', background: 'var(--secondary)', borderRadius: '50%' }}></div>
                Eventos & Branding
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section className="fade-in section-padding" style={{ minHeight: '80vh' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
         <h2 className="section-title">O Que Fazemos</h2>
         <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-dim)', fontSize: '1.1rem' }}>
           Oferecemos uma gama completa de serviços de impressão e design para elevar a sua marca ao próximo nível.
         </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', 
        gap: '30px',
      }}>
        <ServiceCard 
          icon={<Printer size={32} color="white" />}
          iconBg="var(--primary)"
          title="Impressão Digital"
          desc="Alta resolução para pequenos e grandes formatos. Banners, vinil, cartazes, outdoors e papelaria corporativa completa com cores vivas e precisas."
          image="https://i.ibb.co/931r0k1R/Whisk-4533b9ec892548097a147e15dd3d9cfddr.png"
        />
          <ServiceCard 
          icon={<Layers size={32} color="white" />}
          iconBg="var(--secondary)"
          title="Serigrafia"
          desc="A técnica ideal para grandes tiragens. Garantimos durabilidade extrema em têxteis, uniformes, sacolas e brindes promocionais."
          image="https://i.ibb.co/fjXrrm9/Whisk-9307ceaa572f2b0ab4b48c9cba9ab565dr.png"
        />
          <ServiceCard 
          icon={<Zap size={32} color="var(--text-main)" />}
          iconBg="var(--accent)"
          title="Estampagem & Sublimação"
          desc="Personalização rápida e vibrante para canecas, t-shirts de poliéster, bonés e artigos desportivos. Sem limite de cores."
          image="https://i.ibb.co/XkZjxHzD/Whisk-29bbefa52e5ac7c871f4409ade4a19ebdr.png"
        />
          <ServiceCard 
          icon={<PenTool size={32} color="white" />}
          iconBg="#111"
          title="Design Gráfico"
          desc="Nossa equipa criativa desenvolve a sua identidade visual, logotipos e prepara todas as artes finais tecnicamente para uma impressão perfeita."
          image="https://i.ibb.co/Y4d7QBJf/Whisk-60191cf8788bf52b3ad4c8d7584128a1dr.png"
        />
      </div>
    </div>
  </section>
);

const About = () => (
  <section className="fade-in section-padding" style={{ minHeight: '80vh' }}>
    <div className="container">
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="section-title">Sobre a Txelene</h2>
        <div style={{ 
          fontSize: '1.2rem', 
          color: 'var(--text-dim)', 
          lineHeight: 1.8, 
          background: '#fff',
          padding: 'clamp(20px, 5vw, 40px)',
          borderRadius: '30px',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid rgba(0,0,0,0.03)'
        }}>
          <h3 style={{ fontFamily: 'Outfit', color: '#111', marginBottom: '20px', fontSize: '1.8rem' }}>Txelene Investimentos</h3>
          <p style={{ marginBottom: '20px' }}>
            Somos uma empresa nacional que actua no ramo da indústria gráfica e serigrafia, voltada em dar cor e visibilidade às marcas das instituições e comunicação visual.
          </p>
          <p>
            Fundada a <span style={{ color: 'var(--primary)', fontWeight: 700 }}>05 de maio de 2024</span>, especializamo-nos em maquetização, impressão offset e digital, oferecendo um serviço completo e integrado, que abrange todas as etapas do processo gráfico: da pré-impressão aos acabamentos finais, com compromisso, excelência, inovação e elevados padrões de qualidade.
          </p>
        </div>
      </div>

      {/* Mission & Vision Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
        gap: '30px', 
        marginBottom: '30px' 
      }}>
        <div className="hover-lift" style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ padding: '10px', background: 'rgba(0, 102, 255, 0.1)', borderRadius: '10px' }}>
              <Target size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem' }}>Missão</h3>
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Consolidar-nos como uma empresa sólida e de referência no mercado gráfico, oferecendo produtos e serviços de elevada qualidade e acessibilidade, com uma excelente relação custo-benefício e um atendimento eficiente, atencioso e orientado para a satisfação do cliente.
          </p>
        </div>

        <div className="hover-lift" style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
             <div style={{ padding: '10px', background: 'rgba(255, 0, 128, 0.1)', borderRadius: '10px' }}>
              <Eye size={24} color="var(--secondary)" />
            </div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem' }}>Visão</h3>
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Ser reconhecida como líder no sector Gráfico em Moçambique, destacando-se pela confiança, integridade e inovação; contribuindo para o fortalecimento da identidade visual das marcas através de soluções criativas, sustentáveis e de alta qualidade.
          </p>
        </div>
      </div>

      {/* Values & Habits Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
        gap: '30px' 
      }}>
        <div className="hover-lift" style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--accent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
             <div style={{ padding: '10px', background: 'rgba(255, 204, 0, 0.2)', borderRadius: '10px' }}>
              <Diamond size={24} color="#b38f00" />
            </div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem' }}>Nossos Valores</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { t: 'Ética', d: 'Agimos com transparência e respeito.' },
              { t: 'Excelência Profissional', d: 'Entregamos qualidade com rigor técnico.' },
              { t: 'Foco em Resultados', d: 'Trabalhamos com eficiência e propósito.' },
              { t: 'Inovação', d: 'Valorizamos a criatividade e novas soluções.' },
              { t: 'Evolução Contínua', d: 'Buscamos aprimoramento constante.' },
              { t: 'Integridade', d: 'Mantemos coerência e cultivamos confiança.' },
              { t: 'Responsabilidade', d: 'Assumimos com seriedade o impacto das nossas ações.' },
              { t: 'Respeito', d: 'Valorizamos pessoas, ideias e diversidade.' }
            ].map((item, index) => (
              <li key={index} style={{ display: 'flex', gap: '10px', fontSize: '0.95rem', color: 'var(--text-dim)' }}>
                <CheckCircle size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>{item.t}:</strong> {item.d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hover-lift" style={{ background: '#fff', padding: '30px', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #111' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
             <div style={{ padding: '10px', background: 'rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
              <Check size={24} color="#111" />
            </div>
            <h3 style={{ fontFamily: 'Outfit', fontSize: '1.5rem' }}>Nossos Hábitos</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { t: 'Atitude Positiva', d: 'Encaramos cada desafio com entusiasmo e solução.' },
              { t: 'Executar com agilidade', d: 'Fazemos hoje o que precisa ser feito.' },
              { t: 'Desenvolver com compromisso', d: 'Agimos com ética e responsabilidade.' },
              { t: 'Ação com Propósito', d: 'Falamos menos, entregamos mais.' },
              { t: 'Paixão pelo que fazemos', d: 'Somos movidos pelo entusiasmo.' },
              { t: 'Confidencialidade Garantida', d: 'Tratamos cada produção com total sigilo.' },
              { t: 'Economia', d: 'Otimizamos processos para poupar tempo e dinheiro.' }
            ].map((item, index) => (
              <li key={index} style={{ display: 'flex', gap: '10px', fontSize: '0.95rem', color: 'var(--text-dim)' }}>
                <CheckCircle size={18} color="#111" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong style={{ color: 'var(--text-main)' }}>{item.t}:</strong> {item.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const portfolioItems = [
    { title: "Camisas Personalizadas", category: "Têxtil & Uniformes" },
    { title: "Crachás Personalizados", category: "Identificação Corporativa" },
    { title: "X-Banner", category: "Publicidade & Eventos" },
    { title: "Chávenas Personalizadas", category: "Brindes Corporativos" },
    { title: "Formulários Personalizados", category: "Papelaria Administrativa" },
    { title: "Cartão de Visita", category: "Identidade Visual" },
    { title: "Gazebos", category: "Estruturas para Eventos" }
  ];

  return (
    <section className="fade-in section-padding" style={{ minHeight: '80vh' }}>
       <div className="container">
          <h2 className="section-title">Nosso Portfólio</h2>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 50px', color: 'var(--text-dim)' }}>
            Explore alguns dos nossos trabalhos recentes. Do branding corporativo à personalização de eventos.
          </p>
  
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', 
            gap: '30px',
          }}>
             {portfolioItems.map((item, i) => (
               <div key={i} className="hover-lift" style={{ 
                 height: '300px', 
                 background: '#fff',
                 borderRadius: '20px', 
                 boxShadow: 'var(--shadow-sm)',
                 display: 'flex',
                 flexDirection: 'column',
                 alignItems: 'center',
                 justifyContent: 'center',
                 position: 'relative',
                 overflow: 'hidden',
                 border: '1px solid rgba(0,0,0,0.04)',
                 cursor: 'pointer'
               }}>
                 <div style={{ 
                     width: '100%', height: '100%', 
                     background: `linear-gradient(135deg, #f8f9fa, #e9ecef)`, 
                     display: 'flex', alignItems: 'center', justifyContent: 'center'
                 }}>
                      <span style={{ fontFamily: 'Outfit', color: '#dee2e6', fontSize: '4rem', fontWeight: 800 }}>0{i+1}</span>
                 </div>
                 <div style={{
                   position: 'absolute',
                   bottom: 0,
                   left: 0,
                   width: '100%',
                   padding: '25px',
                   background: 'linear-gradient(to top, rgba(255,255,255,1) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0))'
                 }}>
                     <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333' }}>{item.title}</div>
                     <div style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '5px', fontWeight: 500 }}>{item.category} <ChevronRight size={14} style={{ verticalAlign: 'middle' }}/></div>
                 </div>
               </div>
             ))}
          </div>
  
          {/* Guarantees Section */}
          <div style={{ marginTop: '100px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2rem', fontFamily: 'Outfit' }}>Porquê Escolher a Txelene?</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
                gap: '30px' 
              }}>
                  {/* Satisfaction Guarantee */}
                  <div className="hover-lift" style={{ 
                    padding: '35px 25px', 
                    background: '#fff', 
                    borderRadius: '20px', 
                    boxShadow: 'var(--shadow-sm)',
                    borderTop: '4px solid var(--primary)',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(0, 102, 255, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
                        <ShieldCheck size={32} color="var(--primary)" />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', color: '#111', marginBottom: '15px' }}>Satisfação Plena</h4>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      Garantimos impressão de qualidade e apoio dedicado. Se não ficar satisfeito ou a entrega atrasar, reembolsamos.
                    </p>
                  </div>
  
                   {/* Quality Guarantee */}
                   <div className="hover-lift" style={{ 
                    padding: '35px 25px', 
                    background: '#fff', 
                    borderRadius: '20px', 
                    boxShadow: 'var(--shadow-sm)',
                    borderTop: '4px solid var(--secondary)',
                    textAlign: 'center'
                  }}>
                     <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(255, 0, 128, 0.1)', borderRadius: '50%', marginBottom: '20px' }}>
                        <FileCheck size={32} color="var(--secondary)" />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', color: '#111', marginBottom: '15px' }}>Garantia e Qualidade</h4>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      Na Txelene os ficheiros são revistos por profissionais, garantindo uma impressão online segura e de qualidade.
                    </p>
                  </div>
  
                   {/* No Hidden Costs */}
                   <div className="hover-lift" style={{ 
                    padding: '35px 25px', 
                    background: '#fff', 
                    borderRadius: '20px', 
                    boxShadow: 'var(--shadow-sm)',
                    borderTop: '4px solid var(--accent)',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(255, 204, 0, 0.2)', borderRadius: '50%', marginBottom: '20px' }}>
                        <Wallet size={32} color="#b38f00" />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontFamily: 'Outfit', color: '#111', marginBottom: '15px' }}>Sem Custos Escondidos</h4>
                    <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      Simplificamos vidas: o preço apresentado é o valor final. Já inclui design gráfico, impressão, verificação e entrega.
                    </p>
                  </div>
              </div>
          </div>
  
       </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const form = useRef<HTMLFormElement>(null);

  // --- CONFIGURAÇÃO EMAILJS ---
  // 1. Crie uma conta em https://www.emailjs.com/
  // 2. Crie um "Email Service" (ex: Gmail)
  // 3. Crie um "Email Template"
  // 4. Substitua os valores abaixo:
  const SERVICE_ID = 'YOUR_SERVICE_ID'; 
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; 
  const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if(!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Se as chaves ainda forem as padrão (placeholder), simular envio para demonstração
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            console.log("Simulação de envio bem-sucedida. Configure as chaves do EmailJS para envio real.");
        }, 2000);
        return;
    }

    if (form.current) {
        emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
        .then((result) => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        }, (error) => {
            console.error(error.text);
            setStatus('error');
        });
    }
  };

  return (
    <section className="fade-in section-padding" style={{ minHeight: '80vh' }}>
      <div className="container">
        <h2 className="section-title">Fale Connosco</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
          gap: 'clamp(40px, 5vw, 80px)', 
          marginTop: '40px' 
        }}>
          {/* Info */}
          <div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '20px', fontFamily: 'Outfit', color: '#111' }}>Vamos criar algo incrível?</h3>
            <p style={{ color: 'var(--text-dim)', marginBottom: '40px', fontSize: '1.1rem' }}>
              Estamos prontos para atender o seu pedido. Entre em contacto pelos canais abaixo ou preencha o formulário.
            </p>
            
            <ContactItem 
              icon={<Phone size={24} color="var(--primary)" />} 
              bg="rgba(0, 102, 255, 0.1)"
              label="Ligue para nós"
              value={
                <span style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    <a href="tel:+258852650000" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">85 265 0000</a>
                    <span>/</span>
                    <a href="tel:+258862650000" style={{ color: 'inherit', textDecoration: 'none' }} className="hover-link">86 265 0000</a>
                </span>
              }
            />

            <ContactItem 
              icon={<Mail size={24} color="var(--secondary)" />} 
              bg="rgba(255, 0, 128, 0.1)"
              label="Envie um Email"
              value="comercial@txelene.co.mz"
              href="mailto:comercial@txelene.co.mz"
            />

            <ContactItem 
              icon={<MapPin size={24} color="#b38f00" />} 
              bg="rgba(255, 204, 0, 0.2)"
              label="Visite-nos"
              value="Av. Salvador Allende N915 R/C"
              href="https://maps.app.goo.gl/MJUFMFPzB6GrmDydA"
            />

            {/* New Sections */}
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Working Hours */}
              <div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '20px', fontFamily: 'Outfit', color: '#111' }}>Dias de Trabalho</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '10px', background: '#f0f4ff', borderRadius: '10px' }}>
                        <Clock size={20} color="var(--primary)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>Segunda à Sexta</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333' }}>08h às 18h</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '10px', background: '#fff0f7', borderRadius: '10px' }}>
                        <Clock size={20} color="var(--secondary)" />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>Sábado</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#333' }}>08h às 12h</div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
              <SocialIcon icon={<Instagram />} color="var(--secondary)" />
              <SocialIcon 
                icon={<Facebook />} 
                color="var(--primary)" 
                href="https://www.facebook.com/people/Txelene-Investimento/pfbid0skv2ttX8s9tAGvVAWgqMeG97qTNTUvtNXpKDztQT8iXcBE6aKQ7gWJmoWkctRzMFl/" 
              />
            </div>
          </div>

          {/* Form */}
          <div style={{ 
            background: '#fff', 
            padding: 'clamp(20px, 5vw, 40px)', 
            borderRadius: '30px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.03)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', fontFamily: 'Outfit' }}>Envie uma mensagem</h3>
            
            {status === 'success' ? (
              <div className="fade-in" style={{ 
                padding: '30px', 
                background: 'rgba(0, 102, 255, 0.1)', 
                borderRadius: '20px', 
                textAlign: 'center',
                border: '1px solid var(--primary)',
                color: 'var(--primary)'
              }}>
                <CheckCircle size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Mensagem Enviada!</h4>
                <p>Obrigado pelo contacto. Responderemos em breve.</p>
                <button onClick={() => setStatus('idle')} className="btn-secondary" style={{ marginTop: '20px', fontSize: '0.9rem', padding: '10px 25px' }}>
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-main)', fontWeight: 600 }}>Nome Completo</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field" 
                    style={inputStyle} 
                    placeholder="Seu nome" 
                    disabled={status === 'sending'}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-main)', fontWeight: 600 }}>Email para contacto</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field" 
                    style={inputStyle} 
                    placeholder="seu@email.com" 
                    disabled={status === 'sending'}
                  />
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '10px', color: 'var(--text-main)', fontWeight: 600 }}>Como podemos ajudar?</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field" 
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }} 
                    placeholder="Descreva o seu projeto..."
                    disabled={status === 'sending'}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div style={{ 
                    padding: '15px', 
                    background: '#fff2f2', 
                    borderRadius: '10px', 
                    marginBottom: '20px', 
                    color: '#dc3545',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: '1px solid #ffcccc'
                  }}>
                    <AlertCircle size={20} />
                    Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>Enviando... <div className="spinner"></div></>
                  ) : (
                    <>Enviar Mensagem <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setScrolled(currentScroll > 20);
      setShowScrollTop(currentScroll > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activePage]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { id: 'home', name: 'Início' },
    { id: 'services', name: 'Serviços' },
    { id: 'about', name: 'Sobre' },
    { id: 'portfolio', name: 'Portfólio' },
    { id: 'contact', name: 'Contactos' },
  ];

  const renderPage = () => {
    switch(activePage) {
      case 'home': return <Home navigate={setActivePage} />;
      case 'services': return <Services />;
      case 'about': return <About />;
      case 'portfolio': return <Portfolio />;
      case 'contact': return <Contact />;
      default: return <Home navigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Background Blobs (Global) */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, rgba(255,255,255,0) 70%)',
          filter: `blur(${80 + scrollY * 0.02}px)`,
          opacity: Math.max(0.4, 1 - scrollY * 0.0005),
          transform: `translateY(-${scrollY * 0.1}px)`,
          transition: 'transform 0.1s linear, filter 0.2s ease, opacity 0.2s ease',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, rgba(255, 0, 128, 0.06) 0%, rgba(255,255,255,0) 70%)',
          filter: `blur(${80 + scrollY * 0.03}px)`,
          transform: `translateY(-${scrollY * 0.2}px)`,
          transition: 'transform 0.1s linear, filter 0.2s ease',
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(255, 204, 0, 0.05) 0%, rgba(255,255,255,0) 60%)',
          filter: `blur(${100 + scrollY * 0.04}px)`,
          opacity: Math.min(1, 0.5 + scrollY * 0.001),
          transform: `translate(-50%, calc(-50% - ${scrollY * 0.05}px))`,
          transition: 'transform 0.1s linear, filter 0.2s ease, opacity 0.2s ease',
        }} />
      </div>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.3s ease',
        padding: '20px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div 
            className="hover-scale" 
            onClick={() => setActivePage('home')}
            style={{ cursor: 'pointer' }}
          >
            <TxeleneLogo />
          </div>

          {/* Desktop Nav */}
          <div className="hidden-mobile" style={{ display: 'flex', gap: '40px' }}>
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => setActivePage(link.id)}
                className="nav-link"
                style={{
                  color: activePage === link.id ? 'var(--primary)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="show-mobile" style={{ display: 'none', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X color="var(--text-main)" /> : <Menu color="var(--text-main)" />}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#ffffff',
            borderBottom: '1px solid var(--glass-border)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => setActivePage(link.id)}
                style={{
                  color: activePage === link.id ? 'var(--primary)' : 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  padding: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main style={{ marginTop: '80px', flex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{ 
        background: '#111',
        color: '#fff',
        padding: '60px 0 30px', 
        marginTop: 'auto',
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
            <div className="hover-scale" onClick={() => setActivePage('home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
              <TxeleneLogo lightMode={true} />
            </div>
            <p style={{ color: '#888', maxWidth: '400px' }}>Txelene Investimentos é sempre ideal quando se fala de soluções personalizadas.</p>
          </div>
          <div style={{ borderTop: '1px solid #333', paddingTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
            <p>&copy; {new Date().getFullYear()} Txelene Gráfica e Serigrafia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Scroll To Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
        style={{ bottom: '100px' }}
      >
        <ChevronUp size={24} />
      </button>
      
      {/* Mobile styling injection & Animations */}
      <style>{`
        /* Global Responsive Typography & Spacing */
        .section-padding { padding: 40px 0 80px; }
        
        @media (max-width: 991px) {
          .container { padding: 0 30px; }
          .section-title { font-size: 2.2rem !important; }
        }
        
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .container { padding: 0 20px; }
          .section-padding { padding: 40px 0; }
          .section-title { font-size: 1.8rem !important; margin-bottom: 2rem !important; }
          h1 { font-size: 2.5rem !important; }
        }
        
        @media (max-width: 480px) {
          .hidden-mobile-xs { display: none !important; }
          h1 { font-size: 2rem !important; }
          .section-home { padding-top: 40px !important; min-height: auto !important; }
        }

        .input-field:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
          background: #fff !important;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* NEW ANIMATIONS FOR HOME PAGE */
        .hero-badge {
          animation: pulse-glow 3s infinite;
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(0, 102, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(0, 102, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 102, 255, 0); }
        }

        .text-gradient {
          background: linear-gradient(to right, var(--primary), var(--secondary), var(--accent), var(--primary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 300% auto;
          animation: gradient-move 6s linear infinite;
          display: inline-block;
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .stagger-1 { animation: slideUpFade 0.8s ease-out forwards; opacity: 0; animation-delay: 0.1s; }
        .stagger-2 { animation: slideUpFade 0.8s ease-out forwards; opacity: 0; animation-delay: 0.3s; }
        .stagger-3 { animation: slideUpFade 0.8s ease-out forwards; opacity: 0; animation-delay: 0.5s; }
        .stagger-4 { animation: slideUpFade 0.8s ease-out forwards; opacity: 0; animation-delay: 0.7s; }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          z-index: -1;
          opacity: 0.6;
        }

        @keyframes float-slow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes float-fast {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15px, 15px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* WhatsApp Button Animation */
        .whatsapp-button {
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          animation: whatsapp-pulse 2s infinite;
          transition: all 0.3s ease;
        }
        .whatsapp-button:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.6);
          animation: none;
        }
        @keyframes whatsapp-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
            transform: scale(1.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            transform: scale(1);
          }
        }
        .hover-link:hover {
          text-decoration: underline !important;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '16px 20px',
  background: '#f8f9fa',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  color: 'var(--text-main)',
  fontFamily: 'Inter, sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'all 0.3s'
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}