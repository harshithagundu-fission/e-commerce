module.exports = {
  content: [
    "./src/**/*.{html,js}", 
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    require('flowbite/plugin')
  ],
}


// export default {
//   content: ['./index.html', './src/**/*.{vue,js}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }