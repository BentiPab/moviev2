import { AppThunk } from "model/models";
import { slice } from "./slice";
import { userEndpoints } from "./../apiCalls/userEndpoints";
import authActions from "features/auth/actions";
import notificationsActions from "features/notifications/actions";

const {
  addToFavorites: addToFavoritesApi,
  getUserDetails,
  getCreatedLists,
  getFavoriteMovies,
  getFavoriteTvShows,
  getMoviesWatchList,
  getTvWatchLists,
} = userEndpoints.endpoints;

const addToFavorites =
  (mediaId: number, mediaType: "tv" | "movie"): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().users.user?.id;
    if (!userId) {
      return;
    }
    await dispatch(
      addToFavoritesApi.initiate({
        id: userId,
        media_id: mediaId,
        media_type: mediaType,
        favorite: true,
      })
    );
    dispatch(fetchUserFavoriteMedia(userId));
  };

const fetchUserFavoriteMedia =
  (userId: number): AppThunk =>
  async (dispatch) => {
    await dispatch(getFavoriteMovies.initiate(userId, { forceRefetch: true }));
    await dispatch(getFavoriteTvShows.initiate(userId, { forceRefetch: true }));
  };

const removeFromFavorites =
  (mediaId: number, mediaType: "tv" | "movie"): AppThunk =>
  async (dispatch, getState) => {
    const userId = getState().users.user?.id;
    if (!userId) {
      return;
    }
    await dispatch(
      addToFavoritesApi.initiate({
        id: userId,
        media_id: mediaId,
        media_type: mediaType,
        favorite: false,
      })
    );

    dispatch(fetchUserFavoriteMedia(userId));
  };

const loadUsersLists =
  (userId: number): AppThunk =>
  async (dispatch) => {
    await dispatch(getCreatedLists.initiate(userId));
    await dispatch(getFavoriteMovies.initiate(userId));
    await dispatch(getFavoriteTvShows.initiate(userId));
    await dispatch(getMoviesWatchList.initiate(userId));
    await dispatch(getTvWatchLists.initiate(userId));
  };

const fetchUser = (): AppThunk => async (dispatch) => {
  try {
    const res = await dispatch(getUserDetails.initiate());
    if (res.data) {
      dispatch(usersActions._setUser(res.data));
      dispatch(authActions.setGuestSession(false));
      dispatch(
        notificationsActions.addSuccessNotification("Logged In Successfully")
      );
      await dispatch(loadUsersLists(res.data.id));
    }
  } catch (err) {
    console.log(err);
  }
};

const usersActions = {
  ...slice.actions,
  addToFavorites,
  removeFromFavorites,
  fetchUser,
};

export default usersActions;
