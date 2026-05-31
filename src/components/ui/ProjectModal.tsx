"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    liveUrl: string;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-surface"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
              <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-border/30 transition-colors cursor-none"
                data-hover
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            
            {/* Browser Frame */}
            <div className="flex-1 bg-surface relative flex flex-col">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-border rounded-full max-w-xs mx-auto" />
                </div>
              </div>
              
              {/* Website Preview Area */}
              <div className="flex-1 bg-white relative min-h-0">
                <iframe
                  src={project.liveUrl}
                  title={project.title}
                  className="absolute inset-0 w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
