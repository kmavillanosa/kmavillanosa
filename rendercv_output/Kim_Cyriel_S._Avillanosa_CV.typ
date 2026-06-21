// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.1.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Kim Cyriel S. Avillanosa",
  footer: context { [#emph[Kim Cyriel S. Avillanosa -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in June 2026] ],
  locale-catalog-language: "en",
  page-size: "us-letter",
  page-top-margin: 0.6in,
  page-bottom-margin: 0.6in,
  page-left-margin: 0.65in,
  page-right-margin: 0.65in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(33, 33, 33),
  colors-name: rgb(26, 26, 26),
  colors-headline: rgb(90, 90, 90),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(140, 140, 140),
  colors-top-note: rgb(140, 140, 140),
  typography-line-spacing: 0.65em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Lato",
  typography-font-family-name: "Raleway",
  typography-font-family-headline: "Raleway",
  typography-font-family-connections: "Lato",
  typography-font-family-section-titles: "Raleway",
  typography-font-size-body: 10pt,
  typography-font-size-name: 26pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 9.5pt,
  typography-font-size-section-titles: 1.3em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: true,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: true,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.3cm,
  header-space-below-name: 0.35cm,
  header-space-below-headline: 0.5cm,
  header-space-below-connections: 0.6cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "|",
  header-connections-space-between-connections: 0.45cm,
  section-titles-type: "with_partial_line",
  section-titles-line-thickness: 0.6pt,
  section-titles-space-above: 0.55cm,
  section-titles-space-below: 0.28cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.35em,
  sections-space-between-regular-entries: 1.05em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "◦" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.35cm,
  entries-highlights-space-above: 0.12cm,
  entries-highlights-space-between-items: 0.18cm,
  entries-highlights-space-between-bullet-and-text: 0.4em,
  date: datetime(
    year: 2026,
    month: 6,
    day: 21,
  ),
)


#grid(
  columns: (auto, 1fr),
  column-gutter: 0cm,
  align: horizon + left,
  [#pad(left: 0.4cm, right: 0.4cm, image("profile.jpg", width: 3.3cm))
],
  [
= Kim Cyriel S. Avillanosa

#connections(
  [#connection-with-icon("location-dot")[Puerto Princesa City, Palawan, Philippines]],
  [#link("mailto:careers.kmavillanosa@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[careers.kmavillanosa\@gmail.com]]],
  [#link("tel:+63-945-287-3791", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[0945 287 3791]]],
  [#link("https://itsavillanosa.com/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[itsavillanosa.com]]],
  [#link("https://kmavillanosa.github.io/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[kmavillanosa.github.io\/kmavillanosa]]],
  [#link("https://linkedin.com/in/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[kmavillanosa]]],
  [#link("https://github.com/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[kmavillanosa]]],
  [#link("https://github.com/AvillanosaITSolutions", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[AvillanosaITSolutions]]],
)
  ]
)


== About Me

Senior full-stack software engineer with 10 years of experience shipping production web, desktop, and 3D applications for international teams across Switzerland, Australia, and Spain.

Core stack is React, Next.js, and TypeScript on the front end with C\#\/.NET and Node.js (NestJS) on the back end, grounded in Domain-Driven Design, Clean Architecture, and Vertical Slice.

Track record of leading multinational teams, owning CI\/CD and data migrations, mentoring engineers, and delivering maintainable, well-tested systems.

== Experience

#regular-entry(
  [
    #strong[Avillanosa Information Technology Solutions (itsavillanosa.com)], Founder \/ Principal Software Engineer

    - Founded and operate an independent IT solutions firm delivering custom software to local and offshore clients

    - Design and ship multi-tenant, SaaS-style web applications end to end — architecture, full-stack development, and deployment

    - Engage directly with clients to translate business requirements into scalable, maintainable systems

    - Bill B2B as an independent senior contractor with availability across AU\/NZ business hours

  ],
  [
    Puerto Princesa City, Palawan, Philippines

    May 2026 – present

    2 months

  ],
)

#regular-entry(
  [
    #strong[Cabinets by Computer], Senior Front-End Developer (3D \/ WebGL)

    - Built and shipped production 3D product visualization using Three.js \/ WebGL for an Australian product team

    - Delivered performant, photo-realistic visual implementations in the browser

    - Developed internal automation and tooling that streamlined the design-to-production workflow

    - Mentored developers on 3D graphics and front-end best practices

  ],
  [
    Connewarre, Victoria, Australia

    Nov 2024 – Nov 2025

    1 year 1 month

  ],
)

#regular-entry(
  [
    #strong[Amihan Solutions \/ Medgate Switzerland], Senior Software Developer (Frontend)

    - Delivered frontend features and internal tooling for a Swiss telemedicine platform

    - Led investigations, code reviews, and refactors to improve code quality and maintainability

    - Prepared and delivered technical presentations to stakeholders

    - Worked async with a distributed European team

  ],
  [
    Rafz, Zurich, Switzerland

    Nov 2023 – Oct 2024

    1 year

  ],
)

#regular-entry(
  [
    #strong[Palawan Group of Companies], Software Engineering Consultant

    - Researched and modernized legacy systems

    - Provided architectural and technical guidance to engineering teams

    - Performed code reviews and performance optimizations

  ],
  [
    Puerto Princesa, Philippines

    June 2023 – Apr 2024

    11 months

  ],
)

#regular-entry(
  [
    #strong[Yondu, Inc. \/ Morphsys Inc & Applus+], Lead Senior Software Engineer (Full Stack)

    - Led multinational development teams across Manila and Barcelona

    - Designed scalable system architectures and established Git and CI\/CD workflows

    - Owned data migrations and production deployments

    - Authored technical documentation and user manuals

    - Mentored engineers and optimized team processes

  ],
  [
    Taguig, Philippines \/ Barcelona, Spain

    Mar 2022 – Aug 2023

    1 year 6 months

  ],
)

#regular-entry(
  [
    #strong[Palawan Express Pera Padala], Software Engineer

    - Developed web services using Clean Architecture for a national remittance network

    - Built integrations spanning desktop and web applications

    - Wrote documentation, unit tests, and deployment guides

    - Supervised tasks and optimized delivery workflows

  ],
  [
    Puerto Princesa City, Philippines

    Mar 2018 – Mar 2022

    4 years 1 month

  ],
)

#regular-entry(
  [
    #strong[International Payments Processing, Inc.], Programmer

    - Built data extraction and reporting tools

    - Developed automation for email workflows

    - Created inventory and reconciliation tools

  ],
  [
    Puerto Princesa City, Philippines

    May 2016 – Feb 2018

    1 year 10 months

  ],
)

#regular-entry(
  [
    #strong[City Government of Puerto Princesa], Tech Support

    - Maintained hardware and network infrastructure

    - Installed cabling, access points, and printers

  ],
  [
    Puerto Princesa City, Philippines

    Oct 2015 – Mar 2016

    6 months

  ],
)

== Education

#education-entry(
  [
    #strong[Palawan State University], Information Technology

  ],
  [
    Puerto Princesa City, Philippines

    June 2011 – Apr 2016

  ],
  degree-column: [
    #strong[Bachelors]
  ],
)

== Certifications

#strong[NobleProg - Systems and Service Architecture:] Systems and Service Architecture

#strong[Skillsoft - Artificial Intelligence and Machine Learning:] Credential ID 163182120

#strong[Skillsoft - Generative AI and Its Impact to Everyday Business:] Credential ID 163192919

#strong[Skillsoft - Introduction to Claude Projects:] Credential ID 181003235

== Skills

#strong[Programming Languages:] TypeScript, JavaScript, C\#

#strong[Frontend Development:] Frameworks & Libraries: React, Next.js, Create-React-App, Vite React
Styling: CSS, Sass, Bootstrap, Material UI, Kendo React, Tailwind CSS
State Management: React Redux, Zustand
Data Visualization: D3.js, Three.js
API: GraphQL, Rest
UI Testing: storybook

#strong[Desktop:] Runtime: .NET Framework, .NET Core
Frameworks: WPF, WinForms
Design Patterns: MVVM, IoC, Observer, Facade, Factory

#strong[Mobile Development:] Ionic React, React Native

#strong[AI Tools & Assistants:] Claude, Claude Code, OpenCLAW

#strong[Low-Code Development:] OutSystems Platform (Knowledge of fundamentals and basic implementation, acquired through self-study)

#strong[Backend Development:] .NET Runtime: C\#, ASP.NET Core, ASP.NET Framework
Node.js Runtime: TypeScript, JavaScript, Express.js, NestJS
ORM: Dapper, Entity Framework Core, TypeORM, Knex.js
Documentation: Swagger
Testing: xUnit, Jest

#strong[Identity & Access Management:] Auth0, Keycloak, Azure AD

#strong[Database:] MySQL, MSSQL

#strong[Cloud & Platform Services:] PaaS: Azure, Netlify, Vercel
Cloud Services: Azure AD, Azure DevOps, Azure Pipeline

#strong[DevOps:] Containerization: Docker, Docker Compose
CI\/CD: Jenkins, Azure Pipeline, Azure DevOps, GitHub Workflows
Version Control: Git, GitLab, GitHub

#strong[Automation:] Testing: Selenium, Selenium Grid
Remote Access: noVNC

#strong[Ways of working:] Architecture Patterns: Domain-Driven Design (DDD), Clean Architecture, Vertical Slice Architecture
Design Patterns: MVC, IoC, Observer, Facade, Factory, MVVM
Methodologies: Agile Scrum, Kanban

#strong[Development Tools:] API Documentation: Swagger
Diagramming: Camunda Modeler (BPMN), XMind (mindmaps), draw.io (ERD, comprehensive diagrams)
Communication: Slack, MS Teams
Project Management: OpenProject, Trello, Jira
