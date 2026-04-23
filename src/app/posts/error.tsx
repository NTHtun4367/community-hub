"use client";

interface Props {
  error: Error;
}

function Error({ error }: Props) {
  return (
    <div className="text-red-600">
      {error.message || "Something went wrong!"}
    </div>
  );
}

export default Error;
