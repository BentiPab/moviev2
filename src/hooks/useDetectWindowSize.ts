import uiActions from "features/ui/actions";
import { useEffect } from "react"
import { useDispatch } from 'react-redux';

const MOBILE_WIDTH = 768

const useDetectWindowSize = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const handleResize = () => {
            const width = window.screen.availWidth
            const isMobile = width <= MOBILE_WIDTH
            dispatch(uiActions.setIsMobile(isMobile))
            return
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch])


}

export default useDetectWindowSize