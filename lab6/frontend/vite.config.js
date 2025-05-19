export default {
    build: {
        commonjsOptions: {
            include: [/node_modules/],
        },
        outDir: './dist',
        emptyOutDir: true,
    },
};