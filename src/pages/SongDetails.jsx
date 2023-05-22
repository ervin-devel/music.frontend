import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import {useGetTrackQuery, useGetRelatedQuery} from '../redux/services/ApiCore';
import {playPause, setActiveSong} from "../redux/features/playerSlice";

const SongDetails = () => {

    const dispatch = useDispatch();
    const { songid } = useParams();

    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const {data: songData, isFetching: isFetchingSongDetails, error: errorSongDetails} = useGetTrackQuery(songid);

    const {data: related, isFetching: isFetchingRelated, error: errorRelated} = useGetRelatedQuery(songid);


    if (isFetchingSongDetails || isFetchingRelated) {
        return <Loader title="Searching song details"/>;
    }

    if (errorSongDetails || errorRelated) {
        return <Error/>;
    }

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, songs: related, i}));
        dispatch(playPause(true));
    }

    console.log(songData);

        return (
            <>
            <div className="flex flex-col">

                <DetailsHeader isSong={true} data={songData}/>

                <div className="mb-10">
                    <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                </div>
                <div className="mt-5">
                    <p className="text-gray-400 text-base my-1">{ songData?.lyurics }</p>
                </div>
            </div>
            <RelatedSongs
                data={related}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />
            </>
        )

};

export default SongDetails;
