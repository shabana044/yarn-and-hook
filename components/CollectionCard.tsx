type CollectionCardProps = {
  icon: string;
  title: string;
  description: string;
};

export default function CollectionCard({
  icon,
  title,
  description,
}: CollectionCardProps) {
  return (
    <div className="rounded-3xl border border-[#ead8c7] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-5 flex h-48 items-center justify-center rounded-2xl bg-[#f3e4d4] text-5xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-[#6b5a50]">{description}</p>
    </div>
  );
}