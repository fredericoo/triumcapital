module.exports = {
  images: {
    domains: ['images.prismic.io', 'trium.cdn.prismic.io', 'placekitten.com'],
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048]
  },
  async headers() {
    return [
      {
        source: '/:path*{/fonts}?',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable'
          }
        ]
      },
      {
        source: '/:path*{/img}?',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public,max-age=31536000,immutable'
          }
        ]
      }
    ];
  }
};
