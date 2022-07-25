import { useSelector } from "react-redux";
import { selectLanguage, selectCountryCode } from "./../features/app/selectors";

const useCommonParams = () => {
    const language = useSelector(selectLanguage);
    const region = useSelector(selectCountryCode);
    return { language, region };
};

export default useCommonParams;
