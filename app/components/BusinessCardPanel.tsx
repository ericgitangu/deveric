"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  CreditCard,
  X,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Briefcase,
  Github,
  Linkedin,
  Download,
  ChevronRight,
  Smartphone,
} from "lucide-react";

const VCARD_URL = "https://developer.ericgitangu.com/eric-gitangu.vcf";

const contactData = {
  name: "Eric Gitangu",
  title: "Software Engineer Lead/Architect",
  org: "Unicorns \u{1F984}",
  orgRole: "CEO & Founder",
  cellPhone: "+1-978-710-9475",
  workPhone: "+254708078997",
  email: "developer.ericgitangu@gmail.com",
  whatsapp: "https://wa.me/qr/XQWQZQC6ZYQQO1",
  website: "https://developer.ericgitangu.com",
  resume: "https://resume.ericgitangu.com",
  linkedin: "https://linkedin.com/in/ericgitangu",
  github: "https://github.com/ericgitangu",
  unicorns: "https://unicorns.ericgitangu.com",
};

function Tooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <span className="relative group/tip">
      {children}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-300 whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 z-50 border border-zinc-700 shadow-lg">
        {text}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-800" />
      </span>
    </span>
  );
}

export function BusinessCardPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!mounted) return null;

  return (
    <>
      {/* Tab trigger - fixed on left edge */}
      <Tooltip text="Virtual Business Card">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open virtual business card"
          className={`fixed left-0 top-1/2 -translate-y-1/2 z-[60] flex items-center gap-1 px-1.5 py-3 rounded-r-lg bg-gradient-to-b from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:px-2.5 transition-all duration-300 group/tab ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
          <ChevronRight className="w-3 h-3 opacity-60 group-hover/tab:opacity-100 transition-opacity" />
          {/* Pulsing dot hint */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
        </button>
      </Tooltip>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full w-[min(340px,85vw)] overflow-y-auto bg-gradient-to-b from-zinc-900 via-zinc-900 to-black border-r border-zinc-700/50 shadow-2xl shadow-black/50">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Virtual Card
              </span>
            </div>
            <Tooltip text="Close (Esc)">
              <button
                onClick={handleClose}
                aria-label="Close business card panel"
                className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </Tooltip>
          </div>

          {/* Card body */}
          <div className="p-4 space-y-5">
            {/* Profile header */}
            <div className="text-center space-y-1.5">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-display text-white shadow-lg shadow-blue-500/30">
                EG
              </div>
              <h2 className="text-lg font-display text-white">
                {contactData.name}
              </h2>
              <p className="text-xs text-blue-400 font-medium">
                {contactData.title}
              </p>
              <p className="text-[11px] text-zinc-500">
                {contactData.org} &middot; {contactData.orgRole}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Interactive links */}
            <div className="space-y-1.5">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium px-1">
                Quick Actions
              </p>

              {/* Call - Cell */}
              <Tooltip text="Call mobile">
                <a
                  href={`tel:${contactData.cellPhone}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 group-hover/link:bg-emerald-500/25 transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm text-zinc-200">
                      {contactData.cellPhone}
                    </p>
                    <p className="text-[10px] text-zinc-500">Mobile</p>
                  </div>
                </a>
              </Tooltip>

              {/* Call - Work */}
              <Tooltip text="Call work">
                <a
                  href={`tel:${contactData.workPhone}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 group-hover/link:bg-emerald-500/25 transition-colors">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm text-zinc-200">
                      {contactData.workPhone}
                    </p>
                    <p className="text-[10px] text-zinc-500">Work</p>
                  </div>
                </a>
              </Tooltip>

              {/* Email */}
              <Tooltip text="Send email">
                <a
                  href={`mailto:${contactData.email}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/15 text-blue-400 group-hover/link:bg-blue-500/25 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm text-zinc-200 break-all">
                      {contactData.email}
                    </p>
                    <p className="text-[10px] text-zinc-500">Email</p>
                  </div>
                </a>
              </Tooltip>

              {/* WhatsApp */}
              <Tooltip text="Chat on WhatsApp">
                <a
                  href={contactData.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/15 text-green-400 group-hover/link:bg-green-500/25 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-sm text-zinc-200">WhatsApp</p>
                    <p className="text-[10px] text-zinc-500">Message me</p>
                  </div>
                </a>
              </Tooltip>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Web links */}
            <div className="space-y-1.5">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium px-1">
                Links
              </p>

              <Tooltip text="Portfolio website">
                <a
                  href={contactData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <Globe className="w-4 h-4 text-zinc-500 group-hover/link:text-blue-400 transition-colors" />
                  <span className="text-sm text-zinc-300">Portfolio</span>
                </a>
              </Tooltip>

              <Tooltip text="Interactive resume">
                <a
                  href={contactData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <Globe className="w-4 h-4 text-zinc-500 group-hover/link:text-purple-400 transition-colors" />
                  <span className="text-sm text-zinc-300">Resume</span>
                </a>
              </Tooltip>

              <Tooltip text="LinkedIn profile">
                <a
                  href={contactData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <Linkedin className="w-4 h-4 text-zinc-500 group-hover/link:text-blue-500 transition-colors" />
                  <span className="text-sm text-zinc-300">LinkedIn</span>
                </a>
              </Tooltip>

              <Tooltip text="GitHub profile">
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <Github className="w-4 h-4 text-zinc-500 group-hover/link:text-white transition-colors" />
                  <span className="text-sm text-zinc-300">GitHub</span>
                </a>
              </Tooltip>

              <Tooltip text="Unicorns startup">
                <a
                  href={contactData.unicorns}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors group/link"
                >
                  <span className="text-base leading-none">🦄</span>
                  <span className="text-sm text-zinc-300">Unicorns</span>
                </a>
              </Tooltip>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* QR Code section */}
            <div className="space-y-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium px-1">
                Scan to Save Contact
              </p>
              <div className="flex justify-center">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <QRCodeSVG
                    value={VCARD_URL}
                    size={160}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#18181b"
                  />
                </div>
              </div>
              <p className="text-center text-[10px] text-zinc-600">
                Scan QR to download vCard
              </p>
            </div>

            {/* Download VCF button */}
            <a
              href="/eric-gitangu.vcf"
              download="Eric Gitangu.vcf"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              <Download className="w-4 h-4" />
              Save Contact Card
            </a>

            {/* Footer note */}
            <p className="text-center text-[9px] text-zinc-700 pb-4">
              &quot;Code-blooded Software Engineer&quot;
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
