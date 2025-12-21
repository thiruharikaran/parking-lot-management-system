import AppNavbar from './Navbar';

export default function Layout({ children, showNavbar = true }) {
  const layoutStyle = {
    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
      url(${process.env.PUBLIC_URL + '/parking-bg.jpg'})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh'
  };

  return (
    <div style={layoutStyle}>
      {showNavbar && <AppNavbar />}
      {children}
    </div>
  );
}
