import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState({
    adviceId: "",
    advice: "",
  });
  const [isError, setIsError] = useState(true);

  const fetchAdvice = async () => {
    setIsError(false);
    try {
      const res = await fetch(
        "https://api.adviceslip.com/advice?t=" + Math.random()
      );
      const { slip } = await res.json();
      console.log(slip);
      setData({ adviceId: slip.id, advice: slip.advice });
    } catch (e) {
      setIsError(true);
    }
  };

  const handleClick = async () => {
    console.log("test");
    fetchAdvice();
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <main className="relative h-screen bg-neutral-darkGrayishBlue">
      <div className="container flex items-center justify-center h-full mx-auto">
        <div className="relative flex flex-col items-center justify-center max-w-sm p-10 pb-0 text-center rounded-xl bg-neutral-grayishBlue gap-y-5">
          {isError ? (
            <h6 className="text-sm tracking-[2.5px] uppercase text-primary-neonGreen">
              Something went wrong.
            </h6>
          ) : (
            <>
              <h6 className="text-sm tracking-[2.5px] uppercase text-primary-neonGreen">
                Advice {data.adviceId ? data.adviceId : "..."}
              </h6>
              <p className="text-xl text-primary-lightCyan">
                {data.advice ? data.advice : "..."}
              </p>
              <div className="flex items-center justify-center relative before:content-[''] before:absolute before:h-[1px] before:w-32 before:bg-primary-lightCyan before:left-0 before:top-0 before:translate-y-2 md:before:translate-y-1 md:after:translate-y-1 after:content-[''] after:absolute after:h-[1px] after:w-32 after:bg-primary-lightCyan after:right-0 after:top-0 after:translate-y-2">
                <img
                  src="/pattern-divider-mobile.svg"
                  alt=""
                  className="md:hidden"
                />
                <img
                  src="/pattern-divider-desktop.svg"
                  alt=""
                  className="hidden md:block"
                />
              </div>
              <div
                className="flex items-center justify-center -mt-5 transition duration-200 translate-y-6 rounded-full cursor-pointer dice-radius w-14 h-14 bg-primary-neonGreen"
                onClick={handleClick}>
                <img src="/icon-dice.svg" alt="" />
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
