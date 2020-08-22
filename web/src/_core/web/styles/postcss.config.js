module.exports = {
    plugins: {
        'postcss-import': {},
        'postcss-cssnext': {},
        // Disable autoprefixer, because it's already included in cssnext
        'cssnano': { autoprefixer: false }
    }
};