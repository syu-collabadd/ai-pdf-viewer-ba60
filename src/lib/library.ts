// Sample document library — emulates a Google Drive shared folder of PDFs.
// Each "doc" has page-level chunks so the AI can cite [file.pdf#page=N] precisely.
// In production this would be populated by ingesting PDFs and chunking per-page;
// for the demo we hand-author realistic safety/HR policy content.

export type PageChunk = {
  page: number;
  text: string;
};

export type Doc = {
  id: string; // url-safe id
  name: string;
  file: string; // url-safe filename for citation
  folder: string;
  size: string;
  pages: number;
  owner: string;
  updated: string; // YYYY-MM-DD
  pages_text: PageChunk[];
};

export const LIBRARY: Doc[] = [
  {
    id: 'osha-fall-protection',
    name: 'OSHA 1926.501 — Fall Protection (Subpart M)',
    file: 'OSHA-1926-501-Fall-Protection.pdf',
    folder: 'Safety / OSHA',
    size: '2.4 MB',
    pages: 6,
    owner: 'safety@acme.co',
    updated: '2026-04-18',
    pages_text: [
      {
        page: 1,
        text:
          '1926.501 — Duty to have fall protection. Unprotected sides, edges, holes, walking surfaces, ramps, runways, and excavations 6 feet or more above lower levels require fall protection. Each employee on a walking/working surface with an unprotected side or edge 6 ft or more above a lower level shall be protected by guardrail, safety net, or personal fall arrest system.',
      },
      {
        page: 2,
        text:
          'Holes and openings. Covers for holes in floors, roofs, and other walking/working surfaces shall be capable of supporting twice the weight of employees, equipment, and materials that may be imposed on the cover at any one time. Covers shall be secured to prevent accidental displacement.',
      },
      {
        page: 3,
        text:
          'Roofing work on low-slope roofs. Where employees work on low-slope roofs (slope less than or equal to 4:12) and are 6 ft or more above a lower level, fall protection is required when work is performed within 6 ft of the roof edge. A designated area option applies to roofs 50 ft wide or less when work is performed at least 15 ft from the edge.',
      },
      {
        page: 4,
        text:
          'Steep roofs. Where the roof slope is greater than 4:12, fall protection is required regardless of distance from the edge. Guardrail systems with toeboards, safety net systems, or personal fall arrest systems are acceptable.',
      },
      {
        page: 5,
        text:
          'Falling object protection. When employees are exposed to falling objects, the employer must have canopies, barricades, or toeboards installed. Toeboards shall be at least 3.5 inches (8.9 cm) high and securely fastened. Where tools, equipment, or materials are piled higher than the toeboard, paneling or screening shall be installed.',
      },
      {
        page: 6,
        text:
          'Training and retraining. Before any employee is exposed to a fall hazard, the employer must provide training for each employee who uses personal fall protection systems or who is required to be trained as specified elsewhere. Retraining is required when there is a change in workplace conditions, when an employee shows inadequate understanding, or after a fall event.',
      },
    ],
  },
  {
    id: 'lockout-tagout',
    name: 'Control of Hazardous Energy (LOTO) — Written Program',
    file: 'Lockout-Tagout-Program.pdf',
    folder: 'Safety / OSHA',
    size: '1.1 MB',
    pages: 5,
    owner: 'safety@acme.co',
    updated: '2026-03-02',
    pages_text: [
      {
        page: 1,
        text:
          'Scope. This program applies to servicing and maintenance of machines where unexpected energization, start-up, or release of stored energy could cause injury. Affected employees must comply with energy control procedures.',
      },
      {
        page: 2,
        text:
          'Energy control procedure. Each machine shall have a written procedure that includes: scope, purpose, authorization, rules, and techniques. Specific procedural steps for shutting down, isolating, and securing each energy source. Steps for placing, removing, and transferring lockout devices. Means to verify isolation.',
      },
      {
        page: 3,
        text:
          'Application of control. Authorized employees shall follow these steps: (1) prepare for shutdown; (2) notify affected employees; (3) shut down the machine using normal stop procedure; (4) isolate the machine from energy sources; (5) apply lockout or tagout devices to each energy-isolating device; (6) release stored or residual energy; (7) verify isolation by attempting to start the machine.',
      },
      {
        page: 4,
        text:
          'Release of lockout/tagout. Before lockout/tagout devices are removed and energy restored to the machine, the authorized employee shall: (1) inspect the work area to ensure non-essential items have been removed; (2) verify all employees are safely positioned; (3) notify affected employees; (4) remove locks and tags; (5) re-energize the machine.',
      },
      {
        page: 5,
        text:
          'Training. Initial training shall be provided to each authorized, affected, and other employee whose work operations are or may be in an area where energy control procedures may be utilized. Authorized employees shall be retrained when there is a change in job assignments, machinery, or procedures, or when inspection reveals deviation or inadequacy.',
      },
    ],
  },
  {
    id: 'harness-inspection',
    name: 'Full-Body Harness — Daily Inspection Checklist',
    file: 'Harness-Inspection-Checklist.pdf',
    folder: 'Safety / PPE',
    size: '0.4 MB',
    pages: 3,
    owner: 'ppe@acme.co',
    updated: '2026-05-11',
    pages_text: [
      {
        page: 1,
        text:
          'Before each use, inspect the full-body harness for: frayed, cut, or broken stitching; cuts, burns, or abrasions on webbing; chemical damage or discoloration; damaged or missing keepers; illegible or missing labels. If any defect is found, remove the harness from service immediately.',
      },
      {
        page: 2,
        text:
          'Hardware inspection. Check D-rings, buckles, and connectors for distortion, sharp edges, cracks, corrosion, and proper function. Tongue buckles must over-center and seat fully. Mating buckles must engage fully with an audible click. No hardware shall be modified, repaired, or replaced by anyone other than the manufacturer.',
      },
      {
        page: 3,
        text:
          'Documentation. Each inspection shall be recorded in the harness log with date, inspector, harness serial number, and disposition (pass/fail). Failed harnesses shall be tagged "DO NOT USE" and physically destroyed to prevent accidental reuse.',
      },
    ],
  },
  {
    id: 'scaffold-guidance',
    name: 'Scaffold Erection & Use — Site Procedure',
    file: 'Scaffold-Erection-Procedure.pdf',
    folder: 'Safety / Field Ops',
    size: '1.8 MB',
    pages: 4,
    owner: 'field-ops@acme.co',
    updated: '2026-01-29',
    pages_text: [
      {
        page: 1,
        text:
          'General. All scaffolds shall be erected, dismantled, and used under the supervision of a competent person. Footings shall be sound, rigid, and capable of carrying the maximum intended load without settling or displacement. Scaffolds and components shall not be loaded in excess of their rated capacity.',
      },
      {
        page: 2,
        text:
          'Platforms. Each platform on all working levels shall be fully planked or decked between the front uprights and the guardrail supports. Platforms shall extend at least 6 inches past the support unless cleated. The maximum gap between planks shall not exceed 1 inch.',
      },
      {
        page: 3,
        text:
          'Fall protection on scaffolds. Guardrails are required on all open sides and ends of platforms more than 10 feet above the lower level. Toprails shall be 38 to 45 inches above the platform surface. Midrails shall be installed approximately halfway between the toprail and the platform surface.',
      },
      {
        page: 4,
        text:
          'Access. Safe access shall be provided to all scaffold platforms. Hook-on or attachable ladders shall be installed as soon as scaffold erection has progressed to a point that permits safe installation. Cross-braces shall not be used as a means of access.',
      },
    ],
  },
  {
    id: 'heat-illness',
    name: 'Heat Illness Prevention — Field Crews',
    file: 'Heat-Illness-Prevention.pdf',
    folder: 'HR / Wellness',
    size: '0.7 MB',
    pages: 3,
    owner: 'hr@acme.co',
    updated: '2026-06-01',
    pages_text: [
      {
        page: 1,
        text:
          'Scope. This policy applies to all field employees and contractors working outdoors when the heat index equals or exceeds 80°F. Supervisors shall monitor the NOAA hourly forecast and post the current heat index at each job site.',
      },
      {
        page: 2,
        text:
          'Water and shade. Cool drinking water shall be provided in sufficient quantity at all times — at least one quart per employee per hour for the entire shift. Shade shall be available upon request or when the temperature exceeds 80°F, regardless of whether symptoms are present.',
      },
      {
        page: 3,
        text:
          'High-heat protocols. When the heat index reaches 95°F, the supervisor shall: (1) hold pre-shift safety meetings covering heat illness signs; (2) implement a buddy system; (3) increase communication frequency; (4) schedule strenuous tasks during cooler hours; (5) authorize 10-minute cool-down breaks every 2 hours.',
      },
    ],
  },
  {
    id: 'glove-chems',
    name: 'Chemical-Resistant Glove Selection Guide',
    file: 'Glove-Selection-Guide.pdf',
    folder: 'Safety / PPE',
    size: '0.5 MB',
    pages: 3,
    owner: 'ppe@acme.co',
    updated: '2026-02-14',
    pages_text: [
      {
        page: 1,
        text:
          'Selection. Choose gloves based on the chemical, concentration, temperature, and duration of contact. Reference the manufacturer’s chemical compatibility chart before use. When in doubt, upgrade to a heavier gauge or different material.',
      },
      {
        page: 2,
        text:
          'Butyl rubber: ketones, esters, and strong acids. Nitrile: petroleum products, fuels, and many solvents — not for ketones or strong oxidizers. Neoprene: acids, bases, and alcohols. PVC: acids, bases, and some solvents; limited for ketones and aromatics.',
      },
      {
        page: 3,
        text:
          'Inspection and replacement. Inspect gloves for swelling, brittleness, pinholes, and discoloration before each use. Discard immediately if breakthrough occurs. Do not reuse disposable gloves. Wash reusable gloves before removal and store away from direct sunlight and ozone-producing equipment.',
      },
    ],
  },
];

export const FOLDERS = Array.from(new Set(LIBRARY.map((d) => d.folder)));

export function findDoc(file: string): Doc | undefined {
  return LIBRARY.find((d) => d.file === file);
}
