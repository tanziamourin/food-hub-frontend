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

  return (
    <footer className="relative bg-gradient-to-b from-black/60 via-black/80 to-black text-white pt-20 pb-10 overflow-hidden">

      {/* Glow background */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4">

        {/* Newsletter */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 text-center backdrop-blur">
          <h3 className="text-2xl font-bold mb-3">
            🍕 Stay Updated with FoodHub
          </h3>
          <p className="text-gray-400 mb-5">
            Get latest offers and new meals in your inbox
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>
            <Link href="/">
              <Image
                src="/foodhub_logo_png.png"
                alt="FoodHub Logo"
                width={120}
                height={120}
              />
            </Link>

            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              FoodHub delivers delicious meals from top restaurants —
              fast, fresh & reliable.
            </p>

            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-orange-500/20 hover:border-orange-500 transition hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-gray-300 hover:text-orange-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {["/", "/meals", "/providers", "/login", "/register"].map(
                (href, i) => (
                  <li key={i}>
                    <Link
                      href={href}
                      className="hover:text-orange-400 transition"
                    >
                      {href === "/" ? "Home" : href.replace("/", "")}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4">Popular Cuisines</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Pizza", "Burger", "Asian", "Healthy", "Dessert"].map(
                (cat, i) => (
                  <li key={i}>
                    <Link
                      href={`/meals?category=${cat.toLowerCase()}`}
                      className="hover:text-red-400 transition"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                Dhaka, Bangladesh
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                +880 1234-567890
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                support@foodhub.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="flex items-center gap-2">
            © {currentYear} FoodHub. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            for food lovers
          </p>

          <div className="flex gap-6">
            {["Privacy", "Terms", "Refund"].map((text, i) => (
              <Link key={i} href="#" className="hover:text-orange-400">
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