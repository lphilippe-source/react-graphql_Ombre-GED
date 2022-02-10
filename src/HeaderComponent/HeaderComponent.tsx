import { PageHeader, Menu, Dropdown, Button, Tag, Typography } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { FC } from "react"
import { css } from '@emotion/react'
import '../css/index.css'
import {  useNavigate } from 'react-router-dom'
const { Paragraph } = Typography;
const menu = (
    // <Col direction='column' css={css`height:30px`}>
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
// </Col>
)

const DropdownMenu = () => (
    // <Col direction='column' css={css`height:30px`}>
  <Dropdown key="more" overlay={menu} >
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
// </Col>
)



const IconLink = ({ src, text }:{src:any,text:any}) => (
  <a className="example-link">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
)

const content = (
  // <Col direction='column' css={css`height:30px`}>
  <>
    <Paragraph>
      Ant Design interprets the color system into two levels: a system-level color system and a
      product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
      easier for designers to have a clear psychological expectation of color when adjusting colors,
      as well as facilitate communication in teams.
    </Paragraph>
    <div>
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="Quick Start"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text=" Product Info"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
        text="Product Doc"
      />
    </div>
  {/* // </Col> */}
</>
)

const Content = ({ children  }:{children:any}) => (
  // <Col direction='column' css={css`height:30px`}>
    <>
    <div style={{ flex: 1 }}>{children}</div>
    {/* <div className="image">{extraContent}</div> */}
  {/* // </Col> */}
</>
)
interface IHeaderComponentProps {
route:BreadCrumb
}
interface BreadCrumb{
path:string,
breadcrumbName:string
}

export const HeaderComponent: FC<IHeaderComponentProps> = ({route}) => {

const navigate = useNavigate()
const routes:BreadCrumb[] = [
  {
    path: 'first',
    breadcrumbName: '/Home',
  },
  route,
  // {
  //   path: 'second',
  //   breadcrumbName: 'Third-level Menu',
  // },
]
    return (
  <PageHeader
  // css={css`height:30px`}
    title="Title"
    className="site-page-header"
    subTitle="This is a subtitle"
    tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button onClick={()=>navigate("/login")} key="3">Login</Button>,
      <Button onClick={()=>navigate("/")} key="2">Home</Button>,
      <Button key="1" type="primary">
        Primary
      </Button>,
      <DropdownMenu  key="more" />,
    ]}
    avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
    breadcrumb={{ routes }}
  >
    <Content
      // extraContent={
      //   <img
      //     src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
      //     alt="content"
      //     width="100%"
      //   />
      // }
    >
      {/* {content} */}
    </Content>
  </PageHeader>
    )
}
