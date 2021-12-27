import { DragonTiger } from '../pages/games/DragonTiger'
import Home from '../pages/games/Home'

const routerList = [
  {
    key: 1,
    label: 'Home',
    path: '/',
    component: Home,
    hasNavbar: true
  },
  {
    key: 2,
    label: 'DragonTiger',
    path: '/dragon-tiger',
    component: DragonTiger,
    hasNavbar: true
  }
]

export default routerList
