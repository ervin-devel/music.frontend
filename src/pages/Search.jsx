import {useGetTracksBySearchQuery, useGetGenresQuery} from "../redux/services/ApiCore";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";

import {Loader, Error, SongCard} from "../components";
import {selectGenreListId} from "../redux/features/playerSlice";


const Search = () => {

    const dispatch = useDispatch();

    const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTracksBySearchQuery(searchTerm);

    if (isFetching) return <Loader title="Loading top charts"/>;
    if (error) return <Error/>;

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Showing results <span className="font-black">{searchTerm}</span></h2>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data.map((song, i) => (
                    <SongCard key={song.id} song={song} i={i} isPlaying={isPlaying} activeSong={activeSong} data={data}/>
                ))}
            </div>
        </div>
    )
};

export default Search;
