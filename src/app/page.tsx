import Image from "next/image";

const Home = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <main className="space-y-8 text-center">
        <div
          style={{
            // use relative position for the parent div
            position: "relative",
            width: "100vw",
            height: "100vh",
            backgroundImage: "url('/images/hk_bg_1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Remove the Image component and keep the child div */}
          <div
            style={{
              // use absolute position for the child element
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // use higher zIndex than the image
              zIndex: 1,
              background: "transparent",
            }}
          >
            <h1 className="font-instrument-serif-regular text-8xl text-white text-glow">
              Hanzalah Waheed
            </h1>
            <br />
            <h2 className="font-instrument-serif-regular text-xl text-white">
              Software Engineer
            </h2>
            <p className="font-trajan-light text-xl text-white">
              Trying to understand how things work
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
