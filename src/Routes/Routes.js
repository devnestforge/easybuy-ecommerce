
import '../environments/envionments'
import Home from '../views/Home'
import About from '../views/sections/About'
import Contact from '../views/sections/Contact'

const routes = [

  { path: global.HOME, exact: true, name: 'Home', element: Home },

  // SECTIONS
  { path: global.ABOUT, exact: true, name: 'About', element: About },
  { path: global.CONTACT, exact: true, name: 'Contact', element: Contact },

]

export default routes
