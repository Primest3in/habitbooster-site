// ─────────────────────────────────────────────────────────────────────────────
// Every app on the site, in the order they appear on the homepage.
//
// To add an app:
//   1. Copy an entry below and change its fields.
//   2. Put its icon at assets/apps/<slug>/icon.png (square PNG, 256px or larger).
//      Optional screenshots go in the same folder and are listed in `screenshots`.
//   3. Run:  node _src/build.mjs
//
// This creates /<slug>/, /<slug>/privacy and /<slug>/terms, adds a homepage
// card, a footer link and a contact entry. No template changes are needed.
//
// Legal text: each section has a heading and a body. A body item is either a
// paragraph string (inline HTML allowed) or { list: [...] }.
//   {email}           becomes a mailto link to the app's support email.
//   [[TODO: text]]    is shown highlighted and listed as a warning by the build.
//                     Replace it with confirmed wording before publishing.
// ─────────────────────────────────────────────────────────────────────────────

const APPLE_EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default [
  // ── DailyKit ───────────────────────────────────────────────────────────────
  {
    slug: 'dailykit',
    name: 'DailyKit',
    fullName: 'DailyKit: Habit Tracker',
    tagline: 'Build consistency one day at a time.',
    eyebrow: 'Daily habit tracking for iPhone',
    description:
      'DailyKit helps you create habits, mark daily progress, follow streaks, view analytics, and set local check-in reminders.',
    metaDescription:
      'DailyKit helps you track daily habits, streaks, reminders, and progress on iPhone.',
    appStoreUrl: 'https://apps.apple.com/app/dailykit-habit-tracker/id6772760803',
    // supportEmail: defaults to the site email in site.mjs

    theme: {
      scheme: 'dark',
      bg: '#070914',
      surface: '#111625',
      text: '#f7fbff',
      muted: 'rgba(247, 251, 255, 0.72)',
      line: 'rgba(255, 255, 255, 0.12)',
      accent: '#16c8f5',
      onAccent: '#03131d',
      ink: '#16c8f5', // accent used for text on this page's background
      legalInk: '#0b6f8c', // accent used for text on the white legal pages
      heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      hero:
        'radial-gradient(circle at top right, rgba(22, 200, 245, 0.24), transparent 34rem), linear-gradient(160deg, #08364a 0%, #071626 45%, #070914 100%)',
    },

    screenshots: [
      { file: 'screenshot-1.jpg', alt: 'DailyKit habit streak tracking screen.' },
      { file: 'screenshot-2.jpg', alt: 'DailyKit create habit screen.' },
      { file: 'screenshot-3.jpg', alt: 'DailyKit reminder alert screen.' },
      { file: 'screenshot-4.jpg', alt: 'DailyKit icon customization screen.' },
    ],

    features: [
      { title: 'Track habits', text: 'Create daily habits with names, descriptions, icons, and colors.' },
      { title: 'See momentum', text: 'Follow streaks, completion history, and progress analytics over time.' },
      { title: 'Stay reminded', text: 'Use local notifications to set daily check-ins on selected days.' },
    ],

    // Wording kept exactly as published on May 9, 2026 (it still says "HabitBooster").
    privacy: {
      updated: '2026-05-09',
      sections: [
        { heading: 'Overview', body: [
          `HabitBooster is a habit tracking app for iPhone. This Privacy Policy explains what information the app handles and how it is used.`,
        ] },
        { heading: 'Information Stored on Your Device', body: [
          `HabitBooster lets you create and manage habits. Habit names, habit descriptions, selected icons, selected colors, completion history, analytics summaries, reminder settings, theme preferences, and onboarding preferences are stored locally on your device.`,
          `HabitBooster does not require an account and does not operate its own server for storing your habit data.`,
        ] },
        { heading: 'Feedback and Support', body: [
          `If you choose to send feedback from the app, your email app may create a message addressed to support@habitbooster.app. That message may include your feedback, optional email address, selected rating, and any attachment you choose to include.`,
          `Feedback is used only to respond to support requests and improve HabitBooster.`,
        ] },
        { heading: 'Notifications', body: [
          `HabitBooster may ask permission to send local notifications when you enable daily reminders. Reminder settings are stored on your device and are used to schedule local check-in notifications. You can change notification permissions in iOS Settings at any time.`,
        ] },
        { heading: 'Purchases and Subscriptions', body: [
          `HabitBooster may offer optional premium features through Apple in-app purchases. Purchases are processed by Apple. HabitBooster does not receive or store your full payment card details. Apple may provide transaction information needed to confirm purchase status and restore access to premium features.`,
        ] },
        { heading: 'Analytics', body: [
          `HabitBooster includes in-app analytics that summarize your habit progress, such as weekly completion, streaks, and most consistent habits. These analytics are generated from your local habit data and are used inside the app.`,
        ] },
        { heading: 'Third-Party Services', body: [
          `HabitBooster uses Apple platform services such as local notifications, Mail compose, and in-app purchases. If you contact support by email or make a purchase, your use may also be subject to Apple Mail, your email provider, and Apple's privacy terms.`,
        ] },
        { heading: "Children's Privacy", body: [
          `HabitBooster is not intended to collect personal information from children. If you believe a child has sent personal information through feedback or support, contact us and we will take reasonable steps to delete it.`,
        ] },
        { heading: 'Data Retention', body: [
          `Habit data stored locally remains on your device until you delete it in the app, delete the app, or erase your device data. Support emails may be retained as needed to respond to requests, maintain records, and improve the app.`,
        ] },
        { heading: 'Your Choices', body: [
          { list: [
            `You can edit or delete habits in the app.`,
            `You can disable reminders in the app or in iOS Settings.`,
            `You can choose not to send feedback.`,
            `You can delete the app to remove locally stored app data from your device.`,
          ] },
        ] },
        { heading: 'Changes to This Policy', body: [
          `We may update this Privacy Policy from time to time. If changes are made, the updated version will be posted on this page with a new "Last updated" date.`,
        ] },
        { heading: 'Contact', body: [
          `If you have questions about this Privacy Policy, contact us at <a href="mailto:support@habitbooster.app">support@habitbooster.app</a>.`,
        ] },
      ],
    },

    // Wording kept exactly as published on May 9, 2026.
    terms: {
      updated: '2026-05-09',
      sections: [
        { heading: 'Acceptance of Terms', body: [
          `By using HabitBooster, you agree to these Terms of Use. If you do not agree, do not use the app.`,
        ] },
        { heading: 'Use of the App', body: [
          `HabitBooster is provided to help you track habits, completion history, streaks, reminders, and progress. You are responsible for how you use the app and for the habit information you enter.`,
        ] },
        { heading: 'No Medical Advice', body: [
          `HabitBooster is a productivity and habit tracking app. It does not provide medical, mental health, financial, or professional advice.`,
        ] },
        { heading: 'Purchases and Subscriptions', body: [
          `HabitBooster may offer optional premium features through Apple in-app purchases. Purchases, renewals, cancellations, and refunds are handled by Apple under Apple's App Store terms and policies.`,
        ] },
        { heading: 'Notifications', body: [
          `If you enable reminders, HabitBooster may schedule local notifications on your device. You can disable reminders in the app or through iOS Settings.`,
        ] },
        { heading: 'Availability', body: [
          `We may update, change, suspend, or discontinue features at any time. We try to keep HabitBooster useful and stable, but we do not guarantee uninterrupted availability.`,
        ] },
        { heading: 'Limitation of Liability', body: [
          `HabitBooster is provided "as is" without warranties of any kind. To the fullest extent allowed by law, we are not liable for indirect, incidental, or consequential damages related to your use of the app.`,
        ] },
        { heading: 'Changes to These Terms', body: [
          `We may update these Terms from time to time. Updated terms will be posted on this page with a new "Last updated" date.`,
        ] },
        { heading: 'Contact', body: [
          `If you have questions about these Terms, contact us at <a href="mailto:support@habitbooster.app">support@habitbooster.app</a>.`,
        ] },
      ],
    },
  },

  // ── Bookify ────────────────────────────────────────────────────────────────
  {
    slug: 'bookify',
    name: 'Bookify',
    fullName: 'Bookify - Beautiful PDF Reader',
    tagline: 'Every PDF, a real book.',
    eyebrow: 'Beautiful PDF reader',
    description:
      'Bookify turns PDFs into flowing, book-style text that fits the screen, with realistic page-curl turns, six reading themes (Paper, Sepia, Ivory, Sage, Graphite, Night), reading fonts (Literata, Merriweather, Source Serif 4, Cormorant Garamond), and font size and brightness controls.',
    metaDescription:
      'Bookify turns PDFs into flowing, book-style text with realistic page turns, six reading themes and beautiful reading fonts.',
    appStoreUrl: null, // null shows "Coming soon to the App Store"

    theme: {
      scheme: 'light',
      bg: '#F3EADC',
      surface: '#FBF6EE',
      text: '#2B1D17',
      muted: 'rgba(43, 29, 23, 0.74)',
      line: 'rgba(43, 29, 23, 0.14)',
      accent: '#B9784A',
      onAccent: '#2B1D17',
      ink: '#8A532E',
      legalInk: '#8A532E',
      heading: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
      headingWeight: '600',
      // Loaded only on the Bookify page. Elsewhere the heading falls back to Georgia.
      fontHref: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap',
      hero:
        'radial-gradient(circle at 85% 0%, rgba(185, 120, 74, 0.20), transparent 32rem), linear-gradient(180deg, #EEE0CA 0%, #F3EADC 100%)',
    },

    screenshots: [
      { file: 'screenshot-1.jpg', alt: 'Feels like a real book: Bookify’s realistic page-curl turn.' },
      { file: 'screenshot-2.jpg', alt: 'Your PDFs, made readable: Bookify converting a PDF into a book.' },
      { file: 'screenshot-3.jpg', alt: 'A page for every light: Bookify’s six reading themes with font size and brightness controls.' },
      { file: 'screenshot-4.jpg', alt: 'Type made for reading: choosing Literata, Merriweather, Source Serif 4 or Cormorant Garamond.' },
      { file: 'screenshot-5.jpg', alt: 'Easy on your eyes: reading in Bookify’s calm Sage theme.' },
    ],

    features: [
      { title: 'Book-style reading', text: 'PDFs become flowing, book-style text that fits your screen.' },
      { title: 'Real page turns', text: 'Realistic page-curl animations make every turn feel like paper.' },
      { title: 'Six reading themes', text: 'Paper, Sepia, Ivory, Sage, Graphite and Night.' },
      { title: 'Reading fonts', text: 'Literata, Merriweather, Source Serif 4 and Cormorant Garamond.' },
      { title: 'Comfort controls', text: 'Adjust font size and brightness to read the way you like.' },
    ],

    privacy: {
      updated: '2026-10-13',
      sections: [
        { heading: 'Overview', body: [
          `Bookify - Beautiful PDF Reader ("Bookify") is an app for reading PDF files. It is made by Mahbubul Hasan, an independent developer ("I", "me"). This policy explains what happens to your information when you use Bookify.`,
          `In short: Bookify processes your PDFs on your device, and it does not include analytics or crash-reporting tools.`,
        ] },
        { heading: 'What Bookify Collects', body: [
          `When you import a PDF, Bookify opens it and converts it into book-style text on your device. Your PDFs, and the text Bookify creates from them, are not uploaded to me or to any other service.`,
          `Any reading settings the app remembers are also stored only on your device.`,
          `Bookify does not have accounts or sign-in.`,
          `Bookify does not sync your files through iCloud. If you open a PDF from iCloud Drive or another location in the Files app, that storage is provided by Apple or that provider under their own privacy terms.`,
        ] },
        { heading: 'How Your Information Is Used', body: [
          `Your PDFs are used only to show them to you inside Bookify. I cannot see your files, and I do not use them for any other purpose.`,
          `If you email me, I use your email address and message only to reply to you.`,
        ] },
        { heading: 'Analytics and Crash Reporting', body: [
          `Bookify does not include any analytics or crash-reporting tools.`,
          `If you have chosen in your device settings to share analytics with app developers, Apple may give me anonymous crash and usage data. Apple controls this, and you can turn it off in iOS Settings under Privacy &amp; Security, Analytics &amp; Improvements.`,
        ] },
        { heading: 'Advertising', body: [
          `Bookify does not show ads.`,
        ] },
        { heading: 'Purchases', body: [
          `Bookify offers optional weekly and yearly subscriptions through Apple's in-app purchase system. Payments are processed by Apple. I do not receive your payment card details. Apple gives the app only the information needed to confirm and restore your subscription.`,
        ] },
        { heading: 'Third Parties', body: [
          `Bookify is distributed through Apple's App Store, and Apple processes subscription payments. Your use of the App Store and your payments are covered by Apple's privacy policy. Bookify does not send your PDFs or reading data to any third party.`,
          `I do not sell your data, and Bookify does not track you across other companies' apps or websites.`,
        ] },
        { heading: 'Data Retention and Deletion', body: [
          `Your PDFs and reading data stay on your device until you remove them from Bookify or delete the app. Because I do not hold copies, there is nothing stored on my side to delete.`,
          `If you email me, I keep the email only as long as needed to help you. Ask me and I will delete it.`,
        ] },
        { heading: "Children's Privacy", body: [
          `Bookify is rated 4+ on the App Store, which means its content is suitable for all ages. I do not knowingly collect personal information from children. If you believe a child has sent me personal information by email, contact me and I will delete it.`,
        ] },
        { heading: 'Changes to This Policy', body: [
          `If I change this policy, I will post the new version on this page and update the "Last updated" date above.`,
        ] },
        { heading: 'Contact', body: [
          `Questions about this policy? Email me at {email}.`,
        ] },
      ],
    },

    terms: {
      updated: '2026-10-13',
      sections: [
        { heading: 'About These Terms', body: [
          `These terms apply to your use of Bookify - Beautiful PDF Reader ("Bookify"), made by Mahbubul Hasan ("I", "me"). By downloading or using Bookify, you agree to them. If you do not agree, please do not use the app.`,
        ] },
        { heading: "Apple's Standard License", body: [
          `Bookify is licensed to you through Apple's App Store under Apple's <a href="${APPLE_EULA}">Licensed Application End User License Agreement</a> (the "Standard EULA"). These terms add to the Standard EULA. If the two conflict, the Standard EULA applies.`,
        ] },
        { heading: 'Acceptable Use', body: [
          `You agree to:`,
          { list: [
            `use Bookify only for lawful purposes;`,
            `not use Bookify to infringe anyone's copyright or other rights;`,
            `not copy, modify, or reverse engineer the app, except where the law or the Standard EULA allows it;`,
            `not interfere with the app's normal operation.`,
          ] },
        ] },
        { heading: 'Your PDFs', body: [
          `You are responsible for having the rights to any PDF you import into Bookify. Bookify only displays files you choose to open. I do not review, host, or share your files, and I am not responsible for their content.`,
        ] },
        { heading: 'Subscriptions', body: [
          `Bookify offers optional auto-renewing subscriptions:`,
          { list: [
            `Weekly: $2.99 per week`,
            `Yearly: $49.99 per year`,
          ] },
          `These are US prices. Prices in other countries may differ, and the price for your country is always shown before you confirm a purchase.`,
          `Payment is charged to your Apple Account when you confirm the purchase. Your subscription renews automatically unless you cancel it at least 24 hours before the end of the current period. Your account is charged for the renewal within 24 hours before the current period ends.`,
          `You can manage or cancel your subscription at any time in your Apple Account settings. Cancelling stops future renewals, and you keep access until the end of the period you have paid for.`,
          `Billing and refunds are handled by Apple under Apple's <a href="https://www.apple.com/legal/internet-services/itunes/">Media Services Terms and Conditions</a>. I cannot issue refunds directly. You can request one from Apple at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.`,
        ] },
        { heading: 'Provided "As Is"', body: [
          `Bookify is provided "as is" and "as available", without warranties of any kind, to the fullest extent allowed by law. I do not promise that the app will be error-free, that every PDF will convert perfectly, or that the app will always be available.`,
        ] },
        { heading: 'Limitation of Liability', body: [
          `To the fullest extent allowed by law, I am not liable for any indirect, incidental, special, or consequential damages, or for any loss of data, arising from your use of Bookify. Some places do not allow these limits, so they may not apply to you.`,
        ] },
        { heading: 'Changes to the App and These Terms', body: [
          `I may update, change, or discontinue features of Bookify at any time. I may also update these terms. The current version will always be on this page with its "Last updated" date. If you keep using Bookify after a change, you accept the updated terms.`,
        ] },
        { heading: 'Governing Law', body: [
          `These terms are governed by the laws of [[TODO: your country]]. This does not take away any rights you have under the consumer laws of the country where you live.`,
        ] },
        { heading: 'Contact', body: [
          `Questions about these terms? Email me at {email}.`,
        ] },
      ],
    },
  },
];
