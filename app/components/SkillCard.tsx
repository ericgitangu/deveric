"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Cloud,
  Server,
  BarChart3,
  BrainCircuit,
  Boxes,
  GitBranch,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from "lucide-react";
import {
  DiReact,
  DiNodejsSmall,
  DiDocker,
  DiPython,
  DiAws,
  DiGit,
  DiRedis,
  DiRust,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiGooglecloud,
  SiMicrosoftazure,
  SiEthereum,
  SiKubernetes,
  SiGo,
  SiR,
  SiTableau,
  SiApachespark,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiGraphql,
  SiSwagger,
  SiRabbitmq,
  SiGithubactions,
  SiJenkins,
  SiTerraform,
} from "react-icons/si";
import type { SkillArea, Technology } from "@/about/data";
import type { IconType } from "react-icons";

const headerIconMap: Record<string, LucideIcon> = {
  Layers,
  Cloud,
  Server,
  BarChart3,
  BrainCircuit,
  Boxes,
  GitBranch,
};

const techIconMap: Record<string, IconType> = {
  DiReact,
  DiNodejsSmall,
  DiDocker,
  DiPython,
  DiAws,
  DiGit,
  DiRedis,
  DiRust,
  SiNextdotjs,
  SiGooglecloud,
  SiMicrosoftazure,
  SiEthereum,
  SiKubernetes,
  SiGo,
  SiR,
  SiTableau,
  SiApachespark,
  SiTensorflow,
  SiPytorch,
  SiOpenai,
  SiGraphql,
  SiSwagger,
  SiRabbitmq,
  SiGithubactions,
  SiJenkins,
  SiTerraform,
};

interface SkillCardProps {
  skill: SkillArea;
  isActive?: boolean;
}

function TechIcon({ tech }: { tech: Technology }) {
  const Icon = techIconMap[tech.icon];
  if (!Icon) return null;
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="w-6 h-6 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
      <span className="text-[10px] text-zinc-500">{tech.name}</span>
    </div>
  );
}

export function SkillCard({ skill, isActive = true }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const HeaderIcon = headerIconMap[skill.headerIcon];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`
        group w-full max-w-md mx-auto
        bg-zinc-900/50 backdrop-blur-sm
        border border-zinc-600 hover:border-zinc-400/50
        rounded-xl overflow-hidden
        transition-colors duration-300
        ${isActive ? "" : "pointer-events-none"}
      `}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {HeaderIcon && (
            <div className="p-2 bg-zinc-800 rounded-lg">
              <HeaderIcon className="w-6 h-6 text-zinc-100" />
            </div>
          )}
          <h3 className="text-xl font-display text-zinc-100">{skill.title}</h3>
        </div>

        {/* Tech Icons Row */}
        <div className="flex justify-around items-center py-4 px-2 bg-zinc-800/50 rounded-lg mb-4">
          {skill.technologies.map((tech) => (
            <TechIcon key={tech.name} tech={tech} />
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed">
          {skill.description}
        </p>

        {/* Expandable Content */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 mt-4 text-sm text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded"
          aria-expanded={isExpanded}
          aria-controls={`highlights-${skill.id}`}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Hide highlights</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Show highlights</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`highlights-${skill.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2">
                {skill.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-zinc-400"
                  >
                    <span className="text-zinc-500 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
