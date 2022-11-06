import { useState, useCallback } from 'react'
import { Menu } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons'

import { SIDEBAR_WIDTH } from 'consts/index'
import { selectAdminData } from 'features/AdminData/selectors'
import menuItems from './menuItems'
import logo from 'img/logo.png'
import { Wrapper, Logo, AdminName, ListContainer } from './styled'


const sideBarIcons: { [k: string]: React.ReactElement } = {
  'home': <HomeOutlined />,
  'admins': <UserSwitchOutlined />,
  'logout': <LogoutOutlined />,
}


interface T_SideBarProps {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
}

const SideBar: React.FC<T_SideBarProps> = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [ currentSelectedItem, setCurrentSelectedItem ] = useState(window.location.pathname.split('/')[1] || 'home')

  const selectItem = useCallback((e: React.MouseEvent<any>) => {
    setCurrentSelectedItem(e.currentTarget.dataset.link)
  }, [])

  const { nameLast, nameFirst, role: adminRole } = useSelector(selectAdminData)


  return (
    <Wrapper
      collapsed={isSidebarCollapsed}
      onCollapse={toggleSidebar}
      collapsible
      theme='light'
      width={SIDEBAR_WIDTH}
    >
      <Logo src={logo} />

      <AdminName>
        {nameLast} {nameFirst}
      </AdminName>

      <ListContainer>
        <Menu mode='inline' selectedKeys={[ currentSelectedItem! ]}>
          {menuItems.map(({ link, title, children }) => {
            // No submenu
            if (!children?.length && adminRole) {
              return (
                <Menu.Item icon={sideBarIcons[link]} key={link}>
                  <Link data-link={link} onClick={selectItem} to={`/${link}`}>
                    {title}
                  </Link>
                </Menu.Item>
              )

            // Has submenu
            } else {
              return (
                <Menu.SubMenu icon={sideBarIcons[link]} key={title} title={title}>
                  {children?.length && children.map(({ link, title }) => {
                    return (
                      <Menu.Item icon={sideBarIcons[link]} key={link}>
                        <Link data-link={link} onClick={selectItem} to={`/${link}`}>
                          {title}
                        </Link>
                      </Menu.Item>
                    )
                  })}
                </Menu.SubMenu>
              )
            }
          })}
        </Menu>
      </ListContainer>
    </Wrapper>
  )
}

export default SideBar
