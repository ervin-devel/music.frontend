import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useGetTracksQuery} from "../redux/services/ApiCore";

const TopArtists = () => {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data: artists, isFetching: isFetchingArtists, error: errorArtists } = useGetTracksQuery(page);

    return (
        <></>
    )

};

export default TopArtists;
