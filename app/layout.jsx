// RootLayout.jsx — updated with enhanced footer containing profile & social links
// -----------------------------------------------------------------------------
// Notes:
// • Added social icon links (LinkedIn, GitHub, Portfolio) with Lucide icons.
// • Clear role line: “Crafted by Sohaib Shah – Full‑Stack Developer”.
// • Responsive flex layout: stacks on mobile, inline on larger screens.
// • Accessible focus rings, external link aria‑labels, AA color contrast.
// -----------------------------------------------------------------------------

import React from "react";
import Link from "next/link";
import { Home, Linkedin, Github, Globe } from "lucide-react";
import "./globals.css";

export const metadata = {
  title: "ToolBox - Multi-Tool Utility App",
  description: "A collection of useful tools for everyday tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {/* --------------------------- NAVBAR --------------------------- */}
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b dark:bg-gray-800/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg grid place-items-center">
                  <span className="text-white font-bold text-sm">TB</span>
                </div>
                <span className="text-xl font-bold tracking-tight">
                  ToolBox
                </span>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* --------------------------- MAIN ----------------------------- */}
        <main className="flex-1">{children}</main>

        {/* --------------------------- FOOTER --------------------------- */}
        <footer className="mt-auto bg-white/90 backdrop-blur-sm border-t dark:bg-gray-800/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Profile + tagline */}
            <div className="text-center md:text-left">
              <p className="font-semibold">
                Crafted by Afaq Ahmad –{" "}
                <span className="text-indigo-600">Full‑Stack Developer</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Building intuitive web experiences with React &amp; Next.js
              </p>
            </div>

            {/* Social links */}
            <ul className="flex justify-center md:justify-end gap-6 text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="https://linkedin.com/in/afaqy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="hover:text-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/70 rounded p-1 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Afaq-302"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="hover:text-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/70 rounded p-1 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  href="https://afaq-resume.vercel.app/" // replace with actual portfolio
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Personal website"
                  className="hover:text-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-400/70 rounded p-1 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </body>
    </html>
  );
}
