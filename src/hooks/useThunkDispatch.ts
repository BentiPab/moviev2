import store from "features/store";
import { useDispatch } from "react-redux";

type AppDispatch = typeof store.dispatch;

const useThunkDispatch = () => {
  const dispatch: AppDispatch = useDispatch();

  return dispatch;
};

export default useThunkDispatch;
