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
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 flex flex-col bg-surface rounded-lg shadow-2xl overflow-hidden"
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
            <div className="flex-1 bg-surface relative">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-surface border-b border-border">
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
              <div className="flex-1 bg-gradient-to-br from-accent/10 to-accent-bg/30 p-8 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <h4 className="text-xl font-bold text-text-primary mb-2">{project.title}</h4>
                    <p className="text-sm text-text-secondary mb-4">Live Website Preview</p>
                    <div className="h-2 bg-border/40 rounded w-full mb-2" />
                    <div className="h-2 bg-border/40 rounded w-5/6 mb-2" />
                    <div className="h-2 bg-border/40 rounded w-4/6 mb-4" />
                    <div className="h-8 bg-accent rounded-full w-32 mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
