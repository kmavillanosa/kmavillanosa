// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.1.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Kim Cyriel S. Avillanosa",
  footer: context { [#emph[Kim Cyriel S. Avillanosa -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in Dec 2025] ],
  locale-catalog-language: "en",
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_partial_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2025,
    month: 12,
    day: 29,
  ),
)


= Kim Cyriel S. Avillanosa

#connections(
  [#connection-with-icon("location-dot")[Puerto Princesa City, Palawan, Philippines]],
  [#link("mailto:careers.kmavillanosa@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[careers.kmavillanosa\@gmail.com]]],
  [#link("https://kmavillanosa.github.io/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[kmavillanosa.github.io\/kmavillanosa]]],
  [#link("https://linkedin.com/in/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[kmavillanosa]]],
  [#link("https://github.com/kmavillanosa", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[kmavillanosa]]],
)


== About Me

Software developer with experience in web, desktop, and 3D applications.

Strong background in frontend engineering, system design, and maintainable architectures.

Enjoys collaborating with teams and continuously improving products.

== Experience

#regular-entry(
  [
    #strong[Cabinets by Computer], Front-End Developer (3D \/ WebGL)

    - Specialized in 3D graphics development (Three.js \/ WebGL)

    - Delivered production-ready visual implementations

    - Built internal automation and tooling

    - Mentored other developers

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

    - Assigned under Medgate Switzerland

    - Developed frontend features and internal tools

    - Conducted investigations, code reviews, and refactors

    - Prepared technical presentations for stakeholders

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

    - Provided architectural and technical guidance

    - Performed code reviews and optimizations

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

    - Led multinational development teams

    - Designed scalable system architectures

    - Implemented CI\/CD and Git workflows

    - Managed data migrations and deployments

    - Authored documentation and user manuals

    - Mentored engineers and optimized processes

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

    - Developed web services using Clean Architecture

    - Built integrations for desktop and web apps

    - Wrote documentation, unit tests, and deployment guides

    - Supervised tasks and optimized workflows

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

== Skills

#strong[Web:] TypeScript, JavaScript, Next.js, React, Tailwind, Material UI, Kendo, Bootstrap, CSS, Sass

#strong[State Management:] Redux, Zustand

#strong[3D \/ Visualization:] Three.js, D3, GraphQL

#strong[Desktop:] C\#, .NET Framework, .NET Core, WPF, WinForms, MVVM, IoC, Observer, Facade, Factory

#strong[Mobile:] React Native, Ionic React (basic)

#strong[Backend:] C\#, ASP.NET Core, Node.js, Express, NestJS, Dapper, EF Core

#strong[Identity & Access:] Auth0, Keycloak, Azure AD

#strong[DevOps:] Azure, Netlify, Vercel, Docker, Docker Compose, Jenkins, GitHub Workflows

#strong[Database:] MySQL, MSSQL
