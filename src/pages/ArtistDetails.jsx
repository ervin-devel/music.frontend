import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useGetArtistQuery, useGetTracksByArtistQuery} from "../redux/services/ApiCore";
import {DetailsHeader, Error, Loader, RelatedSongs} from "../components";
import {playPause, setActiveSong} from "../redux/features/playerSlice";

const ArtistDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data: artist, isFetching: isFetchingArtist, error: errorArtist } = useGetArtistQuery(id);
    //const { data: songs, isFetching: isFetchingSongs, error: errorSongs } = useGetTracksByArtistQuery(id);

    if (isFetchingArtist) {
        return <Loader title="Searching artist details"/>;
    }

    if (errorArtist) {
        return <Error/>;
    }

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, songs: artist.tracks, i}));
        dispatch(playPause(true));
    }

    return (
        <div className="flex flex-col">
            <DetailsHeader isSong={false} data={artist} />
            <RelatedSongs
                data={artist.tracks}
                artist={artist}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
            />
        </div>
    );
};

export default ArtistDetails;
