// Release notes shown on /changelog. Newest first.
// NOTE: placeholder content — replace with Proud's real release notes.

export type Release = {
  version: string;
  date: string;
  features?: string[];
  fixes?: string[];
};

export type MajorRelease = {
  version: string;
  summary: string;
  releases: Release[];
};

export const changelogUpdated = "October 2026";

export const changelog: MajorRelease[] = [
  {
    version: "1.0",
    summary:
      "The first release of Proud: the Dynamic Island on your Mac, with built-in AI agents, Focus Sessions, Quick Capture and Smart Notifications.",
    releases: [
      {
        version: "1.0.0",
        date: "7 Oct 2026",
        features: [
          "Added the Dynamic Island for your Mac",
          "Added built-in AI agents with live activity in the island",
          "Added connections to your apps",
          "Added Notes, Docs & Tasks",
          "Added Focus Sessions with a live timer",
          "Added Quick Capture from anywhere",
          "Added Smart Notifications",
        ],
      },
    ],
  },
];
