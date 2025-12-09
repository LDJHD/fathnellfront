import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const MediaCarousel = ({ medias = [], productName = "Produit" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  if (!medias || medias.length === 0) {
    return (
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Aucune image disponible</span>
      </div>
    );
  }

  const currentMedia = medias[currentIndex];
  const isCurrentVideo = currentMedia?.type_media === 'video';

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % medias.length);
    setIsVideoPlaying(false);
  };

  const prevMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + medias.length) % medias.length);
    setIsVideoPlaying(false);
  };

  const goToMedia = (index) => {
    setCurrentIndex(index);
    setIsVideoPlaying(false);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
  };

  const getMediaUrl = (media) => {
    // Si l'URL commence par http, c'est déjà une URL complète (pour les images de fallback)
    if (media.media_url?.startsWith('http') || media.media_url?.startsWith('/')) {
      return media.media_url;
    }
    return `${import.meta.env.VITE_API_URL}/uploads/produits/${media.media_url}`;
  };

  return (
    <div className="w-full">
      {/* Média principal */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-sm overflow-hidden">
        {isCurrentVideo ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              src={getMediaUrl(currentMedia)}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              controls={false}
              poster={currentMedia.thumbnail_url ? getMediaUrl({...currentMedia, media_url: currentMedia.thumbnail_url}) : undefined}
            />
            
            {/* Contrôles vidéo personnalisés */}
            <button
              onClick={toggleVideoPlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition group"
            >
              <div className="bg-black/60 rounded-full p-3 group-hover:scale-110 transition">
                {isVideoPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </button>

            {/* Indicateur vidéo */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              🎬 Vidéo
            </div>
          </div>
        ) : (
          <img
            src={getMediaUrl(currentMedia)}
            className="w-full h-full object-cover duration-300"
            alt={`${productName} - Image ${currentIndex + 1}`}
          />
        )}

        {/* Boutons navigation (seulement si plusieurs médias) */}
        {medias.length > 1 && (
          <>
            <span
              onClick={prevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10  bg-black/50 hover:bg-black/70 text-white  rounded-full flex items-center justify-center shadow transition"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </span>

            <span
              onClick={nextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center shadow transition"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </span>
          </>
        )}

        {/* Indicateurs de position */}
        {medias.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {medias.map((_, index) => (
              <button
                key={index}
                onClick={() => goToMedia(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Compteur */}
        {/* {medias.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {medias.length}
          </div>
        )} */}
      </div>

      {/* Miniatures (si plus d'un média) */}
      {medias.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {medias.map((media, index) => (
            <button
              key={index}
              onClick={() => goToMedia(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition ${
                index === currentIndex
                  ? 'border-black'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="relative w-full h-full">
                {media.type_media === 'video' ? (
                  <>
                    {media.thumbnail_url ? (
                      <img
                        src={getMediaUrl({...media, media_url: media.thumbnail_url})}
                        className="w-full h-full object-cover"
                        alt={`Miniature ${index + 1}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-3 h-3 text-white" />
                    </div>
                  </>
                ) : (
                  <img
                    src={getMediaUrl(media)}
                    className="w-full h-full object-cover"
                    alt={`Miniature ${index + 1}`}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaCarousel;