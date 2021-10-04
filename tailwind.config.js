module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    minHeight: {
      '0': '0',
      '30': '30vh',
      'full': '100%',
      'screen': '100vh'
     }   
  }
}
