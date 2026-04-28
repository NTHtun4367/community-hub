interface PostImagesProps {
  images: string[];
}

function PostImages({ images }: PostImagesProps) {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border">
        <img
          src={images[0]}
          alt="post image"
          className="w-full h-full object-cover max-h-125"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border grid grid-cols-2 gap-1 aspect-2/1 sm:aspect-video">
        <img
          src={images[0]}
          alt="post image 1"
          className="w-full h-full object-cover"
        />
        <img
          src={images[1]}
          alt="post image 2"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border grid grid-cols-2 grid-rows-2 gap-1 aspect-3/2 sm:aspect-video">
        <img
          src={images[0]}
          alt="post image 1"
          className="w-full object-cover h-full row-span-2"
        />
        <img
          src={images[1]}
          alt="post image 2"
          className="w-full object-cover h-full"
        />
        <img
          src={images[2]}
          alt="post image 3"
          className="w-full object-cover h-full"
        />
      </div>
    );
  }

  return (
    <div className="mt-3 rounded-xl overflow-hidden border grid grid-cols-2 grid-rows-2 gap-1 aspect-3/2 sm:aspect-video">
      <img
        src={images[0]}
        alt="post image 1"
        className="w-full object-cover h-full"
      />
      <img
        src={images[1]}
        alt="post image 2"
        className="w-full object-cover h-full"
      />
      <img
        src={images[2]}
        alt="post image 3"
        className="w-full object-cover h-full"
      />
      <img
        src={images[3]}
        alt="post image 4"
        className="w-full object-cover h-full"
      />
    </div>
  );
}

export default PostImages;
