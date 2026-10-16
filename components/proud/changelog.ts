// Release notes shown on /changelog. Newest first.

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
        version: "1.0.2",
        date: "16 Oct 2026",
        features: [
          "Added AirPods to the Dynamic Island, iPhone style: the earbuds and a battery ring when they connect",
          "Added Mac battery alerts at 20% and 10%, and a green charging bolt with the percentage when you plug in",
          "Added volume and brightness bars to the island",
          "Added the orange and green dots when an app is using the microphone or the camera",
          "Added an alert when macOS Focus turns on or off",
          "Added a Tools tab to the island: screen recording, voice memos, song recognition and iFood order tracking",
          "Added the app version, a sign-out confirmation and account deletion to Settings › Profile",
        ],
      },
      {
        version: "1.0.1",
        date: "16 Oct 2026",
        features: [
          "Added 20 working connections: Google Calendar, Gmail, Google Drive, Notion, Obsidian, Todoist, Linear, Slack, Microsoft Teams, Discord, WhatsApp, Telegram, Figma, Nubank, Vercel, Cloudflare, Supabase, GitHub, Claude and ChatGPT",
          "Added the native macOS update alert, with the Proud icon, the version and Update / Later buttons",
          "Added new-version alerts to the Notifications tab in the Dynamic Island, with the Proud logo — click to update",
          "Added the version and build number to the bottom-left corner of the login screen",
        ],
      },
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
