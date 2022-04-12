import { DragonTiger } from '../pages/games/DragonTiger/DragonTiger'
import { Roulette } from '../pages/games/Roulette/Roulette'
import SicBo from '../pages/games/SicBo/SicBo'
import { Home } from '../pages/Home/Home'
import { LiveStream } from '../pages/liveStream'

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
  },
  {
    key: 3,
    label: 'Roulette',
    path: '/roulette',
    component: Roulette,
    hasNavbar: true
  },
  {
    key: 4,
    label: 'live-stream',
    path: '/livestream',
    component: LiveStream,
    hasNavbar: true
  }
]

export default routerList
