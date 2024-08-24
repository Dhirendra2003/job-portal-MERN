import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const filterdata = [
  {
    filterType: "location",
    array: ["Mumbai",
      "Delhi",
      "Bengaluru",
      "Kolkata",
      "Chennai",
      "Hyderabad",
      "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Software Development",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing",
      "Artificial Intelligence",
      "Blockchain",
      "DevOps"],
  },
  {
    filterType: "Salary",
    array: ["0 - 2 LPA",
      "2 - 5 LPA",
      "5 - 10 LPA",
      "10 - 20 LPA",
      "20 - 35 LPA",
      "35 - 50 LPA",
      "50+ LPA"],
  },
]
function FilterCard() {
  return (
    <div className="m-2 mt-6">
      <h1 className="font-medium text-lg">Filter Jobs</h1>
      <hr className="mt-4" />

      {filterdata.map((item, index) => {
        return (
          <div key={index} className=' mx-4 mt-4  '>
            <h1 className="font-semibold text-lg my-2 capitalize">{item.filterType}</h1>
            <RadioGroup key={index} defaultValue="comfortable">
              {item.array.map((item, ind) => {
                return (
                  <div key={ind} className="flex items-center space-x-2 text-nowrap mt-1  ">
                    <RadioGroupItem value={item} id="r1" />
                    <Label htmlFor="r1">{item}</Label>
                    <hr />
                  </div>
                )
              })}

            </RadioGroup>
            <hr className="mt-4" />
          </div>
        )
      })}

    </div>
  )
}

export default FilterCard
