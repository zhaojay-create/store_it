import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex flex-col items-center justify-center max-h-[800px] max-w-[430px] space-y-2">
          <Image
            src="/assets/logo.svg"
            alt="logo"
            width={56}
            height={56}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="text-3xl font-bold">
              Manane your files the best way
            </h1>
            <p className="text-lg">
              this is a place where you can store your files for free
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center justify-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">a image will be here</div>
        {children}
      </section>
    </div>
  );
};

export default layout;
