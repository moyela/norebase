import './styles/main.css'
import AppRouter from './routes/_routes.js';
import Header from './components/header.js';
// import Footer from './components/footer';

// root sets the main layout and contains the Header and the Router that renders other views
export default function Root() {
  
  return (
    <div id='viewport' className="min-w-80 bg-green-100">
      <div className='bg-slate-100'>
        <div className='md:max-w-xl mx-auto'>
          <Header/>
        </div>
      </div>

      <div className=' pb-5 min-h-max '>
        <div className="flex flex-col md:max-w-2xl md:min-w-xl mx-auto pt-2">
          <AppRouter/>
        </div>
      </div>
    </div>
  )
}
