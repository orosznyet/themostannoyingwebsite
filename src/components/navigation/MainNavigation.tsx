import Link from "next/link";

const MainMenu = () => {
  const links = [
    { path: '/', text: 'Home' },
    { path: '/hot-things', text: 'Hot things' },
    { path: '/contact', text: 'Contact' },
    { path: '/privacy-policy', text: 'Privacy Policy' },
  ];

  return (
    <nav id="menu-main">
      <ul>
        {links.map(({ path, text }, index) => (
          <li key={`menu${index}`}>
            <Link href={path}>
              <a>{text}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
