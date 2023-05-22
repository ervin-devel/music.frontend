import {Link} from "react-router-dom";
import {getArtistPhoto} from "../utils/helpers";

const Header = ({ photo, title }) => {
    return (
        <div className="relative w-full flex flex-col">
            <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"/>
            <div className="absolute inset-0 flex items-center">
                <img alt="alt" src={ photo } className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"/>
                <div className="ml-5">
                    <p className="font-bold sm:text-3xl text-xl text-white">{ title }</p>
                    <Link to={'#'}>
                        <p className="text-base text-gray-400 mr-2">

                        </p>
                    </Link>
                </div>
            </div>
            <div className="w-full sm:h-44 h-24"/>
        </div>
    )
}

const DetailsHeader = ({ isSong, data }) => {

    if (isSong) {
        if (data.artists.length) {
            return (<Header
                photo={getArtistPhoto(data.artists[0])}
                title={data.artists[0].name}
            />);
        }
    } else {
        return (<Header
            photo={getArtistPhoto(data.artist)}
            title={data.artist.name}
        />);
    }
};

export default DetailsHeader;
