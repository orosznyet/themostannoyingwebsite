import { ArticleCore } from "@/types"
import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "./CoverPlaceholder";

type Props = {
  article: ArticleCore
}

const SmallCoverListItem = ({ article }: Props) => {
  return <>
    <Link href={article.url} passHref>
      <a>
        {!article.coverImage && <CoverPlaceholder width={1920} height={1200} />}
        {article.coverImage &&
          <Image
            src={article.coverImage}
            layout="responsive"
            width="1920"
            height="1200"
          />
        }
        <h3>{article.title}</h3>
        <p>{article.intro}</p>
      </a>
    </Link>
  </>
}

export default SmallCoverListItem;
