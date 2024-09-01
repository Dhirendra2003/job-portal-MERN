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
    path: '/jobs/description/:id',
    element: <JobDescription />
  },
  {
    path: '/admin/companies',
    element: <Companies />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/companies/create',
    element: <CreateCompany />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanyEdit/>
  },
  {
    path: '/admin/job/post',
    element: <PostJob/>
  },
  {
    path: '/admin/job/edit/:id',
    element: <EditJob/>
  },
  {
    path: '/admin/applications/:id',
    element: <ViewApplications/>
  },
])
function App() {


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <RouterProvider router={appRouter} />
      </main>
      <Footer />
    </div>
  )
}

export default App
