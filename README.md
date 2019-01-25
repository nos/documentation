# Documentation
This is the official repository for all documentation regarding the 
**nOS Client**, **nOS-Local** and **Create-nOS-dApp**.

&nbsp;

## Contributing to the documentation
#### Updating existing documentation
This can be achieved by just editing the *.md files under the `/docs` folder.

#### Adding new documentation
This can be achieved by creating a new *.md file under the `/docs/*` folder
AND adding the ID of this file to `/website/sidebars.json`.

&nbsp;

## File structure
---
```
documentation
├── docs
│   ├── create-nos-dapp // contains all create-nos-dapp related documentation
│   ├── nos-client      // contains all nos-client related documentation
│   ├── nos-local       // contains all nos-local related documentation
│   ├── contributing.md
│   └── intro.md
└── website
    ├── core
    │   └── Footer.js
    ├── package.json
    ├── pages
    │   └── en
    │       ├── help.js
    │       ├── index.js
    ├── sidebars.json
    ├── siteConfig.js
    ├── static
    │   ├── css
    │   │   └── custom.css
    │   └── img
    │       ├── logo.svg
    │       ├── favicon
    │       │   └── favicon.ico
    │       ├── favicon.png
    │       └── screenshot.png
    └── yarn.lock
```
