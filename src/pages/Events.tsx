import DecryptedText from "../components/DecryptedText"
import FlowingMenu, { type MenuItemProps } from "../components/FlowingMenu"
import ScrollVelocity from "../components/ScrollVelocity"
import { items } from "../data/events";


const Events = () => {

  let events: MenuItemProps[] = [];
  events = items;
   


  return (
    <div id="events" className=" w-screen h-screen relative ">
      
      <ScrollVelocity
        texts={["EVENTS"]}
        numCopies={30}
        velocity={50}
        className="bg-red-700 clash text-white transform-content -rotate-2 h-15 text-4xl flex flex-col items-center justify-center"
      /> 
      <ScrollVelocity
              texts={["PRAVEGA 2026"]}
              numCopies={30}
              velocity={25}
              velocityMapping={{ input: [0, 1000], output: [0, -5] }}
              className="text-red-700 serif font-normal bg-black"
            />

      <div className="heading flex flex-col justify-center items-center mt-12 uppercase">
        <DecryptedText 
          text="Getting you the secret information..."
          speed={90}
          maxIterations={30}
          sequential
          className="clash text-4xl text-center mt-40 font-semibold text-gray-300"
        />

       <div className="events flex w-full mt-20">
        <FlowingMenu 
          items={events}
          bgColor="#8F0F0F"
          borderColor="#000000"
        />
       </div>
        
      </div>
    </div>
  )
}

export default Events