import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";
import { useEffect, useState } from "react"
import { thunkGetAChar } from "../../redux/character";
import { thunkDeleteRun, thunkGetARun, thunkGetRuns } from "../../redux/run";
import { thunkGetChar_inv } from "../../redux/character_inv";
import { thunkGetUse_inv } from "../../redux/useable_inv";
import BattlePage from "../BattlePage";

function RunPage() {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)
    const [runSelect, setRunSelect] = useState(false)
    const [run, setRun] = useState()
    const [char_id, setChar_id] = useState()

    const runSlice = useSelector((state) => state.run)
    const runs = Object.values(runSlice)
    console.log('runSlice:', runSlice)

    const deleteRun = async (e) => {
        dispatch(thunkDeleteRun(run))
        setRunSelect(false)
    }




    const selectedRun = async (e) => {
        e.preventDefault()
        await dispatch(thunkGetARun(run))
        setRunSelect(true)
    }

    useEffect(() => {

        dispatch(thunkGetRuns())
            .then(() => setLoaded(true))

    }, [dispatch])

    return (<>
        {loaded && <div>
            {!runSelect ? <>
                <div id='characterList'>
                    <h1>Runs Page</h1>

                    {runs.map((run) => {
                        return (<>
                            <p>{run.id}</p>
                            <form onSubmit={selectedRun}>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setRun(run.id)
                                        setChar_id(run.character_id)
                                    }}
                                >Continue</button >
                            </form>
                            <form onSubmit={deleteRun}>
                                <button
                                    type="submit"
                                    onClick={() => {
                                        setRun(run.id)
                                    }}
                                >Delete</button>
                            </form>
                        </>
                        )
                    })}

                </div>
            </> : <>
                <BattlePage props={{ run_id: run, char_id: char_id }} />
            </>
            }
        </div >}
    </>)
}

export default RunPage
