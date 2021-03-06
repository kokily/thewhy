import Header from './Header';
import Footer from './Footer';

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="body">
      <Header />

      <div role="main" className="main">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
