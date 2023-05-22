const storageLink = 'http://127.0.0.1:8000/storage';

const getCoverSong = (artist) => {
    let cover = '/default.jpg';
    if (artist && artist.photo) {
        cover = artist.photo;
        cover = cover.replace('public/', '');
        cover = `${storageLink}/${cover}`;
    }
    return cover;
}

const getArtistPhoto = (artist) => {
    const photo = artist.photo.replace('public/', '', artist.photo);
    return `${storageLink}/${photo}`;
}

export {
    getCoverSong,
    getArtistPhoto
};