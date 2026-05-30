"use client";

import React from "react";
import { Layout, Globe, RefreshCw, Smartphone, HelpCircle } from "lucide-react";

interface ServiceCardProps {
  iconName: string;
  name: string;
  description: string;
}

export default function ServiceCard({ iconName, name, description }: ServiceCardProps) {
  // Dynamically resolve lucide icon
  const getIcon = () => {
    switch (iconName) {
      case "layout":
        return <Layout className="h-5 w-5 text-accent" />;
      case "world":
        return <Globe className="h-5 w-5 text-accent" />;
      case "refresh":
        return <RefreshCw className="h-5 w-5 text-accent" />;
      case "device-mobile":
        return <Smartphone className="h-5 w-5 text-accent" />;
      default:
        return <HelpCircle className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <div
      className="flex flex-col rounded-lg border-[0.5px] border-border bg-surface px-[18px] py-4 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-accent/40"
      data-hover
    >
      <div className="mb-3">{getIcon()}</div>
      <h3 className="text-base font-semibold text-text-primary mb-2">
        {name}
      </h3>
      <p className="text-sm font-normal leading-[1.7] text-text-secondary">
        {description}
      </p>
    </div>
  );
}
