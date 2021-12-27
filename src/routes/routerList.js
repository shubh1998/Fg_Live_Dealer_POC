import { DragonTiger } from '../pages/games/DragonTiger/DragonTiger'
import { Home } from '../pages/Home'
import SicBo from '../pages/games/SicBo'

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
  },
  {
    key: 3,
    label: 'SicBo',
    path: '/sicbo',
    component: SicBo,
    hasNavbar: true
  }
]

export default routerList
