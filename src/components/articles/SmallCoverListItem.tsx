import { ArticleCore } from "@/types"
import Link from "next/link";
import Image from "next/image";
import CoverPlaceholder from "./CoverPlaceholder";
import styled from "styled-components";
import { cssVars } from "@/styles/theme";

const Title = styled.h3`
  margin: ${cssVars.spacing.gap} 0;
`;
const Intro = styled.p`
  margin: 0;
  margin-bottom: ${cssVars.spacing.gap};
`;

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
        <Title>{article.title}</Title>
        <Intro>{article.intro}</Intro>
      </a>
    </Link>
  </>
}

export default SmallCoverListItem;
