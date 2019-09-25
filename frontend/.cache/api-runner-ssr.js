var plugins = [
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-plugin-google-analytics/gatsby-ssr"),
    options: {
      plugins: [],
      trackingId: "YOUR_GOOGLE_ANALYTICS_TRACKING_ID",
      head: false,
      anonymize: true,
      respectDNT: true
    }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-remark-images/gatsby-ssr"),
    options: { plugins: [], maxWidth: 690, backgroundColor: "#f7f0eb" }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-remark-autolink-headers/gatsby-ssr"),
    options: { plugins: [] }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-plugin-manifest/gatsby-ssr"),
    options: {
      plugins: [],
      name: "Gatsby website",
      short_name: "Gatsby website",
      start_url: "/",
      background_color: "#f7f7f7",
      theme_color: "#191919",
      display: "minimal-ui"
    }
  },
  {
    plugin: require("/Users/mac/projects/nusreviews/node_modules/gatsby-plugin-offline/gatsby-ssr"),
    options: { plugins: [] }
  }
];
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`);

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api);
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined;
    }
    const result = plugin.plugin[api](args, plugin.options);
    if (result && argTransform) {
      args = argTransform({ args, result });
    }
    return result;
  });

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`);

  if (results.length > 0) {
    return results;
  } else {
    return [defaultReturn];
  }
};
