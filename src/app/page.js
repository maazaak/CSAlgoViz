export default function Home() {
  return (
    <div>
      <section className="grid grid-cols-5 gap-10 p-20 pl-80 pr-40">
        <div className="col-span-2  w-full ">
          <img src="./landingPageCover.png" />
        </div>

        <div className="col-span-3 w-full h-52">
          <h1 className="leading-[50px] text-5xl text-[#f7f8d7] flex flex-col mt-20 ">
            <span className="">For every student,</span>
            <span className="">every classroom.</span>
            <span className="">Real results.</span>
          </h1>
          <p className="w-2/3 mt-12 text-[#f7f8d7]">
            We’re a nonprofit organization with the mission to provide a free,
            world-class education for anyone, anywhere
          </p>

          <div className="flex justify-between items-center w-2/3 mt-10">
            <button
              type="button"
              className="text-[#f7f8d7] bg-[#f0916c] w-full hover:bg-[#c7795a] focus:ring-4 focus:ring-[#f0916c] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Teachers
            </button>
            <button
              type="button"
              className="text-[#f7f8d7] bg-[#f0916c] w-full hover:bg-[#c7795a] focus:ring-4 focus:ring-[#f0916c] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Students
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center mb-40 items-center mt-20">
        <h1 className="text-6xl font-bold text-[#f0916c] ">
          What CSAlgoViz Offers
        </h1>
        <div className="flex gap-32 mt-32 justify-between items-center">
          <div className="flex flex-col justify-center items-center">
            <img
              src="./Interactive Visualizations.png"
              className="object-cover w-40"
            />
            <h1 className="text-3xl text-[#f0916c] mt-5">
              Interactive Visualizations
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img
              src="./Personalized Learning Paths.png"
              className="object-cover w-40"
            />
            <h1 className="text-3xl text-[#f0916c] mt-5">
              Personalized Learning Paths
            </h1>
          </div>{" "}
          <div className="flex flex-col justify-center items-center">
            <img src="./Real-Time Feedback.png" className="object-cover w-40" />
            <h1 className="text-3xl text-[#f0916c] mt-5">Real-Time Feedback</h1>
          </div>
        </div>
      </section>
    </div>
  );
}
