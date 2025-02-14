/** @type {import('next').NextConfig} */
const nextConfig = {
  sentry: {
    disableServerWebpackPlugin: true,  // Disables Sentry on server-side
    disableClientWebpackPlugin: true,  // Disables Sentry on client-side
  }
};

module.exports = nextConfig;