import { FC } from "react";
import { EllipsisOutlined } from '@ant-design/icons'
import { PageHeader, Menu, Dropdown, Button, Tag, Typography } from 'antd'
interface IViewDropDownMenuProps {
    ViewMenu:React.ReactElement<any, string | React.JSXElementConstructor<any>>
};

export const ViewDropDownMenu: FC<IViewDropDownMenuProps> = ({ViewMenu}) => {
    return (
<Dropdown key="more" overlay={ViewMenu} >
    <Button
      style={{
        border: 'none',
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top',
        }}
      />
    </Button>
  </Dropdown>

    )
}
