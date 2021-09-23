import Link from 'next/link';

const Header = () => {
  const links = [
    { path: '/', text: 'Home' },
    { path: '/hot-things', text: 'Hot things' },
    { path: '/contact', text: 'Contact' },
    { path: '/privacy-policy', text: 'Privacy Policy' },
  ];

  return (
    <header>
      <h1>
        The <i>MAW</i>
      </h1>
      <ul>
        {links.map(({ path, text }, index) => (
          <li key={`menu${index}`}>
            <Link href={path}>
              <a>{text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
