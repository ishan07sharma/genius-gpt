import { FaBarsStaggered } from 'react-icons/fa6';
import Sidebar from '@/components/Sidebar';
const layout = ({ children }) => {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label
          htmlFor='my-drawer-2'
          className='drawer-button lg:hidden fixed top-6 right-6'
        >
          <FaBarsStaggered className='w-8 h-8 text-primary' />
        </label>
        <div className='bg-base-200 px-8 py-12 min-h-screen'>{children}
        <div className='fixed bottom-0 right-0 pr-5 pb-5'>
          <span>&#169;</span>Ishan Sharma
          </div>
        </div>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-2'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};
export default layout;