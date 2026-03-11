import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart, UtensilsCrossed, Pill, AlertTriangle, Shield, Clock, Users,
  ChevronRight, Star, ArrowRight, Phone, Lock, CheckCircle, ChevronLeft
} from 'lucide-react'
import Button from '../../components/common/Button'
import { mockTestimonials } from '../../utils/mockData'

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function LandingPage() {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Heart className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold text-charcoal font-heading">ElderEase</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-charcoal-muted hover:text-primary-600 font-medium transition-colors">Services</a>
            <a href="#how-it-works" className="text-charcoal-muted hover:text-primary-600 font-medium transition-colors">How It Works</a>
            <a href="#testimonials" className="text-charcoal-muted hover:text-primary-600 font-medium transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log In</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-bg-warm to-secondary-50 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                <Heart size={16} /> Trusted by 10,000+ families
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-charcoal font-heading leading-tight mb-6">
                Compassionate Care for Your{' '}
                <span className="text-gradient">Loved Ones</span>
              </h1>
              <p className="text-lg text-charcoal-muted mb-8 max-w-lg">
                ElderEase connects seniors with dedicated caregivers and essential services — food assistance,
                medicine management, and instant emergency response — all in one safe, simple platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" icon={ArrowRight} iconRight={ArrowRight} onClick={() => navigate('/register')}>
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/register')}>
                  I'm a Caregiver
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-charcoal-muted">
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-success-500" /> Free to use</span>
                <span className="flex items-center gap-1.5"><Shield size={16} className="text-primary-500" /> HIPAA Compliant</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-secondary-500" /> 24/7 Support</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="w-full h-96 rounded-3xl bg-gradient-to-br from-primary-200 via-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl block mb-4">👴❤️👩‍⚕️</span>
                  <p className="text-primary-700 font-semibold">Care that feels like family</p>
                </div>
              </div>
              {/* Floating cards */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-warm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center"><CheckCircle className="text-success-600" size={20} /></div>
                <div><p className="font-semibold text-sm text-charcoal">Medicine Taken</p><p className="text-xs text-charcoal-muted">Just now</p></div>
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-warm p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center"><UtensilsCrossed className="text-primary-600" size={20} /></div>
                <div><p className="font-semibold text-sm text-charcoal">Lunch Delivered</p><p className="text-xs text-charcoal-muted">12:30 PM</p></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal font-heading mb-4">Three Pillars of Care</h2>
            <p className="text-lg text-charcoal-muted max-w-2xl mx-auto">Everything your loved ones need, beautifully integrated into one platform.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: UtensilsCrossed, title: 'Food Assistance', desc: 'Nutritious meals tailored to dietary needs, delivered with care. Browse providers, subscribe to meal plans, and track deliveries in real-time.', color: 'from-primary-500 to-teal-500', bg: 'bg-primary-50' },
              { icon: Pill, title: 'Medicine Management', desc: 'Never miss a dose. Visual schedules, smart reminders, low-stock alerts, and a complete compliance tracker to keep health on track.', color: 'from-secondary-500 to-amber-500', bg: 'bg-secondary-50' },
              { icon: AlertTriangle, title: 'Emergency Care', desc: 'One-tap SOS button instantly alerts caregivers and emergency contacts. Real-time tracking of responders and resolution status.', color: 'from-emergency-500 to-red-500', bg: 'bg-emergency-50' },
            ].map((service, i) => (
              <motion.div key={service.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.15 }}
                className="p-8 rounded-2xl border border-gray-100 hover:shadow-warm transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-charcoal font-heading mb-3">{service.title}</h3>
                <p className="text-charcoal-muted leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-bg-warm to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal font-heading mb-4">How It Works</h2>
            <p className="text-lg text-charcoal-muted">Getting started is simple — three easy steps to peace of mind.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up as a Senior, Caregiver, or Service Provider. Set up your profile with medical info and preferences.' },
              { step: '02', title: 'Connect & Configure', desc: 'Link with caregivers, set medicine schedules, choose food providers, and configure emergency contacts.' },
              { step: '03', title: 'Live with Confidence', desc: 'Enjoy daily assistance, timely reminders, and the assurance that help is always just one tap away.' },
            ].map((item, i) => (
              <motion.div key={item.step} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl bg-white shadow-soft border border-gray-100"
              >
                <span className="text-5xl font-extrabold text-primary-100 font-heading absolute top-4 right-6">{item.step}</span>
                <div className="relative">
                  <h3 className="text-xl font-bold text-charcoal font-heading mb-3">{item.title}</h3>
                  <p className="text-charcoal-muted">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal font-heading mb-4">Stories of Care</h2>
            <p className="text-lg text-charcoal-muted">Hear from the families and caregivers who trust ElderEase.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-secondary-500 fill-secondary-500" />)}
              </div>
              <p className="text-lg text-charcoal leading-relaxed mb-6 italic">
                "{mockTestimonials[currentTestimonial].text}"
              </p>
              <p className="font-bold text-charcoal">{mockTestimonials[currentTestimonial].name}</p>
              <p className="text-sm text-charcoal-muted">{mockTestimonials[currentTestimonial].role}</p>
            </motion.div>
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setCurrentTestimonial(p => (p - 1 + mockTestimonials.length) % mockTestimonials.length)}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors touch-target"><ChevronLeft size={20} /></button>
              <div className="flex items-center gap-2">
                {mockTestimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-primary-600 w-6' : 'bg-gray-300'}`} />
                ))}
              </div>
              <button onClick={() => setCurrentTestimonial(p => (p + 1) % mockTestimonials.length)}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors touch-target"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { icon: Shield, label: 'Data Privacy', value: 'HIPAA Compliant' },
              { icon: Clock, label: '24/7 Support', value: 'Always Available' },
              { icon: Users, label: 'Trusted By', value: '10,000+ Families' },
              { icon: Lock, label: 'Security', value: 'End-to-End Encrypted' },
            ].map((badge) => (
              <div key={badge.label} className="flex flex-col items-center">
                <badge.icon size={32} className="mb-3 opacity-90" />
                <p className="font-bold text-lg">{badge.value}</p>
                <p className="text-sm opacity-80">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-bg-warm">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-charcoal font-heading mb-6">Ready to Give Your Loved Ones the Care They Deserve?</h2>
            <p className="text-lg text-charcoal-muted mb-10">Join thousands of families who trust ElderEase for compassionate, reliable elder care.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}>Get Started as Senior</Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/register')}>Join as Caregiver</Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/register')}>Register as Provider</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <Heart className="text-white" size={16} />
              </div>
              <span className="font-bold text-white">ElderEase</span>
            </div>
            <p className="text-sm">&copy; 2024 ElderEase. All rights reserved. Made with ❤️ for seniors.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
