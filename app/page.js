import Link from 'next/link';
const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>GPTGenius</h1>
          <p className='py-6 text-lg leading-loose'>
            GPTGenius: Your AI language companion.It
            enhances your conversations, content creation, and more!
            Also get info about your favourite tourist destination.
          </p>
          
          
          <Link href='/chat' className='btn btn-secondary '>
            Get Started
          </Link>
          <div className='p-5 font-bold text-xl'>
          <span>&#169;</span>Ishan Sharma
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;