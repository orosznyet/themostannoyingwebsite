import { ArticleCore } from "@/types"
import Link from "next/link";

type Props = {
  article: ArticleCore
}

const TextListItem = ({ article }: Props) => {
  return <>
    <Link href={article.url} passHref>
      <a>
        <h3>{article.title}</h3>
        <p>{article.intro}</p>
      </a>
    </Link>
  </>
}

export default TextListItem;
