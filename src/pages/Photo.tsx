import Title from "../components/Common/Title";


const Photo = () => {
  return (
    <section className='min-h-screen'>
      <div className='max-w-7xl mx-auto py-20 px-4 md:px-8 flex flex-col gap-4 xl:gap-12 justify-center items-center'>
        <Title
          mainTitle="Photos and Videos"
          subtitle="Experience the Natural Beauty and Endless Possibilities Through Our Visual Gallery"
          className="text-emerald-900"
        />
        
      </div>
    </section>
  );
};

export default Photo;