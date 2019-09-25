module.exports = [
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-plugin-google-analytics/gatsby-browser.js"),
    options: {
      plugins: [],
      trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      head: false,
      anonymize: true,
      respectDNT: true
    }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-remark-images/gatsby-browser.js"),
    options: { plugins: [], maxWidth: 690, backgroundColor: "#f7f0eb" }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-remark-autolink-headers/gatsby-browser.js"),
    options: { plugins: [] }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-plugin-offline/gatsby-browser.js"),
    options: { plugins: [] }
  }
];
