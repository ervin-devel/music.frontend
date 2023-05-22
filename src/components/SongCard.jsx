import PlayPause from "./PlayPause";
import {Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {playPause, setActiveSong} from "../redux/features/playerSlice";
import {getCoverSong} from "../utils/helpers";
const SongCard = ({ song, i, isPlaying, activeSong, data }) => {

    const dispatch = useDispatch();
    const songs = (data.data ? data.data : data);

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = () => {
        dispatch(setActiveSong({song, songs, i}));
        dispatch(playPause(true));
    }


    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        data={songs}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>
                <img alt="song_img" src={getCoverSong(song.artists[0])}/>
            </div>
            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <Link to={`/songs/${song?.id}`}>{song.name}</Link>
                </p>
                <p className="text-sm truncate text-gray-300 mt-1">
                    <Link to="#">{song.artist}</Link>
                </p>
            </div>
        </div>
    )

};

export default SongCard;
