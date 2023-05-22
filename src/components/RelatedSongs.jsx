import SongBar from './SongBar';
const RelatedSongs = ({ data, isPlaying, activeSong, handlePlay, handlePause, artist }) => {
    const songs = data.tracks || data;
    return (
    <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
        <div className="mt-6 w-full flex flex-col">
            {songs?.map((song, i) => {
                return (<SongBar
                    key={song.id}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePause}
                    handlePlayClick={handlePlay}
                    artist={artist}
                />)
            })}
        </div>
    </div>
    )
};

export default RelatedSongs;
