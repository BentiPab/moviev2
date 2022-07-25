import { AppThunk } from "model/models";
import { slice } from "./slice";

const setPagination =
    (totalPages: number = 0, totalResults: number = 0): AppThunk =>
        (dispatch) => {
            dispatch(slice.actions.setTotalPages(totalPages));
            dispatch(slice.actions.setTotalResults(totalResults));
        };

const uiActions = {
    setPagination,
    ...slice.actions,
};

export default uiActions;
