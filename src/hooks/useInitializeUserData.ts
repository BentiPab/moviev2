import { useGetUserCountryQuery } from 'features/apiCalls/apiCalls';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import appActions from "features/app/actions";
import { setRegion } from "utils/intersession";

const useInitializeUserData = () => {
    const dispatch = useDispatch()
    const { data } = useGetUserCountryQuery()
    const language = window.navigator.language

    useEffect(() => {
        dispatch(appActions.setLanguage(language))
        const region = { country: data?.country_name || 'United States', countryCode: data?.country_code || 'US', language }
        setRegion(region)
    }, [language, dispatch, data])
}

export default useInitializeUserData