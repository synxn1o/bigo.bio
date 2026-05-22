# Initial Concept
A Cloudflare Worker designed to serve static assets for the bigo.bio landing page.

# Product Guide

## Overview
bigo.bio is a promotional landing page designed to attract and engage potential clients. It serves as the digital front door for the company, highlighting key offerings, social presence, and providing a gateway to specialized tools like the protein design studio and company blog.

## Target Audience
- **Potential Clients:** Individuals or organizations looking to hire services or utilize the company's protein design tools.

## Key Features & Requirements
- **Social Links:** Easy access to the company's social media profiles.
- **Contact Info:** Clear and accessible methods for potential clients to get in touch.
- **Project/Product Showcase:** A section highlighting past work and core products.
- **Blog Integration:** A prominent link to the company's Hexo-based static blog at `blog.bigo.bio`.
- **Online IDE Gateway:** An entrance (planned for the top right corner) that will allow users to jump into the protein design studio.
- **3D Molecule Display (Future Support):** The production page architecture must be extendable to support a future 3D molecule display plugin for rendering protein molecules directly in the browser.
- **Multilingual Support:** The site must support both English and Simplified Chinese.

## Design Identity (High-Level)
- **Style:** "Swiss Red" design—professional, clean tech website.
- **Color Palette:** Black, white, or greyscale base with "Swiss Red" as the highlight color.
- **Layout & Elements:** Grid system-based layout, sharp right angles (no border radius) for clickable elements, key areas outlined with thin black solid lines, and a modern, blurred, fixed floating navigation bar.

## Future Goals & Expansion
- **Dynamic Content:** Transitioning to or incorporating dynamic content as the platform grows.
- **Extendable Production Page:** Architecture that supports complex integrations like the aforementioned 3D molecule viewer and IDE. Reference materials for production features are located in `/mnt/e/protein`.