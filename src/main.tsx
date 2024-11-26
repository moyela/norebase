import './styles/main.css'
import AppRouter from './routes/_routing.js';
import Header from './components/header.js';
import Footer from './components/footer.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// root sets the main layout and contains the Header and the Router that renders other views
export default function Root() {
  
  return (
    <div id='viewport' className="min-w-80 bg-green-100">
      <div className='bg-slate-100'>
        <div className='md:max-w-xl mx-auto'>
          <Header/>
        </div>
      </div>

      <div className='pb-5 min-h-max '>
        <div className="flex flex-col md:max-w-2xl md:min-w-xl mx-auto pt-2  gap-9">
          <AppRouter/>
          <Footer/>
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            // transition:"Bounce"
          />
        </div>
      </div>
    </div>
  )
}
