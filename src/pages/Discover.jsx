import React, {useState} from 'react';
import {Error, Loader, SongCard} from "../components";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetGenresQuery, useGetTracksQuery } from "../redux/services/ApiCore";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../components/Pagination";

const Discover = () => {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    const { data: genres, isFetching: isFetchingGenres, error: errorGenres } = useGetGenresQuery();
    const { data: songs, isFetching: isFetchingSongs, error: errorSongs } = useGetTracksQuery(page);

    if (isFetchingGenres || isFetchingSongs) return <Loader title="Loading..."/>;
    if (errorGenres || errorSongs) return <Error/>;

    const genreTitle = genres.find((genre) => genre.id === +genreListId)?.name;

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select
                    onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                    value={genreListId || 'pop'}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                </select>
            </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {songs.data.map((song, i) => (
                        <SongCard key={song.id} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={songs}/>
                    ))}
                </div>
            <Pagination currentPage={page} setCurrentPage={setPage} lastPage={songs.last_page}/>
        </div>
    )
};

export default Discover;
