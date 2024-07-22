import React from 'react';
import { Header, Icon } from '@adminjs/design-system';

const links = [
  {
    name: 'Order',
    href: '/resources/order',
    image: 'https://uenafood.com/static/media/quality_3.94d3f723b8b97331ef42.avif',
  },
  {
    name: 'Jam Operasional Outlet',
    href: '/resources/outlet_operational_hour',
    image: '/outlet.webp',
  },
  {
    name: 'Sold Out Menu',
    href: '/pages/soldOutMenu',
  },
];

const Card = ({
  name = 'Card name',
  children,
  href,
  image,
}: {
  name?: string;
  children?: React.ReactNode;
  href?: string;
  image?: string;
}) => {
  return (
    <a className="card" href={`${href}`}>
      <img
        className="card-image"
        src={
          name === 'Jam Operasional Outlet'
            ? '/outlet.webp'
            : name === 'Sold Out Menu'
              ? '/sold-out.webp'
              : name === 'Order'
                ? 'https://uenafood.com/static/media/quality_3.94d3f723b8b97331ef42.avif'
                : image
        }
        loading="lazy"
        alt={name}
      />
      <Header.H3
        style={{
          fontSize: '20px',
          margin: '0',
        }}
      >
        {name}
      </Header.H3>
      {children}
    </a>
  );
};

export default function Dashboard() {
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <Header
        style={{
          textAlign: 'center',
          fontWeight: 'semibold',
        }}
      >
        Dashboard UENA
      </Header>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {links.map((link) => (
          <Card key={link.name} name={link.name} href={link.href} />
        ))}
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        Made with <Icon icon="Coffee" /> by Tech Team
      </div>
    </div>
  );
}
