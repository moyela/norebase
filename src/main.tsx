import './styles/main.css'
import AppRouter from './routes/_routes.js';
import Header from './components/header.js';
// import Footer from './components/footer';

// root sets the main layout and contains the Header and the Router that renders other views
export default function Root() {
  
  return (
    <div id='viewport' className="min-w-80">
      <div className='bg-slate-100'>
        <div className='md:max-w-xl mx-auto'>
          <Header/>
        </div>
      </div>

      <div className='bg-green-100 pb-5 mx  '>
        <div className="flex flex-col max-w-xl mx-auto pt-2">
          <AppRouter/>
        </div>
      </div>
    </div>
  )
}
