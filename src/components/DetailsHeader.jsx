import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetSongVideosQuery,  } from "../redux/services/shazamCore";

const DetailsHeader = ({ artistId, artistData, songData, songid }) => {
  const { data: videos, isFetching: isFetchingVideos } = useGetSongVideosQuery({
    songid,
  });

  const [showYouTubeVideo, setShowYouTubeVideo] = useState(false);

  const handleOpenYouTubeVideo = () => {
    setShowYouTubeVideo(true);
  };

  const handleCloseYouTubeVideo = () => {
    setShowYouTubeVideo(false);
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      <div className="absolute inset-0 flex items-center">
        <img
          alt="profile"
          src={
            artistId
              ? artistData?.attributes?.artwork?.url
                  .replace("{w}", "500")
                  .replace("{h}", "500")
              : songData?.images?.coverart
          }
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.attributes?.name : songData?.title}
          </p>
          {songData?.attributes?.subtitle && (
            <Link to={`/artists/${songData?.attributes?.artists?.[0]?.id}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.attributes?.subtitle}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : songData?.genres?.primary}
          </p>
        </div>
      </div>

      {videos?.length > 0 && (
        <div className="mt-5">
          <button
            onClick={handleOpenYouTubeVideo}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Open YouTube Video
          </button>
        </div>
      )}

      <div className="w-full sm:h-44 h-24" />

      {showYouTubeVideo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-3/4 h-3/4">
            <button
              onClick={handleCloseYouTubeVideo}
              className="absolute top-0 right-0 m-4 text-white text-lg"
            >
              Close
            </button>
            {videos.map((video) => (
              <iframe
                key={video.uri}
                width="100%"
                height="100%"
                src={video.uri}
                title="YouTube Video"
                frameBorder="0"
                allowFullScreen
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
