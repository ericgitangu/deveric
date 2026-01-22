"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Calendar } from "lucide-react";
import Image from "next/image";
import {
  SiMeta,
  SiLinkedin,
  SiCoursera,
  SiHackerrank,
  SiUdemy,
  SiSololearn,
  SiOpenai,
} from "react-icons/si";
import type { Certification, CertificationAuthority } from "@/certifications/data";
import type { IconType } from "react-icons";

const authorityIconMap: Record<CertificationAuthority, IconType | null> = {
  Meta: SiMeta,
  LinkedIn: SiLinkedin,
  Coursera: SiCoursera,
  HackerRank: SiHackerrank,
  Udemy: SiUdemy,
  SoloLearn: SiSololearn,
  "Duke University": null,
  "DeepLearning.AI": SiOpenai,
  HackerX: null,
};

// Image logos for authorities without brand icons in react-icons
const authorityLogoMap: Record<string, string> = {
  "Duke University": "/logos/duke-university.png",
  HackerX: "/logos/hackerx.png",
};

const authorityColorMap: Record<CertificationAuthority, string> = {
  Meta: "#0668E1",
  LinkedIn: "#0A66C2",
  Coursera: "#0056D2",
  HackerRank: "#00EA64",
  Udemy: "#A435F0",
  SoloLearn: "#149EF2",
  "Duke University": "#003087",
  "DeepLearning.AI": "#FF6F00",
  HackerX: "#FF5722",
};

interface CertificationCardProps {
  certification: Certification;
  isActive?: boolean;
}

export function CertificationCard({
  certification,
  isActive = true,
}: CertificationCardProps) {
  const AuthorityIcon = authorityIconMap[certification.authority];
  const authorityLogo = authorityLogoMap[certification.authority];
  const authorityColor = authorityColorMap[certification.authority];

  return (
    <motion.a
      href={certification.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`
        group block w-full max-w-md mx-auto
        bg-zinc-900/50 backdrop-blur-sm
        border border-zinc-600 hover:border-zinc-400/50
        rounded-xl overflow-hidden
        transition-colors duration-300
        ${isActive ? "" : "pointer-events-none"}
      `}
    >
      <div className="p-6">
        {/* Featured Badge */}
        {certification.featured && (
          <div className="flex items-center gap-1.5 mb-3">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium text-yellow-500 uppercase tracking-wide">
              Featured
            </span>
          </div>
        )}

        {/* Authority Icon & Name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${authorityColor}20` }}
          >
            {AuthorityIcon ? (
              <AuthorityIcon
                className="w-6 h-6"
                style={{ color: authorityColor }}
              />
            ) : authorityLogo ? (
              <Image
                src={authorityLogo}
                alt={certification.authority}
                width={24}
                height={24}
                className="object-contain"
              />
            ) : (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: authorityColor }}
              >
                {certification.authority.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <span
              className="text-xs font-medium"
              style={{ color: authorityColor }}
            >
              {certification.authority}
            </span>
          </div>
        </div>

        {/* Certification Name */}
        <h3 className="text-lg font-display text-zinc-100 mb-3 group-hover:text-white transition-colors line-clamp-2">
          {certification.name}
        </h3>

        {/* Domain Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 text-xs">
            {certification.domain}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{certification.date}</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <span>View credential</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* License Number */}
        {certification.licenseNumber && (
          <div className="mt-3 pt-3 border-t border-zinc-800">
            <span className="text-xs text-zinc-600">
              License: {certification.licenseNumber}
            </span>
          </div>
        )}
      </div>
    </motion.a>
  );
}
