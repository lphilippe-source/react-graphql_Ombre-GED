import { FC } from "react";

import { PageHeader, Menu, Dropdown, Button, Tag, Typography } from 'antd'
import { css } from "@emotion/react";
interface IViewMenuProps {};

export const ViewMenu: FC<IViewMenuProps> = (props) => {
    return (
<Menu css={css`height:30px`}>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
    )
}
