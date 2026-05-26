import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  icon: string
  label: string
  path: string
}

interface Props {
  items: NavItem[]
}

const BottomNav = ({ items }: Props) => {
  const location = useLocation()

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {items.map((item) => {
        const isActive = location.pathname === item.path ||
          (item.path !== '/' && location.pathname.startsWith(item.path))
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
