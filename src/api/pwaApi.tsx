export const pwaAssetGenerator = require('pwa-asset-generator');

// Generate images over a module function call, instead of using CLI commands
(async () => {
  const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
    'https://elegantapp.github.io/pwa-asset-generator/static/landing.png',
    './temp',
    {
      scrape: false,
      background: 'linear-gradient(to right, #FE8C46)',
      splashOnly: true,
      portraitOnly: true,
      log: false,
      padding: 0,
      xhtml: true,
    },
  );
})();

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages;
