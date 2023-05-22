import {useDispatch, useSelector} from "react-redux";
import {useGetChartQuery, useGetArtistsTopQuery} from "../redux/services/ApiCore";
import {playPause, setActiveSong} from "../redux/features/playerSlice";
import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {Error, Loader} from "./index";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import PlayPause from "./PlayPause";
import {getArtistPhoto, getCoverSong} from "../utils/helpers";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {

    return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 py-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold text-base text-white mr-3">{i + 1}. </h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img className="w-20 h-20 rounded-lg" src={getCoverSong(song)} alt=""/>
            <div className="flex-1 flex flex-col justify-center mx-3">
                <Link to={`/songs/${song.id}`}>
                    <p className="text-xl font-bold text-white">{song.name}</p>
                </Link>
                <Link to={`/artists/${song.id}`}>
                    <p className="text-ase text-gray-300 mt-1">{song.artist}</p>
                </Link>
            </div>
        </div>
        <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
        />
    </div>
    )
}
const TopPlay = () => {

    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const divRef = useRef(null);

    /*useEffect(() => {
    divRef.current.scrollIntoView({behavior: 'smooth'})
    });*/

    const { data: songs, isFetching: isFetchingSongs, error: errorSongs } = useGetChartQuery();
    const { data: artists, isFetching: isFetchingArtists, error: errorArtists } = useGetArtistsTopQuery(3);

    if (isFetchingSongs || isFetchingArtists) return <Loader title="Loading chart..."/>;
    if (errorSongs || errorArtists) return <Error/>;

    const handlePauseClick = () => {
        dispatch(playPause(false));
    }

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({song, songs, i}));
        dispatch(playPause(true));
    }

    return (
        <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white font-bold text-2xl">Top Charts</h2>
                    <Link to="/top-charts">
                        <p className="text-gray-300 text-base cursor-pointer">See more</p>
                    </Link>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                    {songs.map((song, i) => (
                        <TopChartCard
                            key={song.id}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            handlePauseClick={handlePauseClick}
                            handlePlayClick={() => handlePlayClick(song, i)}
                        />
                    ))}
                </div>
                <div className="w-full flex flex-col mt-8">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-white font-bold text-2xl">Top Artists</h2>
                        <Link to="/top-artists">
                            <p className="text-gray-300 text-base cursor-pointer">See more</p>
                        </Link>
                    </div>

                    <Swiper
                        slidePerView="auto"
                        spaceBetween={15}
                        freeMode
                        centeredSlides
                        centeredSlidesBounds
                        modules={[FreeMode]}
                        className="mt-4"
                    >
                        {artists.map((artist, i) => (
                            <SwiperSlide
                                key={i}
                                style={{width: '25%', height: 'auto'}}
                                className="shadow-lg rounded-full animate-slideright"
                            >
                                <Link to={`/artists/${artist.id}`}>
                                    <img src={getArtistPhoto(artist)} alt={artist.name} style={{width: '100px'}} className="rounded-full w-full object-cover"/>
                                </Link>
                            </SwiperSlide>
                            ))}
                    </Swiper>
                </div>

            </div>
        </div>
    )
};

export default TopPlay;
