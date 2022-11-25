
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = {
  env: {
    APIURLSubDomain: '/api/onboarding/getSubDomain'
  }
}

module.exports = {
  env: {
    DB_URL: 'Server=itsfi-tr-mi-sql01.e57c104c9ca0.database.windows.net;Database=ITSFIDataFramework;User Id=skadf_svc;Password=skadf_2022;Encrypt=true',
    Dremio_UN: "findataapi_svc",
    Dremio_Pass: "findataapi_2022"
  },
}


// DremioPersonalToken - wyCNVnwmRzKV5w1fv/D5vLQVqatkDisnEK8MdxJcfC70PAe12XwpKoPNrOfeNg==




