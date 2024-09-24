module.exports = {
  // 기타 설정
  compiler: {
    styledComponents: true,
  },
  output: "standalone",

  // ESLint 빌드 제외 설정
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};
