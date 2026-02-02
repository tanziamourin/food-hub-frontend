"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-gradient-to-b from-black/40 via-black/60 to-black/80 border-t border-white/10 pt-20 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px] -z-10 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/foodhub_logo_png.png"
                alt="FoodHub Logo"
                width={120}
                height={120}
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              FoodHub helps you discover and order delicious meals from your
              favorite restaurants — fast, fresh, and reliable.
            </p>

            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 bg-white/5 rounded-xl border border-white/10 hover:border-orange-500/50 transition hover:scale-110"
                >
                  <Icon className="size-4 text-gray-400 hover:text-orange-500" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Browse Meals", href: "/meals" },
                { label: "Providers", href: "/providers" },
                { label: "Login", href: "/login" },
                { label: "Register", href: "/register" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-orange-400 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">
              Popular Cuisines
            </h4>
            <ul className="space-y-3">
              {[
                "Pizza",
                "Burgers",
                "Asian",
                "Healthy",
                "Desserts",
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={`/meals?category=${cat.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-red-400 transition"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">
              Contact & Support
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="size-4 text-orange-400" />
                <span className="text-sm text-gray-400">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="size-4 text-orange-400" />
                <span className="text-sm text-gray-400">
                  +880 1234-567890
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="size-4 text-orange-400" />
                <span className="text-sm text-gray-400">
                  support@foodhub.com
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-2">
            © {currentYear} FoodHub. Made with
            <Heart className="size-3 text-red-500 fill-red-500" />
            for food lovers.
          </p>

          <div className="flex gap-6 text-sm">
            {["Privacy Policy", "Terms", "Refund Policy"].map((text, i) => (
              <Link
                key={i}
                href="#"
                className="text-gray-500 hover:text-orange-400 transition"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
