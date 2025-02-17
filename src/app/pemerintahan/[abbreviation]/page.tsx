import Link from 'next/link';
import NotFound from '@/app/not-found';
import Image from 'next/image';
import { getChildOrganisasi, getFamilyOrganisasi, getOrganisasiByAbbreviation } from '@/app/lib/organisasi';

export async function generateMetadata({ params }: { params: Promise<{ abbreviation: string }>}) {
  const {abbreviation} = await params;
  const data = await getOrganisasiByAbbreviation(abbreviation);

  if (!data) {
    return {
      title: 'Halaman tidak ditemukan',
      description: 'Halaman yang Anda cari tidak ditemukan',
    };
  }

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Page({ params }: { params: Promise<{ abbreviation: string }>}) {
  const {abbreviation} = await params;
  const data = await getOrganisasiByAbbreviation(abbreviation);
  const parent = data?.type === 'Kementrian';

  if (!data) {
    return <NotFound />;
  }

  const family = data.familyId ? await getFamilyOrganisasi(data.familyId) : parent ? await getChildOrganisasi(data.id) : null;
  
  return (
    <main className="mx-auto items-center text-white flex min-h-screen flex-col">
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden lg:h-full xl:h-[48rem]">
        <Image
          alt="cover"
          loading="lazy"
          decoding="async"
          className="object-fit z-0 w-full h-full"
          src="/bg-pemerintahan.png"
          width={1920}
          height={1080}
        />
        <div className="absolute z-10 rounded-md overflow-hidden p-4">
          <div className="box flex flex-col items-center justify-center p-3 gap-2 bg-opacity-50 rounded-md">
            <Image
              alt="spi"
              width={125}
              height={125}
              src={`/icon/${data.image}.svg`}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
            />
            <div className="font-semibold text-sm sm:text-lg text-white mt-2 tracking-wider text-center">
              {data.type}
            </div>
          </div>
        </div>
      </section>
      <section className="md:px-16 py-24 grid md:grid-cols-2 gap-14">
        <div className="max-w-3xl w-full rounded-lg p-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-5">
            {data.title}
          </h2>
          <p className="text-justify">{data.description}</p>

          {family && (
            <div>
              <h4 className="text-xl md:text-3xl font-semibold text-justify mt-12">
                Koordinasi
              </h4>

              <div className="flex flex-col  flex-wrap md:flex-row">
                {family?.map((familyItem, index) => (
                    <Link
                    href={`/pemerintahan/${familyItem.abbreviation}`}
                    key={index}
                    className="mt-4 flex items-center gap-4 hover:bg-gray-300/10 px-6 py-4 rounded-full"
                    >
                    <Image
                      src={`/icon/${familyItem.image}.svg`}
                      alt={familyItem.title}
                      width={40}
                      height={40}
                      className="w-10 h-10"
                    />
                    <p className="text-sm font-light">{familyItem.title}</p>
                    </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative order-first flex justify-center md:order-last">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              alt="logo brand"
              draggable="false"
              decoding="async"
              className="opacity-40 w-72 h-72 md:w-96 md:h-96"
              src="/icon/strange.svg"
              width={384}
              height={384}
            />
          </div>
          <Image
            alt="Staff Inti"
            loading="lazy"
            decoding="async"
            src={`/icon/${data.image}_glow.svg`}
            className="w-52 h-52 md:w-72 md:h-full"
            width={288}
            height={288}
          />
        </div>
      </section>
    </main>
  );
}
