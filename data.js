// ASMPT SCM application catalogue — sourced from ASMPT_SMT_IT__AppExport_20260204.xlsx
// 137 real applications with owner, future-roadmap index, integrations, etc.
window.ASMPT_DATA = {
  processes: [
    { id: 'PLM', name: 'Product Lifecycle Management', short: 'PLM' },
    { id: 'SCM', name: 'Supply Chain Management', short: 'SCM' },
    { id: 'CF', name: 'Corporate Functions', short: 'CF' },
    { id: 'CRM', name: 'Customer Relationship', short: 'CRM' },
  ],
  userScopes: ['ASMPT','SMT','PLS','PRS','SEMI','Enabler','Customer','Distributor','Supplier'],
  roadmapStatuses: ['Growth','Introduction','Sustain','Replace','Discontinue'],
  itilStages: ['Requirements','Approved','Test','Released','Operational','Retired'],
  hostingOptions: ['Cloud','Hybrid','On premise'],
  setupTypes: ['Off-the-shelf','Configured','Customised','Developed'],
  awsMigration: ['Out of scope','Pilot','In progress','Migrated'],
  criticalities: ['Critical','High','Medium','Low'],
  apps: [
  {
    "id": 1,
    "name": "Teamcenter",
    "description": "Product Lifecycle Management (PLM) platform enables the business to effectively manage product data, documents, and processes throughout the entire product lifecycle.",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Customised",
    "num_users": 1600,
    "provider": "SIEMENS Industry Software",
    "version": "TC 14.3.0.7",
    "owners": [],
    "it_contact": [
      "Gantz, Matthias"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2024-10-28",
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "compliant with relevant regulations, frequently tested for vulnerabilites, tested by HvS",
    "link": "TC Web Client (AWC - Active Workspace)",
    "doc_link": "TC Helppage",
    "integrated_to": [
      "SAP ERP",
      "COI BFlow",
      "Integrate",
      "NX",
      "PADS Layout/Logic",
      "PT PNA Library"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-20",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-001",
    "criticality": "Critical",
    "cloud_readiness_ist": 4.6,
    "cloud_readiness_soll": 5,
    "scor_maturity": 4,
    "bva": {
      "business": 94,
      "cost": 50,
      "risk": 75,
      "tech": 80
    },
    "bva_score": 78,
    "time_x": 66,
    "time_y": 84,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 2,
    "name": "NX",
    "description": "CAD/CAM tool offers set of tools for product design, simulation, and manufacturing, allowing engineers and designers to create and optimize complex, precise and detailed 3D models",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 100,
    "provider": "SIEMENS Industry Software",
    "version": "NX2312.8501",
    "owners": [
      "Bliem, Thomas"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2024-10-28",
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "NX Documentation",
    "integrated_to": [
      "Teamcenter"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-20",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-002",
    "criticality": "High",
    "cloud_readiness_ist": 4.6,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 70,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 69,
    "time_x": 36,
    "time_y": 38,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 3,
    "name": "PADS Layout/Logic",
    "description": "electronic design automation (EDA) software suite primarily used for printed circuit board (PCB) design process, from schematic capture to layout and manufacturing",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Configured",
    "num_users": 15,
    "provider": "SIEMENS EDA (former: Mentor Graphics)",
    "version": "PADS Vx2.5",
    "owners": [
      "Kornbichler, Andreas"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "PADS Documents (TC Helppage)",
    "integrated_to": [
      "Integrate",
      "Teamcenter"
    ],
    "successor": "PADS Professional;#5",
    "notes": "not decided yet, belongs to EDA strategy discussion with engineering business",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-003",
    "criticality": "Low",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 3.8,
    "scor_maturity": 4,
    "bva": {
      "business": 54,
      "cost": 65,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 38,
    "time_y": 78,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 4,
    "name": "Integrate",
    "description": "Integration between PADS Layout/Logic and Teamcenter used in MCH and SGP (SMT)",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Configured",
    "num_users": 15,
    "provider": "xPLM",
    "version": "integrate2",
    "owners": [
      "Sattler, Klaus"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "PADS documents (TC Helppage)",
    "doc_link": "",
    "integrated_to": [
      "PADS Layout/Logic",
      "Teamcenter"
    ],
    "successor": "EDA Gateway;#6",
    "notes": "not decided yet, belongs to EDA strategy discussion with engineering business",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-004",
    "criticality": "Low",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 2,
    "scor_maturity": 3,
    "bva": {
      "business": 54,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 55,
    "time_x": 35,
    "time_y": 35,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 5,
    "name": "PADS Professional",
    "description": "electronic design automation (EDA) software suite primarily used for printed circuit board (PCB) design process, from schematic capture to layout and manufacturing",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 0,
    "provider": "SIEMENS EDA (former: Mentor Graphics)",
    "version": "",
    "owners": [
      "Kornbichler, Andreas"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Introduction",
    "itil": "Requirements",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "not decided yet, belongs to EDA strategy discussion with engineering business",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Gantz, Matthias",
    "id_str": "APP-005",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 70,
    "time_y": 65,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 6,
    "name": "EDA Gateway",
    "description": "integration between PADS Pro and Teamcenter should be used in MCH and SGP (SMT)",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "SIEMENS EDA (former: Mentor Graphics)",
    "version": "",
    "owners": [
      "Kornbichler, Andreas"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Introduction",
    "itil": "Requirements",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "PADS Professional"
    ],
    "successor": "",
    "notes": "not decided yet, belongs to EDA strategy discussion with engineering business",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Gantz, Matthias",
    "id_str": "APP-006",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 2.8,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 53,
    "time_y": 86,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 7,
    "name": "EPLAN",
    "description": "CAE software suite primarily used for electrical engineering and automation design",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 15,
    "provider": "EPLAN",
    "version": "EPLAN2025",
    "owners": [
      "Obermeier, Christian",
      "Shuy, Eng Kim",
      "Oughton, Andy"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2025-09-30",
    "next_release": "2025-09-30",
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-10-10",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-007",
    "criticality": "Low",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 2.8,
    "scor_maturity": 3,
    "bva": {
      "business": 54,
      "cost": 75,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 57,
    "time_x": 28,
    "time_y": 47,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 8,
    "name": "COI BFlow",
    "description": "Archive system which contains released drawings from PLM and invoices, order confirmations, POs from SAP",
    "processes": [
      "PLM",
      "SCM",
      "CF",
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 450,
    "provider": "ISO Software Systeme",
    "version": "COI BFlow Version 12",
    "owners": [],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2025-10-15",
    "next_release": "2025-12-31",
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP",
      "Teamcenter"
    ],
    "successor": "",
    "notes": "going to be moved to webclient and remove client installation",
    "aws_migration": "In progress",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-10-10",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-008",
    "criticality": "High",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 3.6,
    "scor_maturity": 4,
    "bva": {
      "business": 83,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 65,
    "time_x": 29,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 9,
    "name": "Azure Dev Ops Server (TFS)",
    "description": "Azure DevOps Server is a source code management platform that provides a set of tools for managing the entire application development lifecycle, enabling teams to collaborate, plan, develop, test, and deliver software efficiently",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "Microsoft",
    "version": "Azure Dev Ops Server 2022.2 Patch2",
    "owners": [
      "Konrad, Johannes"
    ],
    "it_contact": [
      "Feuerecker, Manuela",
      "Koschinsky, Andreas (EXT)"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2025-02-23",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "GFO",
      "GFO Data Hub",
      "Polarion"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "In progress",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-11-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-009",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 35,
    "time_y": 43,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 10,
    "name": "SharePoint 2013",
    "description": "web-based collaborative platform that allows to create, manage, and share documents, information, and resources",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 3000,
    "provider": "Microsoft ",
    "version": "SP 2013",
    "owners": [],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Discontinue",
    "itil": "Retired",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "SharePoint Online;#95",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2024-10-30",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-010",
    "criticality": "Low",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.1,
    "scor_maturity": 2,
    "bva": {
      "business": 100,
      "cost": 65,
      "risk": 25,
      "tech": 40
    },
    "bva_score": 62,
    "time_x": 76,
    "time_y": 28,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 11,
    "name": "SharePoint 2019",
    "description": "web-based collaborative platform that allows to create, manage, and share documents, information, and resources",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 300,
    "provider": "Microsoft",
    "version": "SP 2019 Mai 2024",
    "owners": [
      "Schumann, Frank Jens"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": "2026-07-14",
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Project Server 2019"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "Pilot",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-10-10",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-011",
    "criticality": "High",
    "cloud_readiness_ist": 2.7,
    "cloud_readiness_soll": 3.5,
    "scor_maturity": 4,
    "bva": {
      "business": 80,
      "cost": 75,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 60,
    "time_x": 42,
    "time_y": 73,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 12,
    "name": "Project Server 2019",
    "description": "project management solution that enables organizations to plan, track, and manage projects, resources, and portfolios",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Configured",
    "num_users": 300,
    "provider": "Microsoft",
    "version": "2019",
    "owners": [
      "Schumann, Frank Jens"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": "2026-04-16",
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SharePoint 2019"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "Pilot",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-10-10",
    "modified_by": "Feuerecker, Manuela",
    "id_str": "APP-012",
    "criticality": "High",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 3,
    "bva": {
      "business": 80,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 64,
    "time_x": 26,
    "time_y": 24,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 13,
    "name": "SAP ERP",
    "description": "SMT global enterprise ERP solution for all entities & locations",
    "processes": [
      "SCM",
      "CRM",
      "CF",
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 1550,
    "provider": "SAP SE",
    "version": "ECC 6.0 - Rel. 740 SP21",
    "owners": [],
    "it_contact": [
      "Hofbauer, Alexandra"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-10",
    "modified_by": "Gantz, Matthias",
    "id_str": "APP-013",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 4,
    "bva": {
      "business": 94,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 66,
    "time_x": 27,
    "time_y": 40,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 14,
    "name": "SAP BW",
    "description": "Centralized Data warehouse solution integrated with SAP ERP and other data sources",
    "processes": [
      "SCM",
      "CRM",
      "CF",
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 220,
    "provider": "SAP SE",
    "version": "",
    "owners": [],
    "it_contact": [
      "Smith, Graham"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-10",
    "modified_by": "Gantz, Matthias",
    "id_str": "APP-014",
    "criticality": "High",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 2.8,
    "scor_maturity": 2,
    "bva": {
      "business": 77,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 60,
    "time_x": 43,
    "time_y": 40,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 15,
    "name": "SAP BO",
    "description": "Reporting solution integrated with SAP BW and other data sources",
    "processes": [
      "SCM",
      "CRM",
      "CF",
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 390,
    "provider": "SAP SE",
    "version": "",
    "owners": [],
    "it_contact": [
      "Smith, Graham"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-10",
    "modified_by": "Gantz, Matthias",
    "id_str": "APP-015",
    "criticality": "High",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 2.1,
    "scor_maturity": 2,
    "bva": {
      "business": 82,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 62,
    "time_x": 21,
    "time_y": 40,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 16,
    "name": "Power BI",
    "description": "Reporting solution with integration to SAP BW and other data sources",
    "processes": [
      "SCM",
      "CRM",
      "CF",
      "PLM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Customised",
    "num_users": 90,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Smith, Graham"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Hybrid",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "althought signed off from an app perspective all users should be aware of data sensitivity and consider in\r\n\r\nPower BI is also available in Teams as a plug in  ",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "around US$8 per month - licensing is required creator and reader to be able to view.  Free version available but data sensitivity and restrictions in place.   ",
    "modified": "2025-07-08",
    "modified_by": "Bleazard, Ian",
    "id_str": "APP-016",
    "criticality": "Medium",
    "cloud_readiness_ist": 4,
    "cloud_readiness_soll": 4.5,
    "scor_maturity": 3,
    "bva": {
      "business": 69,
      "cost": 50,
      "risk": 75,
      "tech": 60
    },
    "bva_score": 65,
    "time_x": 70,
    "time_y": 79,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 17,
    "name": "MES",
    "description": "MES solution from Critical Manufacturing mainly utilized within  the SCM Prefabrication & Electronic area. Integrated into SAP ERP.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 35,
    "provider": "Critical Manufacturing",
    "version": "7.3",
    "owners": [
      "Patzner, Toni"
    ],
    "it_contact": [
      "Eschbaumer, Stefan"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2021-01-10",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "Local user management. No SSL / https",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-017",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.9,
    "cloud_readiness_soll": 2.4,
    "scor_maturity": 4,
    "bva": {
      "business": 61,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 39,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 18,
    "name": "AWSLog",
    "description": "Shipment and distribution solution integrated with SAP ERP",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 400,
    "provider": "AWS Orgware",
    "version": "",
    "owners": [
      "Patzner, Toni"
    ],
    "it_contact": [
      "Schöll, Ingrid"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-018",
    "criticality": "High",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 2,
    "scor_maturity": 3,
    "bva": {
      "business": 82,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 62,
    "time_x": 35,
    "time_y": 39,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 19,
    "name": "GPIS",
    "description": "Global Purchasing Information System: solution for the central storage of external Contracts & Documents",
    "processes": [
      "SCM",
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 130,
    "provider": "Griscom",
    "version": "",
    "owners": [
      "Gerstner, Markus"
    ],
    "it_contact": [
      "Sailer, Martin",
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "GPIS",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-019",
    "criticality": "High",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 3.7,
    "scor_maturity": 4,
    "bva": {
      "business": 72,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 50,
    "time_x": 22,
    "time_y": 79,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 20,
    "name": "Ebydos",
    "description": "Invoice management solution integrated into SAP ERP",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "Kofax (Readsoft)",
    "version": "",
    "owners": [],
    "it_contact": [
      "Stijohann, Franz"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-020",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.9,
    "cloud_readiness_soll": 3.4,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 34,
    "time_y": 21,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 21,
    "name": "Modaly",
    "description": "Specific reporting solution of the purchasing department",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "",
    "version": "",
    "owners": [],
    "it_contact": [
      "Sailer, Martin"
    ],
    "future_roadmap": "Discontinue",
    "itil": "Retired",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-25",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-021",
    "criticality": "Low",
    "cloud_readiness_ist": 1.7,
    "cloud_readiness_soll": 1.7,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 25,
      "tech": 40
    },
    "bva_score": 40,
    "time_x": 57,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 22,
    "name": "Jonas",
    "description": "Vendor managed inventory solution. It allows the suppliers to verify the stocks by ASMPT (i.e., the quantity of the materials that they provide to ASMPT). It should be replaced by Jaegger in the future (possibly during 2027)",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 190,
    "provider": "Instant Solutions",
    "version": "",
    "owners": [
      "Vesterlund, Maria"
    ],
    "it_contact": [
      "Sailer, Martin"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2026-01-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-022",
    "criticality": "High",
    "cloud_readiness_ist": 2.7,
    "cloud_readiness_soll": 3.2,
    "scor_maturity": 3,
    "bva": {
      "business": 76,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 59,
    "time_x": 47,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 23,
    "name": "PT PNA Library",
    "description": "PNA library contains electrical and mechanical catalogue part information; the content is maintained and managed by SEMI",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "ASMPT SEMI Solutions",
    "version": "",
    "owners": [],
    "it_contact": [
      "Gantz, Matthias"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Teamcenter"
    ],
    "successor": "",
    "notes": "shall be fully migrated into Teamcenter, no due date defined yet",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-023",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 31,
    "time_y": 63,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 24,
    "name": "DB Direct",
    "description": "Banking & Clearing solution integrated with SAP ERP",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "Deutsche Bank",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-26",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-024",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.6,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 41,
    "time_y": 25,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 25,
    "name": "NAVAN",
    "description": "External travel expenses tool.\r\nFile transfer of cost elements from SAP and cost bookings to SAP.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "NAVAN",
    "version": "",
    "owners": [
      "Schatta, Christiane",
      "Friedrich, Dimitrij"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-24",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-025",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 62,
    "time_x": 32,
    "time_y": 33,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 26,
    "name": "ADP",
    "description": "External system for payroll and time management processes",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "ADP",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-026",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 23,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 27,
    "name": "AEB",
    "description": "Foreign trade system integrated with SAP ERP",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "AEB SE",
    "version": "",
    "owners": [],
    "it_contact": [
      "Schöll, Ingrid"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-027",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 2.5,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 40,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 28,
    "name": "EDI Seeburger",
    "description": "EDI solution for external business partners mainly used to interchange POs with vendors. Integrated with SAP ERP",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 80,
    "provider": "Seeburger",
    "version": "",
    "owners": [],
    "it_contact": [
      "Sailer, Martin",
      "Schöll, Ingrid"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "Jaggaer;#108",
    "notes": "Officially retired on 31.12.2023. Successor application is Jaegger (cloud based solution) which will be rolled out during 2024.\r\nNOTE: renewed!",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-26",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-028",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 4,
    "bva": {
      "business": 68,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 57,
    "time_x": 42,
    "time_y": 39,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 29,
    "name": "GFO",
    "description": "CRM enterprise private cloud solution for MarCom, Sales and Service based on the SAP C4C",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Customised",
    "num_users": 1250,
    "provider": "SAP SE",
    "version": "",
    "owners": [
      "Fröchling, Tabea"
    ],
    "it_contact": [
      "Philipp, Bianca"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP",
      "Customer Portal"
    ],
    "successor": "",
    "notes": "Mainly used by SMT but also by SEMI Germany",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-029",
    "criticality": "Critical",
    "cloud_readiness_ist": 4,
    "cloud_readiness_soll": 4.5,
    "scor_maturity": 4,
    "bva": {
      "business": 92,
      "cost": 50,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 73,
    "time_x": 30,
    "time_y": 32,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 30,
    "name": "SAP CPI",
    "description": "Middleware exclusively used to integrated different sources with the application GFO (SAP C4C)",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Enabler"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "SAP SE",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Discontinue",
    "itil": "Retired",
    "last_release": null,
    "next_release": null,
    "retirement": "2024-05-02",
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "SAP Integration Suite;#112",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2024-06-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-030",
    "criticality": "Low",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 1.8,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 25,
      "tech": 40
    },
    "bva_score": 45,
    "time_x": 73,
    "time_y": 33,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 31,
    "name": "CPQ",
    "description": "Cloud solution from Tacton to support the configuration and quoting process to end customers",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 550,
    "provider": "Tacton",
    "version": "",
    "owners": [
      "Kirchler, Arthur"
    ],
    "it_contact": [
      "Adjami, Nadine"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-031",
    "criticality": "Critical",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 3,
    "bva": {
      "business": 85,
      "cost": 50,
      "risk": 75,
      "tech": 40
    },
    "bva_score": 66,
    "time_x": 78,
    "time_y": 82,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 32,
    "name": "Lobster Data",
    "description": "Data integration platform (middleware) mainly used in the area of CPQ integration scenarios",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Enabler"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "Lobster",
    "version": "",
    "owners": [],
    "it_contact": [
      "Stratmann, Danny"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-20",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-032",
    "criticality": "High",
    "cloud_readiness_ist": 2.7,
    "cloud_readiness_soll": 3.2,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 75,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 87,
    "time_y": 87,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 33,
    "name": "MOPS",
    "description": "Machines, Options and Production Support.\r\nUsed in the printing production process for generating software keys, MPDs, Packlists and as a repository for machine configuration data.  Also used to track concession notes.",
    "processes": [
      "CRM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Lucas, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/operations/mops.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-033",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.9,
    "cloud_readiness_soll": 2.4,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 39,
    "time_y": 27,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 34,
    "name": "ASMPT Academy",
    "description": "eLearning platform from DOCEBO for the management of trainings and contents for both external & internal use cases",
    "processes": [
      "CRM",
      "CF"
    ],
    "users_scope": [
      "Customer",
      "Distributor",
      "SEMI",
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 5000,
    "provider": "Docebo",
    "version": "",
    "owners": [
      "Read, Phillip"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-034",
    "criticality": "Critical",
    "cloud_readiness_ist": 4.5,
    "cloud_readiness_soll": 5,
    "scor_maturity": 4,
    "bva": {
      "business": 100,
      "cost": 50,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 76,
    "time_x": 35,
    "time_y": 47,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 35,
    "name": "add.min CMS",
    "description": "Web Content Management & user authorization Management system mainly used by ASMPT internally.\r\nOn one hand, it allows the user to manage the content of the intranet and administer the authorization of users for the other add.min modules (e.g., DMS / Toolkit, SDC, FEX, ODA etc.).",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 61,
    "provider": "K&K",
    "version": "6.9.2",
    "owners": [
      "Holzer, Sarah",
      "Nailer, Jon"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2025-04-07",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "CMS",
    "doc_link": "ASMPT Web Applications",
    "integrated_to": [
      "add.min DMS",
      "Software Download Center (SDC)"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Zhu, Xinyu",
    "id_str": "APP-035",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 3,
    "bva": {
      "business": 66,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 56,
    "time_x": 30,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 36,
    "name": "SmartPM",
    "description": "Cloud based controlling tool used in the R&D departments",
    "processes": [
      "PLM",
      "SCM",
      "CRM",
      "CF"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Configured",
    "num_users": 50,
    "provider": "smartPM.solutions",
    "version": "",
    "owners": [
      "Vollmann, Christian"
    ],
    "it_contact": [
      "Feuerecker, Manuela"
    ],
    "future_roadmap": "Sustain",
    "itil": "Released",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Project Server 2019",
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-036",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 3,
    "bva": {
      "business": 64,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 66,
    "time_x": 22,
    "time_y": 38,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 37,
    "name": "WebShop",
    "description": "SMT online shop for customers integrated with SAP ERP. It contains spare parts and services.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Customer",
      "Distributor",
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": 7950,
    "provider": "FIS",
    "version": "",
    "owners": [
      "Wolff, Peter",
      "Müller, Anna"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": "2025-04-07",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "WebShop",
    "doc_link": "Web Shop document",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "Servers for Webshop in the Fujitsu network. Authentication performed using the Identify Portal.\r\nThe catalog viewer is developed by the Company Quanos and is integrated in the WebShop frontened.\r\n\r\nhttps://asmpac.sharepoint.com/:b:/r/sites/mchitsapteam-ext-mchitsapteam-project-smt-CRM/Shared%20Documents/CRM/IT_CRM_Web_Services/Spare_Parts_Catalog_Webshop_Infrastrukturbild.pdf?csf=1&web=1&e=L0bM4f",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-037",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 4,
    "bva": {
      "business": 100,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 68,
    "time_x": 48,
    "time_y": 23,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 38,
    "name": "Catalog Creator",
    "description": "Repository and Tool for the management of ASMPT SMT spare parts incl. describing information, drawings, etc.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Enabler"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Quanos",
    "version": "",
    "owners": [
      "Schock, Markus",
      "Ferencak, Kristian"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "WebShop"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-10-21",
    "modified_by": "Zhu, Xinyu",
    "id_str": "APP-038",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.7,
    "cloud_readiness_soll": 2.2,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 37,
    "time_y": 41,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 40,
    "name": "ODA",
    "description": "Offline document archive tool to subscribe online content and then download and store the data on local machine for offline use.\r\nIt collects data from Toolkit, Software Download Center, Spareparts Catalog, Tools Catalog and Knowledge Database",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [
      "Berger, Andreas"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-040",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.7,
    "cloud_readiness_soll": 2.2,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 22,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 41,
    "name": "Organisation Chart",
    "description": "Central register of all organization related data such as employees, departments, locations, etc.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": 2500,
    "provider": "Domino",
    "version": "",
    "owners": [
      "Mudge, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Discontinue",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "has been replaced by Workday, there is still a requirements for functionality into other domino apps and so this is now a background application",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Bleazard, Ian",
    "id_str": "APP-041",
    "criticality": "Low",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 1.6,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 40,
      "risk": 25,
      "tech": 40
    },
    "bva_score": 57,
    "time_x": 71,
    "time_y": 29,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 42,
    "name": "PDP",
    "description": "Performance Development Process.  A tool that records and supports the annual review process for employees. ",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 2800,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Mudge, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/hr/pdp.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-10",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-042",
    "criticality": "Critical",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 3,
    "bva": {
      "business": 99,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 59,
    "time_x": 33,
    "time_y": 65,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 43,
    "name": "ATR",
    "description": "Tool used in the request and gain approval for new employees and contract changes.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 2500,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Mudge, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/hr/atr.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-043",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.6,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 65,
    "time_x": 41,
    "time_y": 45,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 44,
    "name": "Nimbus",
    "description": "Process design and management tool used for internal documentation",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Tibco / Roc Technologies",
    "version": "",
    "owners": [
      "Ernst, Andreas",
      "Appleton, Mike"
    ],
    "it_contact": [
      "Zhu, Xinyu",
      "Appleton, Mike"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Hybrid",
    "security": "",
    "link": "Nimbus",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "ASMCONTROL\r\nWEYSV037",
    "aws_migration": "Migrated",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-11-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-044",
    "criticality": "Medium",
    "cloud_readiness_ist": 3.9,
    "cloud_readiness_soll": 3.9,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 60
    },
    "bva_score": 60,
    "time_x": 44,
    "time_y": 23,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 45,
    "name": "WK CAT",
    "description": "Tooling Catalog (Wekzeugkatalog) for special tool needed during onsite repair by the FSEs",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [
      "Berger, Andreas"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "WKCAT",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-045",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 46,
    "time_y": 22,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 46,
    "name": "Uptime",
    "description": "Bespoke tool used in the area of feeder repair with integration into SAP ERP",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Griscom",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-27",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-046",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 38,
    "time_y": 47,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 49,
    "name": "Customer Information Portal (CIP)",
    "description": "The Customer Information Portal allows the ASMPT and customer users to manage the licenses and have insights in the installed base",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Customer",
      "SMT",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": 1000,
    "provider": "Griscom",
    "version": "2.22.9.0",
    "owners": [
      "Stabl, Eduard"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Replace",
    "itil": "Retired",
    "last_release": null,
    "next_release": null,
    "retirement": "2024-03-04",
    "hosting": "On premise",
    "security": "Authentication by means of add.min user management",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "License Portal;#117",
    "notes": "The number of registered users is ~ 1.800 (incl. customers), but only a subset of them is regularly active.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-049",
    "criticality": "Low",
    "cloud_readiness_ist": 2.9,
    "cloud_readiness_soll": 4.4,
    "scor_maturity": 2,
    "bva": {
      "business": 90,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 56,
    "time_x": 44,
    "time_y": 65,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 50,
    "name": "Virtual Assist",
    "description": "Get access to documents, tutorials, troubleshooting guides, service reports, web pages, videos and other unstructured data sources for quick troubleshooting and efficient learning",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Customer",
      "SMT",
      "Distributor"
    ],
    "setup_type": "Customised",
    "num_users": 900,
    "provider": "Knowron",
    "version": "1.14.2",
    "owners": [
      "Leather, Jim"
    ],
    "it_contact": [
      "Isola, Daniele"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2025-03-20",
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "SSO integration with ASMPT Azure B2B AD. SSL / https, compliant with GDPR and other privacy measures",
    "link": "Virtual Assist",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": true,
    "cost": "Package of 1.000 active users per month",
    "modified": "2025-07-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-050",
    "criticality": "Critical",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 4,
    "bva": {
      "business": 89,
      "cost": 50,
      "risk": 75,
      "tech": 80
    },
    "bva_score": 76,
    "time_x": 82,
    "time_y": 86,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 51,
    "name": "GFO Data Hub",
    "description": "MSSQL based solution developed to support the integration (read-only) of GFO / C4C data.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Enabler"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Curexus",
    "version": "",
    "owners": [
      "Fröchling, Tabea"
    ],
    "it_contact": [
      "Philipp, Bianca"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Customer Portal",
      "License Portal"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-051",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 23,
    "time_y": 44,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 52,
    "name": "MBO",
    "description": "A tool used to record and track annual objectives and bonus payments.  Primarily used for senior managers and leaders in SMT.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 1800,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Mudge, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "MBO",
    "doc_link": "",
    "integrated_to": [],
    "successor": "Workday (GPS);#96",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-052",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.7,
    "cloud_readiness_soll": 4.2,
    "scor_maturity": 4,
    "bva": {
      "business": 95,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 58,
    "time_x": 27,
    "time_y": 63,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 53,
    "name": "Flexitime",
    "description": "Used to track flexitime.  Used primarily in Weymouth.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 400,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Cox, Abi"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "https://apps.asm-smt.com/hr/flexitime.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-053",
    "criticality": "High",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 2.1,
    "scor_maturity": 2,
    "bva": {
      "business": 82,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 60,
    "time_x": 21,
    "time_y": 21,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 54,
    "name": "Authorisation Matrix",
    "description": "Documents and publishes employees approval levels.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 2500,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Harrison, Emma"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/finance/auth.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-054",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 65,
    "time_x": 29,
    "time_y": 39,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 55,
    "name": "Bookings",
    "description": "Used to manage bookings for internal company events, for example town hall meetings, training, computer upgrades etc.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 2500,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/mis/bookings.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-055",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 65,
    "time_x": 42,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 56,
    "name": "Flow",
    "description": "A no-code environment for creating forms and adding workflow.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 2500,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Child, Terry"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/flow.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "Replace with Leap?",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-056",
    "criticality": "Critical",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 59,
    "time_x": 33,
    "time_y": 57,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 57,
    "name": "Domino Leap",
    "description": "A low-code environment for building form and workflows application.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 2500,
    "provider": "HCL",
    "version": "1.0.5",
    "owners": [
      "Child, Terry"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/volt-apps/secure/org/ide/manager.html",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-057",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 2,
    "bva": {
      "business": 98,
      "cost": 75,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 72,
    "time_x": 42,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 58,
    "name": "Team Service Desk",
    "description": "A simple ticketing system.  Supports multiple teams with a basic level of configuration for each team.  Based on the incidents module from SKMS and used by the non-IT teams that need a ticketing system.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Developed",
    "num_users": 200,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Child, Terry"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/servicedeskt.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-058",
    "criticality": "High",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 4,
    "bva": {
      "business": 76,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 58,
    "time_x": 31,
    "time_y": 28,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 59,
    "name": "Travel DB",
    "description": "Request, approval and track travel request.  Used primarily by employees in Weymouth.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": 400,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Hiscock, Gabrielle"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/engineering/bs.nsf/travel?openPage",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "Plan to repalce this with a tool from Wexus",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-059",
    "criticality": "High",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 3.9,
    "scor_maturity": 2,
    "bva": {
      "business": 82,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 53,
    "time_x": 39,
    "time_y": 83,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 60,
    "name": "Wexus Travel Tool",
    "description": "Used to request, approve, book and track travel requests.  Used primarily by Weymouth",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 400,
    "provider": "",
    "version": "",
    "owners": [
      "Hiscock, Gabrielle"
    ],
    "it_contact": [],
    "future_roadmap": "Introduction",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-060",
    "criticality": "High",
    "cloud_readiness_ist": 4.8,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 82,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 73,
    "time_x": 63,
    "time_y": 86,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 61,
    "name": "Tools Calibration",
    "description": "Track tools used by production and service engineers.  Documents calibration methods.  Tracks the calibration schedule and history of each tool.",
    "processes": [
      "CRM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Garbett, Josh"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/quality/ToolCalibration.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-061",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 29,
    "time_y": 37,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 62,
    "name": "Remind Me",
    "description": "A reminder tool with an audit log.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Child, Terry"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/dtg/remindme.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-062",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.7,
    "cloud_readiness_soll": 3.2,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 47,
    "time_y": 27,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 63,
    "name": "Approved Supplier Application (ASA)",
    "description": "A list of suppliers with workflows to approve new suppliers.  Stores key supplier documents (contracts, NDAs etc) with a review cycle to ensure they are up-to-date.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Marner, Jaime"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-063",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.5,
    "cloud_readiness_soll": 4,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 40,
    "time_y": 64,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 64,
    "name": "SCORES",
    "description": "Used for the ordering of spare/replacement parts.  Supports stock, non-stock and build parts.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Muntwyler, Marty"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/psp/scoresapp.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-064",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 23,
    "time_y": 36,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 65,
    "name": "iProposal",
    "description": "A CPQ tool for printing capital equipment focusing on the quoting part of the process.",
    "processes": [
      "CRM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/sales/iquote.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-065",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 3.5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 20,
    "time_y": 55,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 66,
    "name": "iDOES",
    "description": "A CPQ tool for printing capital equipment focusing on the ordering part of the process.",
    "processes": [
      "CRM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Discontinue",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/sales/iDoes.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-066",
    "criticality": "Low",
    "cloud_readiness_ist": 2.9,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 25,
      "tech": 40
    },
    "bva_score": 40,
    "time_x": 69,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 67,
    "name": "SNAR",
    "description": "Serial Number Alocation Register.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Lucas, David"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/operations/snar.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-067",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 2.8,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 28,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 68,
    "name": "Shortages",
    "description": "Used to track, manage and diagnose shortages for printer production.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Muntwyler, Marty"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/operations/shortage.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-068",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 48,
    "time_y": 26,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 69,
    "name": "PODS",
    "description": "Tracks printer machine production status.  Links to build instructions in ProWorks.  Links to Shortages and tracks other stoppages.  Provides a dashboard to show over all build status.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Whettingsteel, Kevin"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/operations/pods.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-069",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 30,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 70,
    "name": "ProWorks",
    "description": "Documents build processes",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "ProWorks",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-070",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 33,
    "time_y": 36,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 71,
    "name": "Inventory Adjustments",
    "description": "Tracks and approves inventory adjustments.",
    "processes": [
      "SCM",
      "CF"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/materials/InventoryAdjustments.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-071",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.9,
    "cloud_readiness_soll": 2.4,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 24,
    "time_y": 21,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 72,
    "name": "NCR",
    "description": "A quality managment tool that tracks non-conformances.  ",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "Supplier"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Garbutt, Neil"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "Replaced by the Q module in SAP?",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-072",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.7,
    "cloud_readiness_soll": 3.2,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 32,
    "time_y": 64,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 73,
    "name": "RTX Records",
    "description": "Used to manage custom licence keys for printing maching running V09.",
    "processes": [
      "SCM",
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Kirby, Sarah"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-073",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 2,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 20,
    "time_y": 38,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 74,
    "name": "E21:13",
    "description": "An application used to manage the software enginering process for the printing platforms.",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Symons, Karen"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-074",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 46,
    "time_y": 36,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 75,
    "name": "System Test Database",
    "description": "Used to manage the printing machine test resources.  Scheduling tests and equipement, capturing the results etc.",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Sheraz, Mohammed"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/engineering/systemtestdatabase.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-075",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 42,
    "time_y": 49,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 76,
    "name": "ECR Vendor Coms",
    "description": "Used to manage vendor communications and non-engineering tasks as part of the ECR process (from Team Center).",
    "processes": [
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Felstead, Paul"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/engineering/ecr.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-076",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 46,
    "time_y": 33,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 77,
    "name": "Engineered Products",
    "description": "Manage and track the production of engineered products (stencils and tooling).",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Hammond, Scott"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/PSP/ep.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-077",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 38,
    "time_y": 24,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 78,
    "name": "High-end Engineered Products",
    "description": "Used to capture the requirements and manage the production of high-end engineered products.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Hammond, Scott"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Introduction",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-078",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.6,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 51,
    "time_y": 85,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 79,
    "name": "Screens",
    "description": "Used to manage the production of Screens.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Hammond, Scott"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "To be replaced by HEP",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-079",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 30,
    "time_y": 65,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 80,
    "name": "Stencils and Tooling",
    "description": "Used to manage the production on stencils and tooling.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Hammond, Scott"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "Some modules have already been moved to EP, reminder to be moved to HEP.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-080",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 31,
    "time_y": 81,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 81,
    "name": "Vendor Web",
    "description": "A webport used by suppliers for the Printing products.",
    "processes": [
      "SCM",
      "PLM",
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Supplier",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Replace",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://www.dekvendors.com",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-081",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 15,
    "time_y": 83,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 82,
    "name": "Deployments",
    "description": "An application to record, approve and publish deployments to the IT enviornment.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Bleazard, Ian"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://apps.asm-smt.com/mis/deployments.nsf",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "used across group ",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Bleazard, Ian",
    "id_str": "APP-082",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 48,
    "time_y": 27,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 83,
    "name": "Track and Plan",
    "description": "Used to log defects, plan projects and maintenance cycles for the business solutions team.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": 25,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Child, Terry"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-083",
    "criticality": "Low",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 3,
    "bva": {
      "business": 58,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 27,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 84,
    "name": "Mural",
    "description": "advanced whiteboard application,  current use in SMT for collaborative working,  has been tested and in use already without teams integration",
    "processes": [],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Mural",
    "version": "",
    "owners": [],
    "it_contact": [
      "Jones, Lindsay"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.mural.co/",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "around US$20 per month per licensed user  for more information please go to the hyperlink to understand how the licensing works for visitors, etc",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-084",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.3,
    "cloud_readiness_soll": 4.8,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 23,
    "time_y": 26,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 85,
    "name": "Q&A app",
    "description": "Teams app to support the global town halls.",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [
      "Ee Guan Lim"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.microsoft.com/en-us/microsoft-365/blog/2021/08/26/from-windows-365-to-qa-in-microsoft-teams-meetings-heres-whats-new-in-microsoft-365/",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Microsoft product and so included in the basic group licensing",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-085",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.5,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 45,
    "time_y": 41,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 86,
    "name": "OneNote",
    "description": "Microsoft Note taking apps - cloud based, can share and collaborate with colleagues in a single note",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Hybrid",
    "security": "",
    "link": "https://www.microsoft.com/en-gb/microsoft-365/onenote/digital-note-taking-app",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included in standard Microsoft office licensing ",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-086",
    "criticality": "Medium",
    "cloud_readiness_ist": 3.4,
    "cloud_readiness_soll": 3.9,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 60
    },
    "bva_score": 60,
    "time_x": 24,
    "time_y": 40,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 87,
    "name": "Forms",
    "description": "Simple questionnaires and workflow,  part of the O365 suite",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "https://support.microsoft.com/en-us/office/introduction-to-microsoft-forms-bb1dd261-260f-49aa-9af0-d3dddcea6d69",
    "integrated_to": [],
    "successor": "",
    "notes": "Not currently used in SMT due to data protection restrictions in Germany",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included within our standard O365 licensing",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-087",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.9,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 29,
    "time_y": 32,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 88,
    "name": "Lists",
    "description": "Track information. Organize work. Customize for your team.",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.microsoft.com/en-gb/microsoft-365/microsoft-lists",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included in standard O365 licensing already",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-088",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.7,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 37,
    "time_y": 33,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 89,
    "name": "Channel Calendar",
    "description": "The Teams channel calendar app highlights meetings scheduled for a calendar and makes it easier for team members to attend these events. Meetings for all channels in a team are stored in a single calendar, so the app applies a filter to display the meetings belonging to the channel it is installed into.",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "https://office365itpros.com/2021/01/11/teams-channel-calendar/",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included in standard O365 licensing already",
    "modified": "2025-05-20",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-089",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.9,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 29,
    "time_y": 41,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 90,
    "name": "Tasks by Planner",
    "description": "The Tasks app in Microsoft Teams brings together your individual tasks from To Do and Outlook with your team tasks from Planner so you can more efficiently cross them off your lists.",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "https://support.microsoft.com/en-us/office/use-the-tasks-app-in-teams-e32639f3-2e07-4b62-9a8c-fd706c12c070",
    "integrated_to": [],
    "successor": "",
    "notes": "can also be created in SMT without full access to create a Group ( was automated into MCP)",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included in O365 licensing",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-090",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.7,
    "cloud_readiness_soll": 5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 37,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 91,
    "name": "AskMe Bot",
    "description": "automates the creation of teams and also will provide user support (in the future) for teams",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "AddIn365",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "included in teams licensing",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-091",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 42,
    "time_y": 27,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 92,
    "name": "Crowdstrike Falcon Fusion for Microsoft Teams",
    "description": "This is an add on available within MS Teams",
    "processes": [],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": null,
    "provider": "",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bill, Chris"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2023-03-15",
    "modified_by": "Child, Terry",
    "id_str": "APP-092",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.6,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 41,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 93,
    "name": "Add In Power Platform",
    "description": "This application is used by marketing to distribute organisational assets.",
    "processes": [],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "",
    "num_users": null,
    "provider": "AddIn365",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Introduction",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "For Marketing use only",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Bleazard, Ian",
    "id_str": "APP-093",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 2.5,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 65,
    "time_y": 94,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 94,
    "name": "Ivanti Neurons for Service Management",
    "description": "Service desk application used primarily by the IT department to manage all aspects if IT.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Configured",
    "num_users": 13000,
    "provider": "Ivanti",
    "version": "",
    "owners": [
      "Moody, Rob"
    ],
    "it_contact": [
      "Moody, Rob"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "Ivanti",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "As of July 2025, there are 437 IT analysts using Ivanti.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Payed Annually on a three year fixed term contract",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-094",
    "criticality": "Critical",
    "cloud_readiness_ist": 4.8,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 100,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 79,
    "time_x": 48,
    "time_y": 44,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 95,
    "name": "SharePoint Online",
    "description": "Used for collaboration and communication.  Supports document libraries, list and pages.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [
      "Bleazard, Ian"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "Approved",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Part of the E3 license?",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-095",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 42,
    "time_y": 46,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 96,
    "name": "Workday (GPS)",
    "description": "HR information system used to manage all worker data.  Employee portal for personal data, pay, holidays, sickness etc.  Used for performance management, annual reviews etc.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "Workday",
    "version": "",
    "owners": [
      "Pua Gim Wee"
    ],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "Workday",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-24",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-096",
    "criticality": "High",
    "cloud_readiness_ist": 4,
    "cloud_readiness_soll": 4.5,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 75,
      "tech": 80
    },
    "bva_score": 65,
    "time_x": 60,
    "time_y": 81,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 98,
    "name": "Marmind",
    "description": "Marketing planning tool for compaigns and alignement of tasks for the Marketing Team",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 100,
    "provider": "Marmind",
    "version": "",
    "owners": [],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "https://www.marmind.com/",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": false,
    "cost": "",
    "modified": "2026-01-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-098",
    "criticality": "High",
    "cloud_readiness_ist": 2.5,
    "cloud_readiness_soll": 3,
    "scor_maturity": 2,
    "bva": {
      "business": 70,
      "cost": 75,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 63,
    "time_x": 30,
    "time_y": 47,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 99,
    "name": "Visual Studio",
    "description": "integrated development environment (IDE) that is used for software development, coding, debugging, and testing applications",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": null,
    "provider": "Microsoft",
    "version": "several",
    "owners": [
      "Bliem, Thomas"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "often used by users which are working with Azure Dev Ops Server (TFS)  ",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-099",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.7,
    "cloud_readiness_soll": 2.2,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 22,
    "time_y": 25,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 100,
    "name": "Enterprise Architect",
    "description": " modeling and design tool used for visualizing, analyzing, and documenting complex systems and architectures in various domains, including software development, business processes, data management, and infrastructure",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "",
    "num_users": 100,
    "provider": "Sparx",
    "version": "multiple",
    "owners": [
      "Bliem, Thomas"
    ],
    "it_contact": [
      "Feuerecker, Manuela",
      "Newman, Dan"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "often used by users which are working in the area of systems engineering",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-100",
    "criticality": "High",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 3,
    "bva": {
      "business": 70,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 56,
    "time_x": 42,
    "time_y": 26,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 101,
    "name": "Altium",
    "description": "electronic design automation (EDA) that enables engineers and designers to create, design, and prototype printed circuit boards (PCBs) and related electronic systems",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": null,
    "provider": "Altium Ltd",
    "version": "",
    "owners": [
      "Oughton, Andy"
    ],
    "it_contact": [
      "Newman, Dan"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "should be part of the EDA strategy discussion with electrical engineering management",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-101",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 2.5,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 40,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 102,
    "name": "FastCAD",
    "description": "CAD software used for creating precise 2D drawings and drafting, commonly utilized in architectural, engineering, and construction industries",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": null,
    "provider": "Evolution Computing Inc.",
    "version": "",
    "owners": [
      "Oughton, Andy"
    ],
    "it_contact": [
      "Newman, Dan"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "EPLAN;#7",
    "notes": "should be replaced by EPLAN, licenses already available",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-102",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 4.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 43,
    "time_y": 64,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 103,
    "name": "Windchill",
    "description": "product lifecycle management (PLM) software used for managing and optimizing the entire lifecycle of a product, including product data management, collaboration, change management, and document control",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 20,
    "provider": "PTC",
    "version": "11",
    "owners": [
      "Bliem, Thomas"
    ],
    "it_contact": [
      "Newman, Dan"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Creo"
    ],
    "successor": "",
    "notes": "solar product data still stored in Windchill",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-103",
    "criticality": "Low",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 3,
    "bva": {
      "business": 56,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 56,
    "time_x": 44,
    "time_y": 33,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 104,
    "name": "Creo",
    "description": "CAD software used for 3D modeling, product design, simulation, and manufacturing",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "",
    "num_users": 20,
    "provider": "PTC",
    "version": "4",
    "owners": [
      "Bliem, Thomas"
    ],
    "it_contact": [
      "Newman, Dan"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Windchill"
    ],
    "successor": "",
    "notes": "solar design engineering is done in Creo ",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-104",
    "criticality": "Low",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 3,
    "bva": {
      "business": 56,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 23,
    "time_y": 39,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 107,
    "name": "Polarion",
    "description": "Application lifecycle management (ALM) to combine software development with product lifecycle process, major purpose so far is the engineering requirements management  ",
    "processes": [
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "SIEMENS Industry Software",
    "version": "2310",
    "owners": [
      "Kainz, Gerd"
    ],
    "it_contact": [
      "Isola, Daniele"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2024-03-12",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "SSL configured.\r\nLDAPS configured",
    "link": "Polarion",
    "doc_link": "Siemens Polarion Online Help",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Pilot",
    "ai_relevant": false,
    "cost": "Based on annual fee calculated on floating licenses (overall 10, split between ALM Admin, Contributor and Reviewer)",
    "modified": "2025-11-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-107",
    "criticality": "High",
    "cloud_readiness_ist": 1.5,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 75,
      "tech": 40
    },
    "bva_score": 57,
    "time_x": 60,
    "time_y": 85,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 108,
    "name": "Jaggaer",
    "description": "eProcurement Solution from Jaggaer, currently implemented for SMT, number of SMT-users will increase 2024\r\n(End of 2023, SEMI decided not to introduce this Tool yet)",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 20,
    "provider": "Jaggaer",
    "version": "",
    "owners": [
      "Rajkay, David"
    ],
    "it_contact": [
      "Eschbaumer, Stefan"
    ],
    "future_roadmap": "Introduction",
    "itil": "Released",
    "last_release": "2024-01-14",
    "next_release": "2024-02-19",
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "The first phase of the Implementation Project is to replace the discontinued Seeburger-WebEDI-Portal begin of 2024 (incl. the required SAP ERP-Integration).\r\nTeamcenter-Integration will also be required for later phases.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Costs see Contract with Jaggaer, which has been signed end of September 2023.",
    "modified": "2025-05-27",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-108",
    "criticality": "Low",
    "cloud_readiness_ist": 4.7,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 56,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 62,
    "time_y": 69,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 109,
    "name": "Decisions",
    "description": "Decisions integrates with the Microsoft tools you already use every day, including Teams, Outlook, Word, OneNote, SharePoint/OneDrive, Planner and more. That means more productivity, efficiency and collaboration — without switching between apps",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 60,
    "provider": "",
    "version": "",
    "owners": [
      "Zimmermann, Frank"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.meetingdecisions.com/",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-109",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.3,
    "cloud_readiness_soll": 4.8,
    "scor_maturity": 3,
    "bva": {
      "business": 66,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 67,
    "time_x": 33,
    "time_y": 22,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 110,
    "name": "Celonis",
    "description": "Process Mining Tool",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "Celonis",
    "version": "",
    "owners": [
      "Zimmermann, Frank"
    ],
    "it_contact": [
      "Eschbaumer, Stefan"
    ],
    "future_roadmap": "Discontinue",
    "itil": "Retired",
    "last_release": null,
    "next_release": null,
    "retirement": "2023-03-01",
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Licence has expired on 01.03.2023 and has not been renewed.",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-110",
    "criticality": "Low",
    "cloud_readiness_ist": 4.3,
    "cloud_readiness_soll": 4.3,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 25,
      "tech": 80
    },
    "bva_score": 53,
    "time_x": 58,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 111,
    "name": "Office 365",
    "description": "Placeholder for the Office 365 Suite (incl. SharePoint online etc.)",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "Microsoft",
    "version": "",
    "owners": [],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2024-06-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-111",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 22,
    "time_y": 29,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 112,
    "name": "SAP Integration Suite",
    "description": "Integration Suite as successor of the former CPI solution / HCI - now also known as \"Cloud Integration Suite\" (CIS)",
    "processes": [
      "CF",
      "CRM",
      "SCM"
    ],
    "users_scope": [
      "Enabler"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "SAP",
    "version": "",
    "owners": [],
    "it_contact": [
      "Hofbauer, Alexandra"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-12-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-112",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.4,
    "cloud_readiness_soll": 4.9,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 62,
    "time_x": 24,
    "time_y": 43,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 113,
    "name": "Global ECP List (DB)",
    "description": "Web application for purchasing to handle / analyse the ECP List globally. The integration with TeamCenter and SAP (MM / QM;  LE / WM) is unidirectional from the source systems to this tool. The protocol shall be MS Excel lists.",
    "processes": [
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Griscom",
    "version": "",
    "owners": [
      "Sesterheim, Stefan"
    ],
    "it_contact": [
      "Koschinsky, Andreas (EXT)"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "https://intranet.smt.asmpt.com/ecp",
    "doc_link": "",
    "integrated_to": [
      "Teamcenter",
      "SAP ERP",
      "Power BI"
    ],
    "successor": "",
    "notes": "\r\nStefan Sesterheim requested the setup of a duplicate ECP-List-DB for Projects in 2024.\r\n\r\n\r\n\r\n\r\n Active used files:\r\n ECR:\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\GlobalChangeReport\\Backup\\GlobalChangeReport_full.csv\r\n\r\n Material:\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\critical parts\\critical RW10.xlsx\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\Global Stock.xls\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\Global Blockstock.xls\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\R5P\\R5P_01.xls\r\n\r\n Purchasevoucher:\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\ZM06EL00.xls\r\n \\\\Mchsv102\\SCM1-Source\\Rohdaten für Datenbank\\ZM06EL00 intern.xls\r\n\r\n Source systems are not directly defined. But at least TeamCenter is one of the sources which creates one or more of these files.\r\n For ECP only Excel files are relevant and can be maintained by ECP Admin (Sesterheim, Kanning). They also define which data should be read out from which column of which data type. The Teamcenter or other sources are not known to ECP.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "one-time development costs and annual maintenance fee",
    "modified": "2026-01-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-113",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 2.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 36,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 114,
    "name": "CleverReach",
    "description": "This Cloud based tool is operated by MarCom department for marketing campaign and newsletters.\r\nmarketing email systems that support broad email marketing campaigns.  Used for internal and external contact.  Has metrics on calls, open, click and everything you could ever wish.  Intergated into GFO",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": null,
    "provider": "CleverReach",
    "version": "",
    "owners": [
      "Nailer, Jon"
    ],
    "it_contact": [
      "Philipp, Bianca"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.cleverreach.com/en-de/",
    "doc_link": "",
    "integrated_to": [
      "GFO"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "SaaS",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-114",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.8,
    "cloud_readiness_soll": 5,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 64,
    "time_x": 28,
    "time_y": 48,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 115,
    "name": "Copilot Office 365",
    "description": "Copilot for Office 365 is an AI-powered assistant integrated into Microsoft Office 365 applications, such as Word, Excel, PowerPoint, and Outlook. It helps users enhance productivity by offering features like automated text generation, data analysis, task management, and personalized suggestions. Essentially, it's like having a digital co-worker who assists you in completing tasks more efficiently and effectively.",
    "processes": [
      "CF",
      "CRM",
      "SCM",
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": 130,
    "provider": "Microsoft",
    "version": "",
    "owners": [
      "Sheriff, Steve"
    ],
    "it_contact": [
      "Jones, Lindsay"
    ],
    "future_roadmap": "Introduction",
    "itil": "Test",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": true,
    "cost": "",
    "modified": "2025-07-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-115",
    "criticality": "High",
    "cloud_readiness_ist": 4,
    "cloud_readiness_soll": 4.5,
    "scor_maturity": 2,
    "bva": {
      "business": 72,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 69,
    "time_x": 55,
    "time_y": 85,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 116,
    "name": "Customer Portal",
    "description": "The Customer Portal is the \"one stop shop\" solution for the SMT customers. It provides access to key data and information: overview of the spare part orders, hotline tickets (i.e., corrective service) and defects, machines at a customer location, installed software and possible upgrades, new software features, training (incl. progress team overview for managers), and way more. The Portal offers a seamless integration with the other ASMPT SMT Online Tools leveraging a modern Single Sign On solution (i.e., Identity Portal).",
    "processes": [
      "CF",
      "CRM"
    ],
    "users_scope": [
      "Customer",
      "SMT",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": 680,
    "provider": "Griscom and partners",
    "version": "4.1.0.9",
    "owners": [
      "Norlander, Thomas"
    ],
    "it_contact": [
      "Isola, Daniele"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2025-11-06",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "SSL / certificates.",
    "link": "Customer Portal",
    "doc_link": "CP SharePoint",
    "integrated_to": [
      "GFO Data Hub",
      "GFO",
      "SAP Integration Suite",
      "ASMPT Academy",
      "WebShop"
    ],
    "successor": "",
    "notes": "As of 2025.11.24, we have 680 users (SMT + customers)",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "SLA with Griscom and other partners (i.e., part of the yearly sustaining budget).",
    "modified": "2025-11-24",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-116",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 3,
    "bva": {
      "business": 87,
      "cost": 40,
      "risk": 75,
      "tech": 40
    },
    "bva_score": 65,
    "time_x": 82,
    "time_y": 62,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 117,
    "name": "License Portal",
    "description": "New solution for administration of the WORKS software licenses. IT replaces the former Customer Information Portal (CIP) solution developed by Griscom in the past. The new solution is seamless integrated with the new Customer Portal and Identity Portal, offering a modern, fresh user experience for customers and SMT users.",
    "processes": [
      "CRM",
      "PLM"
    ],
    "users_scope": [
      "SMT",
      "Customer",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": 1000,
    "provider": "Griscom",
    "version": "v4.1.0.6",
    "owners": [
      "Stabl, Eduard",
      "Kratzke, Andreas"
    ],
    "it_contact": [
      "Isola, Daniele",
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2025-08-04",
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "SSL",
    "link": "License Portal",
    "doc_link": "LP Documentation",
    "integrated_to": [
      "Customer Portal",
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "SLA with Griscom, part of sustaining budget. New development managed as separate budget / project.",
    "modified": "2025-10-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-117",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 3,
    "bva": {
      "business": 90,
      "cost": 40,
      "risk": 75,
      "tech": 40
    },
    "bva_score": 66,
    "time_x": 71,
    "time_y": 75,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 118,
    "name": "Identity Portal",
    "description": "The Identity Portal allows the ASMPT SMT organization and customers to centrally manage the identity profiles and high-level authorization  for accessing the Online Tools.  The solution provides self-service capabilities to reduce the administration overhead, and it guarantees a seamless integration (i.e., Single Sign On) with all the SMT Online Tools (i.e., Toolkit, WebShop, Academy, etc.).",
    "processes": [
      "CF",
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Customer",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": 11000,
    "provider": "Griscom",
    "version": "v4.1.0.4",
    "owners": [
      "Bleazard, Ian"
    ],
    "it_contact": [
      "Isola, Daniele"
    ],
    "future_roadmap": "Growth",
    "itil": "Operational",
    "last_release": "2025-08-04",
    "next_release": null,
    "retirement": null,
    "hosting": "Hybrid",
    "security": "Granted by Azure and encryption.",
    "link": "Identity Portal",
    "doc_link": "Identity Portal",
    "integrated_to": [
      "Customer Portal",
      "License Portal",
      "ASMPT Academy",
      "ODA",
      "WebShop"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Azure B2C for customer users has limited running costs. The SMT users are part of the existing Azure B2B / Office 365.",
    "modified": "2025-10-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-118",
    "criticality": "Critical",
    "cloud_readiness_ist": 3.7,
    "cloud_readiness_soll": 4.2,
    "scor_maturity": 4,
    "bva": {
      "business": 100,
      "cost": 40,
      "risk": 75,
      "tech": 60
    },
    "bva_score": 74,
    "time_x": 82,
    "time_y": 64,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 119,
    "name": "Toolkit",
    "description": "This is the frontend (i.e., UI) of the Document Management System add.min DMS.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Customer"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [
      "Holzer, Sarah",
      "Nailer, Jon"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "Toolkit",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [
      "Identity Portal",
      "add.min DMS"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-119",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.9,
    "cloud_readiness_soll": 2.4,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 24,
    "time_y": 22,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 120,
    "name": "add.min DMS",
    "description": "Backened of the Document Management System. It contains documents such as Technical Information, Installation Manuals, PRS etc.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Enabler"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "K&K",
    "version": "4.22",
    "owners": [
      "Holzer, Sarah",
      "Nailer, Jon"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "add.min DMS",
    "doc_link": "ASMPT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-120",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 29,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 121,
    "name": "File Exchange (FEX)",
    "description": "FEX is the solution used in the organization to perform secure data transfer (i.e., exchange big files) over internet.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [
      "Kratzke, Andreas",
      "Kutta, Werner"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "FEX",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-121",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.3,
    "cloud_readiness_soll": 4.8,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 57,
    "time_x": 33,
    "time_y": 26,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 122,
    "name": "Component Support Online (CSO)",
    "description": "Access to the online SIPLACE nozzle library. Operators and users of SIPLACE placement machines can find nozzles quickly and reliably, for a large number of component shapes, and can order them online, immediately.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Customer",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Griscom",
    "version": "",
    "owners": [
      "Moosmang, Josef"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "CSO",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-23",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-122",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.3,
    "cloud_readiness_soll": 2.8,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 43,
    "time_y": 34,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 123,
    "name": "Solution Viewer",
    "description": "Tool that offers the possibility to configure a visual representation of a production line.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Die Haptiker",
    "version": "",
    "owners": [
      "Lettenbauer, Johannes"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "Solution Viewer",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-26",
    "modified_by": "Zhu, Xinyu",
    "id_str": "APP-123",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 31,
    "time_y": 28,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 124,
    "name": "Feeder Label Tool",
    "description": "Tool used to create the label that needs to be reprinted for a given feeder.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Holger Kraft (Freelancer)",
    "version": "",
    "owners": [
      "Holzer, Sarah"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "Feeder Label Tool",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-124",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 27,
    "time_y": 35,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 125,
    "name": "Software Download Center (SDC)",
    "description": "SDC contains the WORKS SW that can be downloaded for installation (incl. integration",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "Customer",
      "Distributor"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "For intranet has to login to intranet at first, then access to SDC. Otherwise internet access via IdP",
    "link": "SDC",
    "doc_link": "",
    "integrated_to": [
      "Identity Portal",
      "License Portal"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-10",
    "modified_by": "Zhu, Xinyu",
    "id_str": "APP-125",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 33,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 126,
    "name": "KNOBA",
    "description": "Knowledge Database (KNOBA) is the tool that provides access to internal knowledge base",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [
      "Berger, Andreas"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Replace",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "KNOBA",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [
      "ODA"
    ],
    "successor": "",
    "notes": "Idea could be to use Virtual Assist.",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-126",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 3.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 35,
      "tech": 40
    },
    "bva_score": 42,
    "time_x": 18,
    "time_y": 81,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 127,
    "name": "Web Repair Tool",
    "description": "Tools that support the machine online repair (WRT).",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Applied Systems",
    "version": "",
    "owners": [
      "Bedö, Mario"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "Has to login to intranet at first, then access to WRT.",
    "link": "WRT",
    "doc_link": "ASMPT SMT Web Applications",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-12-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-127",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.8,
    "cloud_readiness_soll": 2.3,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 23,
    "time_y": 21,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 128,
    "name": "Test Equipment Database",
    "description": "Management of tests in production/repair, etc.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Applied Systems",
    "version": "",
    "owners": [
      "Bedö, Mario"
    ],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "Has to login to intranetat first, then access to TEQDB",
    "link": "TEQDB",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-128",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 31,
    "time_y": 27,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 129,
    "name": "Vendor Contract Manager",
    "description": "Solution to manage contracts with the vendors",
    "processes": [
      "CF",
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Griscom",
    "version": "",
    "owners": [],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "Access via Intranet authentication.",
    "link": "VCM",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-129",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.9,
    "cloud_readiness_soll": 3.4,
    "scor_maturity": 4,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 49,
    "time_y": 45,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 130,
    "name": "Attachment Server",
    "description": "This is the attachment server to store the logs / findings from what happens in production at the customer. It is used by GFO and AzureDevOps",
    "processes": [
      "CRM",
      "PLM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [],
    "it_contact": [
      "Philipp, Bianca"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "GFO",
      "Azure Dev Ops Server (TFS)"
    ],
    "successor": "",
    "notes": "Technical Support K&K / Andreas Koschinsky, Connected to TFS/GFO (SAP C4C).\r\nMigrated to Azure Cloud (P + Q) in year 2024",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-06-23",
    "modified_by": "Zhu, Xinyu",
    "id_str": "APP-130",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.2,
    "cloud_readiness_soll": 4.7,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 57,
    "time_x": 22,
    "time_y": 21,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 131,
    "name": "Spreadly",
    "description": "Digital business card for mobile",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Spreadly",
    "version": "",
    "owners": [
      "Fritz, Bernhard"
    ],
    "it_contact": [
      "Zhu, Xinyu",
      "Adjami, Nadine"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-131",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 2.5,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 40,
    "time_y": 45,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": false
  },
  {
    "id": 132,
    "name": "SMT Website",
    "description": "This the official ASMPT SMT Website.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "Customer"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "HTCM",
    "version": "",
    "owners": [
      "Holzer, Sarah",
      "Nailer, Jon"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "SMT Website",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-132",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 31,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 133,
    "name": "Picture Database",
    "description": "Solution of the MarCom team to provide access to the pictures that a user (e.g., customer) can download.",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "Customer",
      "SMT"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "HTCM",
    "version": "",
    "owners": [
      "Holzer, Sarah",
      "Nailer, Jon"
    ],
    "it_contact": [],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "PictureDB",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-133",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.4,
    "cloud_readiness_soll": 2.9,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 29,
    "time_y": 23,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 134,
    "name": "DEK Knowledge database",
    "description": "Knowledge database built for DEK printers",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT",
      "PRS"
    ],
    "setup_type": "Developed",
    "num_users": null,
    "provider": "Business Solutions Team",
    "version": "",
    "owners": [
      "Nailer, Jon"
    ],
    "it_contact": [
      "Child, Terry"
    ],
    "future_roadmap": "Sustain",
    "itil": "",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "DEK Knoba",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-07-08",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-134",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.6,
    "cloud_readiness_soll": 3.1,
    "scor_maturity": 2,
    "bva": {
      "business": 50,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 49,
    "time_x": 31,
    "time_y": 31,
    "stufe1_complete": true,
    "stufe2_complete": false,
    "stufe3_complete": false
  },
  {
    "id": 135,
    "name": "Intranet",
    "description": "This is the SMT intranet developed on top of the add.min CMS tool.\r\nIt offers access to several other tools and services of the SMT Business Application Portfolio.",
    "processes": [
      "CF",
      "CRM",
      "PLM",
      "SCM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "K&K",
    "version": "",
    "owners": [],
    "it_contact": [
      "Zhu, Xinyu"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "Intranet",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-05-22",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-135",
    "criticality": "Medium",
    "cloud_readiness_ist": 1.6,
    "cloud_readiness_soll": 2.1,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 21,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 136,
    "name": "Canva",
    "description": "Support to marketing for the creation of content, it has a range of templates that can be used to speed up the process and an AI agent that can support\r\n\r\n",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "ASMPT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 25,
    "provider": "Canva",
    "version": "Cloud based",
    "owners": [
      "Maverick Teck Wei Lim"
    ],
    "it_contact": [
      "Turner, Tracey"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "https://www.canva.com/?msockid=08dcf3c642d46f8938ade5d743776e91",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": true,
    "cost": "Annual Enterprise agreement.  Have taken minimum number of users for the enterprise agreement ",
    "modified": "2025-07-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-136",
    "criticality": "Low",
    "cloud_readiness_ist": 4.9,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 58,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 66,
    "time_x": 29,
    "time_y": 26,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 137,
    "name": "KINEXON Order Tracking and Process Management",
    "description": "KINEXON OS is a real-time automation platform for tracking and controlling moving assets (e.g., machines, trolleys) in production and logistics. It uses UWB-based RTLS technology and offers features such as digital twin and process automation.\r\n(This entry in the Application Catalog also includes the tool \"AutomatedBookingSystem\", which is an in-house development of SMT SCM 2. - see \"Technical characteristics\")",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "PLS"
    ],
    "setup_type": "Customised",
    "num_users": 30,
    "provider": "Kinexon",
    "version": "GUI release: 3.13.0 Server release: 3.13.0 Control-center release: 2.40.3",
    "owners": [
      "Markus, Philipp"
    ],
    "it_contact": [
      "Eschbaumer, Stefan",
      "Genth, Carsten"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "VPN tunnel for Kinexon to the servers for maintenance and support",
    "link": "Digital Production Toolkit",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Annual license fees (4-year term, starting in 2025) and annual service contract.",
    "modified": "2025-07-14",
    "modified_by": "Eschbaumer, Stefan",
    "id_str": "APP-137",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.2,
    "cloud_readiness_soll": 2.7,
    "scor_maturity": 3,
    "bva": {
      "business": 60,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 54,
    "time_x": 42,
    "time_y": 41,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 138,
    "name": "8x8 Contact Center",
    "description": "Cloud-based, customer engagement platform that enables businesses to deliver seamless, omnichannel support (voice is the implemented solution for now). It offers intelligent routing, real-time analytics, agent and supervisor workspaces, and CRM integrations to streamline operations and enhance customer experiences",
    "processes": [
      "CRM"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "8x8",
    "version": "",
    "owners": [
      "Moschinsky, David"
    ],
    "it_contact": [
      "Perkins, Alex"
    ],
    "future_roadmap": "Growth",
    "itil": "Released",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "GFO"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "",
    "ai_relevant": false,
    "cost": "Contract with Ampito",
    "modified": "2025-11-06",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-138",
    "criticality": "High",
    "cloud_readiness_ist": 4.1,
    "cloud_readiness_soll": 4.6,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 75,
      "tech": 80
    },
    "bva_score": 65,
    "time_x": 71,
    "time_y": 64,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 139,
    "name": "Articulate",
    "description": "New tools used to prepared new training material, including translations and AI capabilities.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Configured",
    "num_users": null,
    "provider": "Articulate",
    "version": "",
    "owners": [
      "Dickinson, Matt",
      "Bayley, Kevin"
    ],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Introduction",
    "itil": "Released",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": true,
    "cost": "",
    "modified": "2025-11-06",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-139",
    "criticality": "Medium",
    "cloud_readiness_ist": 4.8,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 65,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 62,
    "time_x": 73,
    "time_y": 78,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 140,
    "name": "VinciWorks-eLearning",
    "description": "Tool to prepare training material that administrator (e.g., HR) can upload to Academy. ",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT"
    ],
    "setup_type": "Off-the-shelf",
    "num_users": 400,
    "provider": "VinciWorks",
    "version": "",
    "owners": [
      "Rowland, Beth"
    ],
    "it_contact": [
      "Bleazard, Ian"
    ],
    "future_roadmap": "Introduction",
    "itil": "Released",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "Cloud",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "ASMPT Academy"
    ],
    "successor": "",
    "notes": "Approval Request for ServiceReq#95610",
    "aws_migration": "Out of scope",
    "ai_relevant": false,
    "cost": "£5,000",
    "modified": "2025-11-06",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-140",
    "criticality": "High",
    "cloud_readiness_ist": 4.9,
    "cloud_readiness_soll": 5,
    "scor_maturity": 3,
    "bva": {
      "business": 82,
      "cost": 75,
      "risk": 60,
      "tech": 80
    },
    "bva_score": 75,
    "time_x": 74,
    "time_y": 75,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 141,
    "name": "MCP",
    "description": "MCP (Meta-directory Control Program) is an internal tool used for \"internal user account\" provisioning, including WorkDay employee interfaces. Focus is on SMT team, but ASMPT users are also managed if access to SMT apps is required.",
    "processes": [
      "CF"
    ],
    "users_scope": [
      "SMT",
      "Enabler"
    ],
    "setup_type": "Developed",
    "num_users": 5000,
    "provider": "Griscom",
    "version": "5.3.3.27",
    "owners": [
      "Sheriff, Steve"
    ],
    "it_contact": [
      "Koschinsky, Andreas (EXT)"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "Workday (GPS)",
      "Organisation Chart"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "In progress",
    "ai_relevant": false,
    "cost": "",
    "modified": "2025-12-17",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-141",
    "criticality": "Critical",
    "cloud_readiness_ist": 2.9,
    "cloud_readiness_soll": 4.1,
    "scor_maturity": 3,
    "bva": {
      "business": 100,
      "cost": 40,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 66,
    "time_x": 34,
    "time_y": 29,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 142,
    "name": "ATM Backend SAP",
    "description": "This is the ATM (SEMI) SAP backend used to synchronize / mirror purchased orders, good receipt, invoice receipt.",
    "processes": [
      "SCM",
      "CF"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "SAP",
    "version": "",
    "owners": [
      "Grgic, Ivana"
    ],
    "it_contact": [
      "Sailer, Martin"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [
      "SAP ERP"
    ],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": false,
    "cost": "Internal costs",
    "modified": "2026-01-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-142",
    "criticality": "Medium",
    "cloud_readiness_ist": 2.1,
    "cloud_readiness_soll": 2.6,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 26,
    "time_y": 30,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  },
  {
    "id": 143,
    "name": "SEMI PO Web",
    "description": "Program web tool used by SEMI and SMT to check the status of the order.",
    "processes": [
      "SCM"
    ],
    "users_scope": [
      "SMT",
      "SEMI"
    ],
    "setup_type": "Customised",
    "num_users": null,
    "provider": "SAP / Teamcenter",
    "version": "",
    "owners": [
      "Vesterlund, Maria"
    ],
    "it_contact": [
      "Sailer, Martin",
      "Ballweg, Michael"
    ],
    "future_roadmap": "Sustain",
    "itil": "Operational",
    "last_release": null,
    "next_release": null,
    "retirement": null,
    "hosting": "On premise",
    "security": "",
    "link": "",
    "doc_link": "",
    "integrated_to": [],
    "successor": "",
    "notes": "",
    "aws_migration": "Out of scope",
    "ai_relevant": false,
    "cost": "",
    "modified": "2026-01-21",
    "modified_by": "Isola, Daniele",
    "id_str": "APP-143",
    "criticality": "Medium",
    "cloud_readiness_ist": 2,
    "cloud_readiness_soll": 2.5,
    "scor_maturity": 3,
    "bva": {
      "business": 50,
      "cost": 50,
      "risk": 60,
      "tech": 40
    },
    "bva_score": 51,
    "time_x": 25,
    "time_y": 20,
    "stufe1_complete": true,
    "stufe2_complete": true,
    "stufe3_complete": true
  }
]
};
