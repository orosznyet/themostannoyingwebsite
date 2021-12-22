import Link from "next/link";
import { useState } from "react";
import ShareModal from "../modal/ShareModal";

const UserNavigation = () => {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <nav id="navigation-user">
      <ShareModal
        show={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
      <ul>
        <li>
          <Link href="/settings">
            <a>Settings</a>
          </Link>
        </li>
        <li>
          <span onClick={() => setShowShareModal(true)}>Share</span>
        </li>
      </ul>
    </nav>
  );
};

export default UserNavigation;
