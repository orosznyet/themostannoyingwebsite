import React from "react";

interface ArticleStaticFields {
  slug: string;
  title: string;
  isHighlighted?: boolean;
  coverImage?: string;
}

export interface Article extends ArticleStaticFields {
  date: Date;
  body: React.ReactNode;
}

export interface ArticleStatic extends ArticleStaticFields {
  date: string;
  body: string;
}
