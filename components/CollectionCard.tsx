type CollectionCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function CollectionCard({
  image,
  title,
  description,
}: CollectionCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#ead8c7] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-56 items-center justify-center bg-[#f3e4d4]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>

        <p className="mt-3 leading-7 text-[#6b5a50]">{description}</p>
      </div>
    </div>
  );
}