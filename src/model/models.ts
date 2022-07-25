import { Action, ThunkAction } from "@reduxjs/toolkit";

export type Id = string;

export type GenreId = number;

export interface AddNotificationPayload extends Omit<Notification, "id"> {
  id?: string;
}

export type Res = void | { payload: HttpError; type: string };

export type RequestToken = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type SessionId = { success: boolean; session_id: string };

export type GuestRes =
  | Res
  | {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
  };

export type SessionRes = Res | SessionId;

export type ReqTokenRes = Res | RequestToken;

export interface UserDetails {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppThunkPromise<R = void> = ThunkAction<
  Promise<R>,
  RootState,
  unknown,
  Action<string>
>;

export interface UsersState {
  user?: UserDetails;
  favoriteMovies?: BaseData[] | undefined;
  favoriteTvShows?: BaseData[] | undefined;
  createdLists?: CreatedListResults[] | undefined;
  tvWatchLists?: BaseData[];
  moviesWatchLists?: BaseData[];
}

export interface CreatedListResults {
  description?: string;
  favorite_count?: number;
  id?: number;
  item_count?: number;
  iso_639_1?: string;
  list_type?: MediaType;
  name?: string;
  poster_path?: string;
}

export interface CreatedLists extends Lists {
  results?: CreatedListResults[];
}

export interface AppConfig {
  app: {
    name: string;
    version: string;
  };
  api: {
    url: string;
    key: string;
  };
  login: {
    url: string;
    redirect: string;
  };
  userCountry: {
    url: string;
  };
  token: {
    key: string;
  };
  env: string;
}

export type ParamsType = {
  language?: string;
  region?: string;
  page?: number;
};

export interface AppState {
  country: string;
  countryCode: string;
  language: string;
}

export interface UiState {
  page: number;
  totalPages: number;
  totalResults: number;
  expandedNav: string;
  genres: Genre[];
  showNavbar: boolean;
  isMobile: boolean;
}

export type ErrorOrigin =
  | "internal-api"
  | "internal-ui"
  | "external"
  | "WCS"
  | "unknown";

export type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 408 | 500;

export interface HttpError {
  status: HttpErrorCode;
  stack: string;
  message: string;
  internalUrl: string;
  externalUrl: string;
  origin: ErrorOrigin;
}

interface RecordedHttpError extends HttpError {
  id: string;
}

export interface UiError {
  id: string;
  message: string;
  stack: string;
}

export interface LoginError {
  details: string;
  message: string;
}

export interface MissingAuthError {
  id: string;
  route: string;
}

export interface Errors {
  http: RecordedHttpError[];
  ui: UiError[];
  missingAuth: MissingAuthError[];
  login: LoginError;
}

type NotificationType = "info" | "success" | "error";

type Dates = {
  minimum?: string;
  maximum?: string;
};

export interface Notification {
  id: Id;
  type: NotificationType;
  message: string;
  autoClose: boolean;
  errorId?: string;
  errorType?: "ui" | "http";
  messageIsLabelKey?: boolean;
  autoCloseDelay?: number;
  colored?: boolean;
  playSound?: boolean;
  soundOnly?: boolean;
}

export interface AuthState {
  requestToken?: RequestToken;
  sessionId?: SessionId["session_id"];
  guestSession: boolean;
}

export type MediaListsRoutes =
  | "now_playing"
  | "popular"
  | "top_rated"
  | "upcoming"
  | "airing_today"
  | "on_the_air";

export interface DataState {
  listData?: BaseData[];
  currentList?: MediaListsRoutes;
  currentMedia?: BaseData;
}

export interface Genre {
  id: GenreId;
  name: string;
}

export interface TvState {
  tvShows?: TvShow[];
  loadingTv: boolean;
}

export interface RootState {
  auth: AuthState;
  users: UsersState;
  errors: Errors;
  notifications: Notification[];
  data: DataState;
  app: AppState;
  ui: UiState;
}

interface Lists {
  page: number;
  total_pages: number;
  total_results: number;
  dates?: Dates;
}

export interface ListResults {
  description?: string;
  favorite_count?: number;
  id?: number;
  item_count?: number;
  iso_639_1?: string;
  list_type?: string;
  name?: string;
  poster_path: null;
}

export interface ListsResponse extends Lists {
  results?: ListResults[];
}

export interface BaseDataList extends Lists {
  results: BaseData[];
}

export interface TvList extends Lists {
  results: TvShow[];
}

export interface ReviewList extends Lists {
  results: Review[];
}

export interface AddedFavoriteResponse {
  status_code: number;
  status_message: string;
}

export type MediaType = "movie" | "tv";

export interface AddFavoriteBody {
  id: number;
  media_type: MediaType;
  media_id: number;
  favorite: boolean;
}

export interface BaseData {
  type: MediaType;
  adult: boolean;
  backdrop_path: string;
  genre_ids: GenreId[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguages {
  iso_639_1: string;
  name: string;
}

export interface FullMediaData extends BaseData {
  belongs_to_collection?: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguages[];
  status: string;
  tagline: string;
}

export interface TvShow
  extends Omit<BaseData, "adult" & "original_title" & "title"> {
  first_air_date: string;
  original_name: string;
  origin_country: Countries[];
  name: string;
}

export type Countries = string;

export type SvgProps = {
  fill?: string;
  fontSize?: string;
  flip?: boolean;
  className?: string;
};

export type NavSubtitlesType = {
  label: string;
  path: string;
  auth: boolean;
  guest: boolean;
  value?: MediaListsRoutes;
};

export type NavLinkType = {
  label: string;
  value: string;
  icon: JSX.Element;
  sublinks?: NavSubtitlesType[];
  expandable?: boolean;
};

export interface FormInputProps {
  field: {
    name: string;
    value: string;
    checked?: boolean;
  };
}

export interface Review {
  author: string;
  author_details: ReviewAuthor;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export type ReviewAuthor = {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
};

export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface WatchProviders {
  link: string;
  flatrate: WatchProvider[];
  rent: WatchProvider[];
  buy: WatchProvider[];
}

export interface CountryWatchProviders {
  [key: string]: WatchProviders;
}

export interface FormattedProvider {
  name: string;
  path: string;
  buy: boolean;
  rent: boolean;
  stream: boolean;
}

export interface Credits {
  id: number;
  crew: CrewMember[];
  cast: CastMember[];
}

export interface CreditsCommonProps {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

export interface CastMember extends CreditsCommonProps {
  cast_id: number;
  character: string;
  order: number;
}

export interface CrewMember extends CreditsCommonProps {
  department: string;
  job: string;
}
