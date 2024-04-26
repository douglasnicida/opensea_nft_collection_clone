import { useEffect, useState } from "react";
import Header from "./Components/Header";
import SubHeader from "./subHeader";
import Content from "./Content";

function App() {
  const [scrolled, setScrolled] = useState(false)

    useEffect(()=>{
        const scrollPosition = () => { (window.scrollY > 40) ? setScrolled(true) : setScrolled(false)}

        window.addEventListener('scroll', scrollPosition)
    },[])

  return (
    <div className="flex flex-col w-full relative bg-black min-h-screen">
      <Header scroll={scrolled}/>
      <SubHeader />
      <Content />
    </div>
  );
}

export default App;
