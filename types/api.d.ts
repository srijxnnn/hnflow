type HNItemType = "story" | "comment" | "job" | "poll" | "pollopt";

interface HNSearchResponse {
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;

  hits: HNHit[];

  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;

  params: string;
  query: string;

  processingTimeMS: number;
  serverTimeMS: number;

  processingTimingsMS: {
    _request: {
      roundTrip: number;
    };
    total: number;
  };
}

interface HNHit {
  objectID: string;
  author: string;
  created_at: string;
  created_at_i: number;
  updated_at: string;

  children: number[];
  _tags: string[];

  _highlightResult?: HighlightResult;

  // story-only fields
  title: string;
  url?: string;
  points: number;
  num_comments: number;

  // comment-only fields
  story_id?: number;
  story_title?: string;
  story_text?: string;
  story_url?: string;
  comment_text?: string;
  parent_id?: number;
}

interface HighlightResult {
  author?: HighlightField;
  title?: HighlightField;
  url?: HighlightField;
  story_text?: HighlightField;
}

interface HighlightField {
  value: string;
  matchLevel: "none" | "partial" | "full";
  matchedWords: string[];
}

interface HNItem {
  id: number;
  type: HNItemType;

  author: string | null;

  title: string | null;
  text: string | null;
  url: string | null;

  points: number | null;

  parent_id: number | null;
  story_id: number | null;

  created_at: string;
  created_at_i: number;

  options: unknown[];

  children: HNItem[];
}

interface SearchFilters {
  query: string;
  tag:
    | ""
    | "front_page"
    | "story"
    | "comment"
    | "job"
    | "poll"
    | "ask_hn"
    | "show_hn"
    | "launch_hn";
  sort: "popularity" | "date";
  timeRange: "24h" | "7d" | "30d" | "1y" | "all";
  page: number;
}
