
import babel from 'rollup-plugin-babel' 

// rollup.config.js
const config = {
    input: './index.js',
    external: ['react', 'react-router-dom', "keycloak-js", 'react-redux', 'redux'],
    output: {
        format: 'umd',
        name: 'AuthComponents',
        globals: {
            'react': "React",
            'react-router-dom': 'reactRouterDom',
            'react-redux': 'reactRedux',
            'keycloak-js':'Keycloak',
            'redux':'Redux'
        }
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        })
    ]
}
export default config