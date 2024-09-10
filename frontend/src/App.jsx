import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/auth/Signup"
import Login from "./components/auth/Login"
import Jobs from "./components/Jobs"
import Browse from "./components/Browse"
import Profile from "./components/Profile"
import JobDescription from "./components/JobDescription"
import Footer from "./components/Footer"
import Companies from "./components/Companies"
import AdminJobs from "./components/AdminJobs"
import CreateCompany from "./components/CreateCompany"
import CompanyEdit from "./components/CompanyEdit"
import PostJob from "./components/PostJob"
import EditJob from "./components/EditJob"
import ViewApplications from "./components/ViewApplications"
import SavedJobs from "./components/SavedJobs"
import RouteProtector from "./components/RouteProtector"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/saved',
    element: <SavedJobs />
  },
  {
    path: '/jobs/description/:id',
    element: <JobDescription />
  },
  {
    path: '/admin/companies',
    element: <RouteProtector><Companies /></RouteProtector>
  },
  {
    path: '/admin/jobs',
    element: <RouteProtector><AdminJobs /></RouteProtector>
  },
  {
    path: '/admin/companies/create',
    element: <RouteProtector><CreateCompany /></RouteProtector>
  },
  {
    path: '/admin/companies/:id',
    element: <RouteProtector><CompanyEdit/></RouteProtector>
  },
  {
    path: '/admin/job/post',
    element: <RouteProtector><PostJob/></RouteProtector>
  },
  {
    path: '/admin/job/edit/:id',
    element: <RouteProtector><EditJob/></RouteProtector>
  },
  {
    path: '/admin/applications/:id',
    element: <RouteProtector><ViewApplications/></RouteProtector>
  },
  
])
function App() {


  return (
    <div className="flex flex-col min-h-screen dark:bg-black">
      <main className="flex-grow">
        <RouterProvider router={appRouter} />
      </main>
      <Footer />
    </div>
  )
}

export default App
