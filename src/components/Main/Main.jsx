import React, {useEffect, useState} from 'react';
import refresh from './../../images/refresh.svg'
import css from './Main.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {addSec, fetchLocation, fetchQoutes, fetchTime} from "../../Redux/MainReduser";

const Main = () => {

        let timezone = useSelector(state => state.MainReducer.timezone)
        let dayOfYear = useSelector(state => state.MainReducer.dayOfYear)
        let dayOfWeek = useSelector(state => state.MainReducer.dayOfWeek)
        let weekNumber = useSelector(state => state.MainReducer.weekNumber)
        let abbreviation = useSelector(state => state.MainReducer.abbreviation)
        let qoute = useSelector(state => state.MainReducer.qoute)
        let dispatch = useDispatch()
        let [isActive, setActive] = useState(true)
        let time = useSelector(state => state.MainReducer.time)
        let timefull = new Date(time)
        useEffect(() => {
            dispatch(fetchQoutes())
        }, [dispatch])
        useEffect(() => {
            dispatch(fetchLocation())
        }, [dispatch])
        useEffect(() => {
            if (!time && timezone) dispatch(fetchTime(timezone))
        }, [dispatch, timezone])
        useEffect(() => {
            setInterval(() => {
                dispatch(addSec())
            }, 1000)
        }, [dispatch])
        const getQoute = () => {
            return dispatch(fetchQoutes())
        }
        return <main className={[
            isActive ? css.active : '',
            timefull.getHours() > 18 || timefull.getHours() < 5 ? css.night : '',
        ].join(' ')}>
            <button onClick={() => setActive(!isActive)}>MORE <img
                src="https://clock-app-frontend-mentor.netlify.app/static/media/icon-arrow-up.9f27dbc9.svg"
                alt=""/></button>
            <article>
                <span>{qoute?.content}</span>
                <img onClick={getQoute} src={refresh} alt="refresh"/>
                <p>{qoute?.author}</p>
            </article>
            <section>
                <p>GOOD AFTERNOON, IT'S CURRENTLY</p>
                <span>{timefull.getHours() + ''}:{timefull.getMinutes()}</span>
                <div>{abbreviation}</div>
            </section>
            <div className={css.Databox}>
                <div>
                    <h1>CURRENT TIMEZONE</h1>
                    <span>{timezone}</span>
                </div>
                <div>
                    <h1>
                        DAY OF THE WEEK
                    </h1>
                    <span>{dayOfWeek}</span>
                </div>
                <div>
                    <h1>
                        DAY OF THE YEAR
                    </h1>
                    <span>{dayOfYear}</span>
                </div>
                <div>
                    <h1>
                        WEEK NUMBER
                    </h1>
                    <span>{weekNumber}</span>
                </div>
            </div>

        </main>
    }
;

export default Main;