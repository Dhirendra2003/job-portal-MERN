import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterJobs } from "../../redux/jobSlice";
import { Button } from "./ui/button";

const filterdata = [
  {
    filterType: "location",
    array: [
      "Mumbai",
      "Delhi",
      "Bengaluru",
      "Kolkata",
      "Chennai",
      "Hyderabad",
      "Pune",
    ],
  },
  {
    filterType: "industry",
    array: [
      "Software Development",
      "Data Analyst",
      "Data Scientist",
      "Cybersecurity",
      "Cloud Computing",
      "Artificial Intelligence",
      "Blockchain",
      "DevOps",
    ],
  },
  {
    filterType: "salary",
    array: [
      "0 - 2 LPA",
      "2 - 5 LPA",
      "5 - 10 LPA",
      "10 - 20 LPA",
      "20 - 35 LPA",
      "35 - 50 LPA",
      "50+ LPA",
    ],
  },
];

function FilterCard() {
  const [filter, setFilter] = useState({
    location: "",
    industry: "",
    salary: "",
  });
  const { filterJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilterJobs(filter));
  }, [filter]);

  // Handle clearing of filter
  const handleClearFilter = () => {
    setFilter({
      location: "",
      industry: "",
      salary: "",
    });
  };

  return (
    <div className="m-2 mt-6 sticky top-24">
      <h1 className="font-medium text-lg">Filter Jobs</h1>
      <hr className="mt-4" />
      <Button className="m-4 bg-purple-800 dark:text-white" onClick={handleClearFilter}>
        Clear Filter
      </Button>

      {filterdata.map((item, index) => {
        return (
          <div key={index} className="mx-4 mt-4">
            <h1 className="font-semibold text-lg my-2 capitalize">
              {item.filterType}
            </h1>
            <RadioGroup
              key={index}
              value={filter[item.filterType]} // Control the selected value
              onValueChange={(value) => {
                setFilter((prevFilter) => ({
                  ...prevFilter,
                  [item.filterType]: value,
                }));
              }}
            >
              {item.array.map((value, ind) => {
                return (
                  <div
                    key={ind}
                    className="flex items-center space-x-2 text-wrap mt-1"
                  >
                    <RadioGroupItem value={value} id={`r1-${index}-${ind}`} />
                    <Label htmlFor={`r1-${index}-${ind}`}>{value}</Label>
                    <hr />
                  </div>
                );
              })}
            </RadioGroup>
            <hr className="mt-4" />
          </div>
        );
      })}
    </div>
  );
}

export default FilterCard;
