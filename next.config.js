/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        loader: 'custom',
        loaderFile: "./scripts/Loader.js"
    }
};

module.exports = nextConfig;
