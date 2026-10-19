'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Moon, Shield, Menu, X, Search, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/hotels', label: 'Explore Hotels', icon: Compass },
    { href: '/guides', label: 'Sleep Guides', icon: Sparkles },
    { href: '/methodology', label: 'Rest Methodology', icon: Shield },
    { href: '/about', label: 'About', icon: Moon },
  ];

  const isActive = (path: string) => {
    if (path === '/hotels' && pathname.startsWith('/hotels')) return true;
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-sand-50/90 backdrop-blur-md border-b border-sand-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center shadow-soft group-hover:bg-forest-900 transition-colors">
              <Moon className="w-5 h-5 text-gold-400 fill-gold-400/20" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-forest-900 block leading-tight">
                Rest Atlas
              </span>
              <span className="text-[10px] uppercase tracking-widest text-forest-700/80 font-medium block">
                Sleep & Sanctuary Guide
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1.5 py-1 border-b-2 ${
                    active
                      ? 'text-forest-800 border-forest-800'
                      : 'text-charcoal-700 hover:text-forest-800 border-transparent hover:border-sand-300'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/hotels"
              className="p-2 text-charcoal-600 hover:text-forest-800 hover:bg-sand-100 rounded-full transition-colors"
              title="Search Hotels"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              href="/admin"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-forest-800 bg-forest-50 hover:bg-forest-100 border border-forest-200/80 rounded-full transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Assessor Portal</span>
            </Link>

            <Link
              href="/hotels?sortBy=restScore"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-sand-50 bg-forest-800 hover:bg-forest-900 rounded-lg shadow-soft transition-all"
            >
              Find Restful Stays
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/hotels"
              className="p-2 text-charcoal-700 hover:bg-sand-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-700 hover:bg-sand-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sand-50 border-b border-sand-200 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-forest-100/70 text-forest-900 font-semibold'
                    : 'text-charcoal-700 hover:bg-sand-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-sand-200 flex flex-col space-y-2">
            <Link
              href="/hotels?sortBy=restScore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 text-sm font-medium text-sand-50 bg-forest-800 rounded-lg"
            >
              Find Restful Stays
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-medium text-forest-800 bg-forest-50 border border-forest-200 rounded-lg"
            >
              Assessor & Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
