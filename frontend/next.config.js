module.exports = {
  // reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  async headers() {
    return [
      {
        // 이 부분을 원하는 경로로 설정합니다. 모든 경로에 적용하려면 아래와 같이 합니다.
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};
