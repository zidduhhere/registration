import Stepper, { Step } from "../components/Stepper"
import { getAllCollegeNames } from "../data/collegeUnits"


const Register = () => {

  const colleges: string[] = getAllCollegeNames();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("HI")
    console.log(data);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-24 w-screen">
      <div className="clash header">
          <h1 className="text-7xl font-bold mt-30">Register</h1>  
      </div>
      
      <div className="body w-full mx-auto">

        <Stepper
        initialStep={1}
      onStepChange={() => {

      }}
        className="w-full  h-fit mx-auto  "
        backButtonText="Back"
        contentClassName=" h-50 m-8"
        property="h-100 w-200 "
        footerClassName=""
        nextButtonText="Next"
        stepCircleContainerClassName="h-100  px-0"
        backButtonProps={{className: "bg-black text-white px-4 py-2 rounded-md clash"}}
        nextButtonProps={{className: "bg-green-700 text-white px-4 py-2 h-fit rounded-md clash font-bold", type: "submit", form: "leaderInformation"}}
        stepContainerClassName="text-white "
        
        >
              <Step>
                <form onSubmit={handleSubmit} className="h-fit py-4 mx-2" id="leaderInformation">
                  <label htmlFor="name" className="block clash text-sm font-semibold mb-2">Your Name</label>
                  <input type="text" placeholder="Name" name="name" className="bg-gray-100 px-4 py-2 rounded-md font-semibold clash"/>

                  
                    <label htmlFor="college" className="block clash text-sm font-semibold mb-2 mt-4">Your College</label>
                    <select className="bg-gray-100 px-4 py-2 rounded-md clash max-w-120 text-sm" name="college" id="college">
                      {colleges.map((college, index) => (
                        <option key={index} value={college.toUpperCase()}>{college.toUpperCase()}</option>
                      ))}
                    </select>
                  
                </form>
              </Step>
              <Step>
                <form action="" className="h-fit py-4 mx-2"></form>
              </Step>
              <Step>
                <p>Hi there</p>
              </Step>
        </Stepper>

      </div>

    </div>
  )
}

export default Register