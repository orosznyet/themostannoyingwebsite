import Link from "next/link";
import { Menu, MenuItem } from "./GenericMenu";

type Props = {
  className?: string;
}

const MainNavigation = ({ className }: Props) => {
  const links = [
    { path: '/', text: 'Home' },
    { path: '/hot-things', text: 'Hot things' },
    { path: '/contact', text: 'Contact' },
    { path: '/privacy-policy', text: 'Privacy Policy' },
  ];

  return (
    <nav className={className} id="navigation-main">
      <Menu>
        {links.map(({ path, text }, index) => (
          <MenuItem key={index}>
            <Link href={path}>
              <a>{text}</a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </nav>
  );
};

export default MainNavigation;
