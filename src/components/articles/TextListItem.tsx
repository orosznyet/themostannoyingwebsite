import { cssVars } from "@/styles/theme";
import { ArticleCore } from "@/types"
import Link from "next/link";
import styled from "styled-components";

const AnchorWrap = styled.a`
  text-decoration: none;
`;
const Title = styled.h3`
  margin: 0;
`;
const Intro = styled.p`
  margin: ${cssVars.spacing.gap} 0;
`;

type Props = {
  article: ArticleCore
}

const TextListItem = ({ article }: Props) => {
  return <>
    <Link href={article.url} passHref>
      <AnchorWrap>
        <Title>{article.title}</Title>
        <Intro>{article.intro}</Intro>
      </AnchorWrap>
    </Link>
  </>
}

export default TextListItem;
