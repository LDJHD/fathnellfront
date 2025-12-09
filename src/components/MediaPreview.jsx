import React from 'react';

const MediaPreview = ({ files, onRemove }) => {
  const getFileType = (file) => {
    if (file.type) {
      return file.type.startsWith('video/') ? 'video' : 'image';
    }
    // Fallback basé sur l'extension
    const extension = file.name.toLowerCase().split('.').pop();
    const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
    return videoExtensions.includes(extension) ? 'video' : 'image';
  };

  const getPreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="text-lg mb-2">Aperçu des médias sélectionnés :</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file, index) => {
          const fileType = getFileType(file);
          const previewUrl = getPreviewUrl(file);
          
          return (
            <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden border">
              {/* Prévisualisation */}
              <div className="aspect-square relative">
                {fileType === 'video' ? (
                  <video 
                    src={previewUrl}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  >
                    Votre navigateur ne supporte pas la balise vidéo.
                  </video>
                ) : (
                  <img 
                    src={previewUrl}
                    alt={`Aperçu ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Icône type de média */}
                <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {fileType === 'video' ? '🎬' : '📷'}
                </div>
                
                {/* Bouton supprimer */}
                {onRemove && (
                  <button
                    onClick={() => onRemove(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition"
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
              
              {/* Nom du fichier */}
              <div className="p-2">
                <div className="text-xs text-gray-600 truncate" title={file.name}>
                  {file.name}
                </div>
                <div className="text-xs text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaPreview;